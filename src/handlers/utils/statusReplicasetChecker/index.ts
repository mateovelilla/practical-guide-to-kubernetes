import { spinner } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class StatusReplicasCheckerHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const loader = spinner()
            let loading = true
            loader.start(`Waiting for creation of replicasets!`);
            while(loading) {
                const { stdout: outputStatusReplicas } =  await super.runCommand("kubectl",["get", "rs", "-o", "json"])
                const statusReplicas = JSON.parse(outputStatusReplicas)
                loading = !statusReplicas.items.every(replica=> replica.status.replicas === replica.status.readyReplicas)
            }
            loader.stop("____________________________");
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}