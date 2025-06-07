import { log } from "@clack/prompts";
import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class ListPodsHandler extends AbstractHandler {
    public async handle(request: Request) {
        try {
            const args = ["get", "pods"];
            if(request.namespace)
                args.push("-n", request.namespace)
            const { stdout: outputGetPods, stderr: outputGetPodsError } =  await super.runCommand("kubectl",args)
            log.info(outputGetPods);
            log.warn(outputGetPodsError)
        } catch (error) {
            console.log(error)
        }finally {
            return await super.handle(request)
        }
       
    }
}