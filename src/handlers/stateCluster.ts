import { spinner, log } from "@clack/prompts";

import { AbstractHandler } from "./handler.abstract.ts"
import { type Request } from "./request.type.ts"
export class StateClusterHandler extends AbstractHandler {
    public async handle(request: Request){
        const loader = spinner()
        loader.start(`Creating ${request.clusterName} Cluster Server!`);
        const { stdout: outputK3d, stderr: outputK3dError} = await this.runCommand("k3d",["cluster", "create",`${request.clusterName}`]);
        log.info(outputK3d);
        log.error(outputK3dError)
        loader.stop("Cluster Created!")
        loader.start("Cluster details");
        const { stdout: outputKubectl, stderr: outputKubectlError } = await this.runCommand("kubectl",["get", "nodes"]);
        log.info(outputKubectl);
        log.warn(outputKubectlError)
        loader.stop("________________________________________")
        return await super.handle(request);
    }
}