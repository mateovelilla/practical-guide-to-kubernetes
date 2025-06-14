import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
import { StatusPodsCheckerHandler } from "../../utils/statusPodsChecker/index.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class PrometheusWithConfigmapGeneratedViaManifestHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            const statusPodsChecker = new StatusPodsCheckerHandler()
            loader.start(`Creating Prometheus pod`);
            const { stdout: outputAlpinePod, stderr: outputAlpinePodError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/prometheus.yml`])
            log.info(outputAlpinePod);
            log.warn(outputAlpinePodError);
            loader.stop();
            await statusPodsChecker.handle(request);
            loader.start("Deploying Prometheus pod");
            const { stdout: outputExecutedCommand, stderr: outputExecutedCommandError } =  await super.runCommand("kubectl",["rollout", "status",'deploy','prometheus']);
            log.info(outputExecutedCommand);
            log.warn(outputExecutedCommandError);
            loader.stop("____________________________");
        } catch (error) {
            console.log(error)
        }finally {
            request.serviceName = "prometheus"
            request.namespace = null
            request.localPort = 9090
            request.exposedPort = 3000
            return await super.handle(request)
        }
       
    }
}