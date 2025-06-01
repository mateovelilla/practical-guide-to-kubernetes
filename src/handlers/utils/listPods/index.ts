import { log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class ListPodsHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const { stdout: outputGetPods, stderr: outputGetPodsError } =  await super.runCommand("kubectl",["get", "pods"])
            log.info(outputGetPods);
            log.warn(outputGetPodsError)
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}