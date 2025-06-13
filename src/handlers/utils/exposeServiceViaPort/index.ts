import { spinner, log } from "@clack/prompts";

import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class ExposePortHandler extends AbstractHandler {
    public async handle(request: Request){
        const args = ["port-forward",`service/${request.serviceName}`,  `${request.exposedPort}:${request.localPort}`,"--address", "0.0.0.0"]
        if(request.namespace)
            args.push('-n', request.namespace)
        log.message(`Listening port ${request.exposedPort}`, { symbol: '👂' });
        await super.runCommand("kubectl",args);
        return await super.handle(request);
    }
}