import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class AssociateReplicasetHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            loader.start(`Associating replicaset!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/replicasets.yml`,'--save-config'])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            const { stdout: outputApplySetting, stderr: outputApplySettingError } =  await super.runCommand("kubectl",["apply", "-f", `${__dirname}/replicasets.yml`])
            log.info(outputApplySetting);
            log.warn(outputApplySettingError)
            loader.stop("_____________________________")
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}