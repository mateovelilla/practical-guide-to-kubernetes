import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
import { StatusPodsCheckerHandler } from "../../utils/statusPodsChecker/index.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class PodAlpineUsingEnvironmentVariablesHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            const statusPodsChecker = new StatusPodsCheckerHandler()
            loader.start(`Creating Creating Config!`);
            const { stdout: outputConfigmap, stderr: outputConfigmapError } =  await super.runCommand("kubectl",["create", "cm", "my-config",`--from-env-file=${__dirname}/my-env-file.yml`])
            log.info(outputConfigmap);
            log.warn(outputConfigmapError);
            const { stdout: outputDescribeConfigmap, stderr: outputDescribeConfigmapError } =  await super.runCommand("kubectl",["describe", "cm", "my-config"])
            log.info(outputDescribeConfigmap);
            log.warn(outputDescribeConfigmapError);
            loader.stop();
            loader.start(`Creating Alpine pod`);
            const { stdout: outputAlpinePod, stderr: outputAlpinePodError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/alpine.yml`])
            log.info(outputAlpinePod);
            log.warn(outputAlpinePodError);
            loader.stop();
            await statusPodsChecker.handle(request);
            loader.start("Listing environment variables");
            const { stdout: outputExecutedCommand, stderr: outputExecutedCommandError } =  await super.runCommand("kubectl",["exec", "alpine-env",'--','env']);
            log.info(outputExecutedCommand);
            log.warn(outputExecutedCommandError);
            loader.stop("____________________________");
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}