import { dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
import { StatusPodsCheckerHandler } from "../../utils/statusPodsChecker/index.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class ConfigmapsUsingLiteralsHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            const statusPodsChecker = new StatusPodsCheckerHandler()
            loader.start(`Creating Creating Config!`);
            const { stdout: outputConfigmap, stderr: outputConfigmapError } =  await super.runCommand("kubectl",["create", "cm", "my-config",`--from-literal=something=else`, `--from-literal=wather=sunny`])
            log.info(outputConfigmap);
            log.warn(outputConfigmapError);
            const { stdout: outputDescribeConfigmap, stderr: outputDescribeConfigmapError } =  await super.runCommand("kubectl",["get", "cm", "my-config", "-o", "yaml"])
            log.info(outputDescribeConfigmap);
            log.warn(outputDescribeConfigmapError);
            loader.stop();
            loader.start(`Creating Alpine pod`);
            const { stdout: outputAlpinePod, stderr: outputAlpinePodError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/../alpine.yml`])
            log.info(outputAlpinePod);
            log.warn(outputAlpinePodError);
            loader.stop();
            await statusPodsChecker.handle(request);
            loader.start("Listing files");
            const { stdout: outputExecutedCommand, stderr: outputExecutedCommandError } =  await super.runCommand("kubectl",["exec", "alpine",'--','ls','/etc/config']);
            log.info(outputExecutedCommand);
            log.warn(outputExecutedCommandError);
            log.info("Listing content something file");
            const { stdout: outputDescribeCommand, stderr: outputDescribeCommandError } =  await super.runCommand("kubectl",["exec", "alpine",'--','cat','/etc/config/something']);
            log.info(outputDescribeCommand);
            log.warn(outputDescribeCommandError);
            loader.stop("____________________________");
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}