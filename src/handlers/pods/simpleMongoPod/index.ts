import { readFileSync, writeFileSync } from "node:fs"
import {resolve, dirname } from "node:path"
import { fileURLToPath } from 'url';
import { spinner, log, text } from "@clack/prompts";
import yaml from "js-yaml"
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class SimpleMongoPodHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            const fileContent = readFileSync(resolve(__dirname, 'db.yml'), 'utf8');
            const manifest = yaml.load(fileContent);
            const containerName = await text({
                message: 'Enter the name of the container',
                initialValue: 'db'
            });
            manifest.spec.containers[0].name = containerName
            const newYaml = yaml.dump(manifest);
            writeFileSync(resolve(__dirname,'db.yml'), newYaml, 'utf8');
            loader.start(`Creating ${containerName} pod!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/db.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            loader.stop("")
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}