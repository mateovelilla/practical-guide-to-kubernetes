import { spinner } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class StatusPodsCheckerHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const args = ["get", "pods", "-o", "json"];
            if(request.namespace)
                args.push("-n", request.namespace)
            const loader = spinner()
            let loading = true
            loader.start(`Waiting for creation of pods!`);
            while(loading) {
                const { stdout: outputStatusPods } =  await super.runCommand("kubectl",args)
                const statusPods = JSON.parse(outputStatusPods)
                loading = !statusPods.items.every(pod=> pod.status.phase === 'Running')
            }
            loader.stop("____________________________");
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}