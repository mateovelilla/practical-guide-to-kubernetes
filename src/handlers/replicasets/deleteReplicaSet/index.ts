import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class DeleteReplicasetHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            loader.start(`Deleting replicaset pod!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["delete", "-f", `${__dirname}/replicasets.yml`,'--cascade=orphan'])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            loader.stop("_____________________________")
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}