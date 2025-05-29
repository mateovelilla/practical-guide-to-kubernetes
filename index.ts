import * as p from "@clack/prompts";
import { StateClusterHandler } from "./src/handlers/stateCluster.ts";
import { type Request } from "./src/handlers/request.type.ts";
import * as pods from "./src/proxies/pods.ts"
import * as replicaset from "./src/proxies/replicaset.ts"
import * as deleteCluster from "./src/proxies/delete.ts"
const projects = await p.select({
  message: 'Pick an implementation',
  options: [
    { value: 'pods', label: 'Pods' },
    { value: 'replicaset', label: 'ReplicaSet' },
    { value: 'delete', label: 'Delete Cluster' },

  ],
});
const clusterName = await p.text({
  message: 'What is the cluster name?',
  initialValue: 'myCluster'
});
const request: Request = {
	clusterName
}
const stateCluster = new StateClusterHandler();
switch (projects) {
  case "pods":
    const podHandler = await pods.run()
    stateCluster.setNext(podHandler)
    await stateCluster.handle(request)
    break;
  case "replicaset":
    const replicasetHandler = await replicaset.run()
    stateCluster.setNext(replicasetHandler)
    await stateCluster.handle(request)
    break;
  case "delete":
    const deleteHandler = await deleteCluster.run()
    await deleteHandler.handle(request)
    break;
  default:
    break;
}


