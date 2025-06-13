import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class JenkinsWithEmptyFolderHandler extends AbstractHandler {
    public async handle(request: Request ) {
        try {
            const loader = spinner()
            loader.start(`Creating Jenkins project!`);
            const { stdout: outputJenkins, stderr: outputJenkinsError } =  await super.runCommand("kubectl",["apply", "-f", `${__dirname}/jenkins-empty-folder.yml`])
            log.info(outputJenkins);
            log.warn(outputJenkinsError)
            const { stdout: outputRollout, stderr: outputRolloutError } =  await super.runCommand("kubectl",["rollout", "status", "deploy", "jenkins"])
            log.info(outputRollout);
            log.warn(outputRolloutError)     
            loader.stop("____________________________")
        } catch (error) {
            console.log(error)
        }finally {
            request.localPort = 8080;
            request.exposedPort = 3000;
            request.namespace = null;
            request.serviceName = "jenkins";
            return await super.handle(request)
        }
       
    }
}