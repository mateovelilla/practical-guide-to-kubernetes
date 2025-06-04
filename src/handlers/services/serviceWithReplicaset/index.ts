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
            const loader = spinner()
            loader.start(`Creating service!`);
            const { stdout: outputKubectl, stderr: outputKubectlError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/replicasets.yml`])
            log.info(outputKubectl);
            log.warn(outputKubectlError)
            const { stdout: outputService, stderr: outputServiceError } =  await super.runCommand("kubectl",["create", "-f", `${__dirname}/service.yml`])
            log.info(outputService);
            log.warn(outputServiceError)
            loader.stop("____________________________")
            let loading = true
            loader.start(`Waiting for creation of pods!`);
            while(loading) {
                const { stdout: outputStatusPods } =  await super.runCommand("kubectl",["get", "pods", "-o", "json"])
                const statusPods = JSON.parse(outputStatusPods)
                loading = !statusPods.items.every(pod=> pod.status.phase === 'Running')
            }
            loader.stop("____________________________");
            log.message('Listening port 3000', { symbol: '👂' });
            await super.runCommand("kubectl",["port-forward", "service/go-demo-2", "3000:28017", "--address", "0.0.0.0"]);

        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}