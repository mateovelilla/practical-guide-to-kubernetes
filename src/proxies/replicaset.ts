import { select } from "@clack/prompts";
import { SimpleReplicasetHandler } from "../handlers/replicasets/simpleReplicaSet/index.ts"
import { DeleteReplicasetHandler } from "../handlers/replicasets/deleteReplicaSet/index.ts";
import { AssociateReplicasetHandler } from "../handlers/replicasets/associateReplicaSet/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    let handler: AbstractHandler
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-replica-set', label: 'Simple Replicaset', hint: "defines a ReplicaSet named stack-with-replicaset in the apps/v1 API version. It specifies two replicas, each containing a pod template with specific labels: type: backend, service: simple-replicaset-stack, db: mongo, and language: go. The ReplicaSet matches pods with these labels to manage scaling and ensure the desired state. Inside each pod, there are two containers: the first is named db, using the mongo:3.3 image, and the second is named api, using the vfarcic/go-demo-2 image. The api container sets an environment variable DB with the value localhost and includes a liveness probe that checks the health of the container by making an HTTP GET request to /demo/hello on port 8080." },
            { value: 'delete-replica-set', label: 'Delete Replicaset', hint: "deletes the ReplicaSet defined in the file replicasets.yml without deleting the Pods that were created by it. The --cascade=orphan flag tells Kubernetes to orphan the child resources (Pods) instead of deleting them when their parent (the ReplicaSet) is deleted. This is useful if you want to keep the Pods running even after removing the managing ReplicaSet." },
            { value: 'associate-replica-set', label: 'Associate Replicaset', hint: "This command associates the replicaset again after being deleted" },
            
        ],
    });
    switch (podProject) {
        case "simple-replica-set":
            handler = new SimpleReplicasetHandler();
            break;
        case "delete-replica-set":
            handler = new DeleteReplicasetHandler();
            break;
        case "associate-replica-set":
            handler = new AssociateReplicasetHandler();
            break;
        default:
            break;
    }
    return handler
}