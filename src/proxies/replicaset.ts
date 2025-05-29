import { select } from "@clack/prompts";
import { SimpleReplicasetHandler } from "../handlers/replicasets/simpleReplicaSet/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    let handler: AbstractHandler
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-replica-set', label: 'Simple Replicaset', hint: "defines a ReplicaSet named stack-with-replicaset in the apps/v1 API version. It specifies two replicas, each containing a pod template with specific labels: type: backend, service: simple-replicaset-stack, db: mongo, and language: go. The ReplicaSet matches pods with these labels to manage scaling and ensure the desired state. Inside each pod, there are two containers: the first is named db, using the mongo:3.3 image, and the second is named api, using the vfarcic/go-demo-2 image. The api container sets an environment variable DB with the value localhost and includes a liveness probe that checks the health of the container by making an HTTP GET request to /demo/hello on port 8080." },
        ],
    });
    switch (podProject) {
        case "simple-replica-set":
            handler = new SimpleReplicasetHandler();
            break;
        default:
            break;
    }
    return handler
}