import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
import { CreateClusterWithVolumeHandler } from "../../utils/createClusterWithVolume/index.ts"
import { NginxIngressControllerHandler } from "../../ingress/nginx-ingress-controller/index.ts"
import { StatusPodsCheckerHandler } from "../../utils/statusPodsChecker/index.ts"

import { ListPodsHandler } from "../../utils/listPods/index.ts"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class SharingFilePrometheusConfigHandler extends AbstractHandler {
    public async handle(request: Request ) {
        try {
            const loader = spinner()
            request.volumes = [
                {
                    localVolume: `${__dirname}/prometheus-conf.yml`,
                    remoteVolume: '/files/prometheus-conf.yml'
                },
                {
                    localVolume: `/run/docker.sock`,
                    remoteVolume: '/var/run/docker.sock'
                }
            ]
            const clusterWithVolume = new CreateClusterWithVolumeHandler();
            const ngnixIngressController = new NginxIngressControllerHandler();
            const statusCheckerNginx = new StatusPodsCheckerHandler()
            const listPods = new ListPodsHandler();
            statusCheckerNginx.setNext(listPods)
            ngnixIngressController.setNext(statusCheckerNginx)
            clusterWithVolume.setNext(ngnixIngressController)
            await clusterWithVolume.handle(request)
            await super.runCommand("kubectl",["wait", "--namespace","ingress-nginx","--for=condition=ready","pod","--selector=app.kubernetes.io/component=controller", "--timeout=120s"])
            loader.start(`Creating prometheus!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/prometheus.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            const { stdout: outputRollout, stderr: outputRolloutError } =  await super.runCommand("kubectl",["rollout", "status", "deploy", "prometheus"])
            log.info(outputRollout);
            log.warn(outputRolloutError)
            
            loader.stop("____________________________")
        } catch (error) {
            console.log(error)
        }finally {
            request.localPort = 9090;
            request.exposedPort = 3000;
            request.namespace = null;
            request.serviceName = "prometheus";
            return await super.handle(request)
        }
       
    }
}