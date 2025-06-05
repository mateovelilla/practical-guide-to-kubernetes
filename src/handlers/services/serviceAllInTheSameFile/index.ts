import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class ServiceWithReplicaSetInTheSameFileHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            request.exposedPort = 3000
            request.localPort = 8080
            request.serviceName = 'go-demo-2-api'
            const loader = spinner()
            loader.start(`Creating service!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/replicaset-service.yml`])
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