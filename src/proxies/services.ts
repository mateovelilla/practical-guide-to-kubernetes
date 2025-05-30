import { select } from "@clack/prompts";
import {ServiceWithReplicaSetHandler } from "../handlers/services/serviceWithReplicaset/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    let handler: AbstractHandler
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'service-with-replica-set', label: 'Service with replicaset', hint: "defines a ReplicaSet and Service with a port forwading" },
        ],
    });
    switch (podProject) {
        case "service-with-replica-set":
            handler = new ServiceWithReplicaSetHandler();
            break;
        default:
            break;
    }
    return handler
}