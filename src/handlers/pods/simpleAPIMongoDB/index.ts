import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log, text } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class SimpleApiMongoHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            loader.start(`Creating stack!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/simple-api-mongo.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            loader.stop("")
            const { stdout: outputGetPods, stderr: outputGetPodsError } =  await super.runCommand("kubectl",["get", "pods"])
            log.info(outputGetPods);
            log.warn(outputGetPodsError)
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}