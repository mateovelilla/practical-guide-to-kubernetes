import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class ServiceWithReplicaSetHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            loader.start(`Creating service!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/replicasets.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            const { stdout: outputService, stderr: outputServiceError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/service.yml`])
            log.info(outputService);
            log.warn(outputServiceError)
            loader.stop("____________________________")
            let loading = true
            loader.start(`Waiting for creation of pods!`);
            while(loading) {
                const { stdout: outputStatusPods, stderr: outputStatusPodsError } =  await super.runCommand("kubectl",["get", "pods", "-o", "json"])
                const statusPods = JSON.parse(outputStatusPods)
                loading = !statusPods.items.every(pod=> pod.status.phase === 'Running')
            }
            loader.stop(`The pods already!`);
            loader.start("Creating port-forward service 3000:28017, address 0.0.0.0")
            const { stdout: outputPortForwarding, stderr: outputPortForwardingError } =  await super.runCommand("nohup ",["kubectl","port-forward", "service/go-demo-2", "3000:28017", "--address", "0.0.0.0", " > portforward.log 2>&1 &"])
            loader.stop(outputPortForwarding);
            log.warn(outputPortForwardingError)
            const { stdout: outputGetReplicasets, stderr: outputGetReplicasetsError } =  await super.runCommand("kubectl",["get", "rs"])
            log.info(outputGetReplicasets);
            log.warn(outputGetReplicasetsError)
            const { stdout: outputDescribeManifest, stderr: outputDescribeManifestError } =  await super.runCommand("kubectl",["describe", "-f",  `${__dirname}/replicasets.yml`])
            log.info(outputDescribeManifest);
            log.warn(outputDescribeManifestError)
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}