import * as p from "@clack/prompts";
import { StateClusterHandler } from "./src/handlers/stateCluster.ts";
import { type Request } from "./src/handlers/request.type.ts";
import * as pods from "./src/proxies/pods.ts"
import * as replicaset from "./src/proxies/replicaset.ts"
import { AbstractHandler } from "./src/handlers/handler.abstract.ts";
const projects = await p.select({
  message: 'Pick an implementation',
  options: [
    { value: 'pods', label: 'Pods' },
    { value: 'replicaset', label: 'ReplicaSet' },
  ],
});
let projectHandler: AbstractHandler
switch (projects) {
  case "pods":
    projectHandler = await pods.run()
    break;
  case "replicaset":
     projectHandler = await replicaset.run()
    break;
  default:
    break;
}
const clusterName = await p.text({
  message: 'What is the cluster name?',
  initialValue: 'myCluster'
});
const request: Request = {
	clusterName
}
const stateCluster = new StateClusterHandler();
stateCluster.setNext(projectHandler)
await stateCluster.handle(request)
