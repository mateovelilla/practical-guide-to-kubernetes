import { spinner, log } from "@clack/prompts";

import { AbstractHandler } from "./handler.abstract.ts"
import { type Request } from "./request.type.ts"
export class DeleteClusterHandler extends AbstractHandler {
    public async handle(request: Request){
        const loader = spinner()
        loader.start(`Deleting ${request.clusterName} Cluster Server!`);
        const { stdout: outputDeleteK3d, stderr: outputK3dDeleteError} = await this.runCommand("k3d",["cluster", "delete",`${request.clusterName}`, '--all']);
        log.info(outputDeleteK3d);
        log.error(outputK3dDeleteError)
        loader.stop("Cluster deleted!")
        loader.stop("________________________________________")
        return await super.handle(request);
    }
}