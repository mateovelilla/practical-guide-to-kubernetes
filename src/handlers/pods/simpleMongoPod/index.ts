import { spinner, log } from "@clack/prompts";

import { AbstractHandler } from "../../handler.abstract.ts"
import { type Request } from "../../request.type.ts"
export class SimpleMongoPodHandler extends AbstractHandler {
    public async handle(request: Request) {
        console.log("Chain SimpleMongoPodHandler")
        return await super.handle(request)
    }
}