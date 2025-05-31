import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class SimpleMongoDeploymentHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            loader.start(`Creating Deployment!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/mongo-deployment.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            loader.stop("____________________________")
            let loading = true
            loader.start(`Waiting for creation of pods!`);
            while(loading) {
                const { stdout: outputStatusPods } =  await super.runCommand("kubectl",["get", "pods", "-o", "json"])
                const statusPods = JSON.parse(outputStatusPods)
                loading = !statusPods.items.every(pod=> pod.status.phase === 'Running')
            }
            loader.stop("____________________________");
            const { stdout: outputDescribeManifest, stderr: outputDescribeManifestError } =  await super.runCommand("kubectl",["get", "all"])
            log.info(outputDescribeManifest);
            log.warn(outputDescribeManifestError)
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}