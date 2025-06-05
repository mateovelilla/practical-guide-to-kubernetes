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
            request.exposedPort = 3000
            request.localPort = 28017
            request.serviceName = 'go-demo-2'
            const loader = spinner()
            loader.start(`Creating service!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/replicasets.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            const { stdout: outputService, stderr: outputServiceError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/service.yml`])
            log.info(outputService);
            log.warn(outputServiceError)
            loader.stop("____________________________")
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}