import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class JenkinsMountingGenericSecretsHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            let podNameCleaned;
            const loader = spinner()
            loader.start("Create Secrets")
            const { stdout: outputscrets, stderr: outputSecretsError } =  await super.runCommand("kubectl",["create", "secret","generic", "my-creds", "--from-literal=username=jdoe", "--from-literal=password=incognito"])
            log.info(outputscrets);
            log.warn(outputSecretsError)
            loader.stop("____________________________")
            loader.start(`Creating Jenkins with secrets!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["apply", "-f", `${__dirname}/jenkins.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            log.info("Rollout jenkins")
            const { stdout: outputRollout, stderr: outputRolloutError } =  await super.runCommand("kubectl",["rollout", "status","deploy","jenkins"])
            log.info(outputRollout);
            log.warn(outputRolloutError)
            loader.stop("____________________________");
            loader.start("Getting Pods names");
            const { stdout: podName, stderr: outputPodNamesError } =  await super.runCommand("kubectl",["get", "pods","-l","service=jenkins,type=master", "-o", 'jsonpath="{.items[*].metadata.name}"'])
            log.info(podName);
            log.warn(outputPodNamesError)
            loader.stop("____________________________");
            podNameCleaned = podName.trim().replace(/['"]+/g, '')
            loader.start(`Getting secrets of ${podNameCleaned} pod`)
            const { stdout: outputSecret, stderr: outputSecretError } =  await super.runCommand("kubectl",["exec", "-it",podNameCleaned,"--", "ls", "/etc/secrets"])
            log.info(outputSecret);
            log.warn(outputSecretError)
            loader.stop("____________________________")
        } catch (error) {
            console.log(error)
        }finally {
            request.namespace = null;
            request.serviceName = "jenkins";
            request.exposedPort = 3000;
            request.localPort= 8080;
            return await super.handle(request)
        }
       
    }
}