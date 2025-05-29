import { DeleteClusterHandler } from "../handlers/deleteCluster.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    const handler: AbstractHandler = new DeleteClusterHandler()
    return handler
}