import { log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class ListReplicasetHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const { stdout: outputGetReplicaset, stderr: outputGetReplicasetError } =  await super.runCommand("kubectl",["get", "rs"])
            log.info(outputGetReplicaset);
            log.warn(outputGetReplicasetError)
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}