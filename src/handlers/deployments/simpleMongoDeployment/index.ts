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
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}