import { spinner, log } from "@clack/prompts";

import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class ExposePortHandler extends AbstractHandler {
    public async handle(request: Request){
        log.message(`Listening port ${request.exposedPort}`, { symbol: '👂' });
        await super.runCommand("kubectl",["port-forward", `service/${request.serviceName}`, `${request.exposedPort}:${request.localPort}`, "--address", "0.0.0.0"]);
        return await super.handle(request);
    }
}