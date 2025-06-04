import { select } from "@clack/prompts";
import { ServiceWithReplicaSetHandler } from "../handlers/services/serviceWithReplicaset/index.ts"
import { ServiceWithReplicaSetInTheSameFileHandler } from "../handlers/services/serviceAllInTheSameFile/index.ts";
import { StatusReplicasCheckerHandler } from "../handlers/utils/statusReplicasetChecker/index.ts"
import { ListReplicasetHandler } from "../handlers/utils/listReplicaset/index.ts"
import { ExposePortHandler } from "../handlers/utils/exposeServiceViaPort/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    const statusCheckerReplica = new StatusReplicasCheckerHandler()
    const listReplicaSets = new ListReplicasetHandler()
    const exposePort = new ExposePortHandler()
    let handler: AbstractHandler
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'service-with-replica-set', label: 'Service with replicaset', hint: "defines a ReplicaSet and Service with a port forwading" },
            { value: 'service-with-replica-set-at-the-same-file', label: 'Service with replicaset in the same file', hint: "defines a ReplicaSet and Service with a port forwading in the same YML file" },
        
        ],
    });
    switch (podProject) {
        case "service-with-replica-set":
            handler = new ServiceWithReplicaSetHandler();
            break;
        case "service-with-replica-set-at-the-same-file":
            handler = new ServiceWithReplicaSetInTheSameFileHandler()
            break;
        default:
            break;
    }
    listReplicaSets.setNext(exposePort)
    statusCheckerReplica.setNext(listReplicaSets);
    handler.setNext(statusCheckerReplica);
    return handler
}