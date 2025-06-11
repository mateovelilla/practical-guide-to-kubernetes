import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class NginxIngressBasedOnPathsHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            loader.start(`Creating Ngnix Controller!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/ingress-based-on-paths.yml`, "--record", "--save-config"])
            request.namespace = "ingress-nginx"
            request.serviceName = "ingress-nginx-controller"
            request.exposedPort = 3000
            request.localPort = 80
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