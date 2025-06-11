import * as p from "@clack/prompts";
import { type Request } from "./src/handlers/request.type.ts";
import * as pods from "./src/proxies/pods.ts"
import * as replicaset from "./src/proxies/replicaset.ts"
import * as service from "./src/proxies/services.ts"
import * as deployment from "./src/proxies/deployments.ts"
import * as ingress from "./src/proxies/ingress.ts"
import * as volumes from "./src/proxies/volumes.ts"
import { DeleteClusterHandler } from "./src/handlers/utils/deleteCluster/index.ts"
import { CreateClusterHandler } from "./src/handlers/utils/createCluster/index.ts"
import { AbstractHandler } from "./src/handlers/handler.abstract.ts";
const projects = await p.select({
  message: 'Pick an implementation',
  options: [
    { value: 'pods', label: 'Pods' },
    { value: 'replicaset', label: 'ReplicaSet' },
    { value: 'service', label: 'Sevices' },
    { value: 'deployment', label: 'Deployments' },
    { value: 'ingress', label: 'Ingress Controllers' },
    { value: 'delete', label: 'Delete Cluster' },


  ],
});
const request: Request = {
	clusterName: ""
}
const createCluster = new CreateClusterHandler()
let lastChain: AbstractHandler;
switch (projects) {
  case "pods":
    lastChain = await pods.run()
    break;
  case "replicaset":
    lastChain = await replicaset.run()
    break;
  case "service":
    lastChain = await service.run()
    break;
  case "deployment":
    lastChain = await deployment.run()
    break;
  case "ingress":
    lastChain = await ingress.run()
    break;
  case "volumes":
      lastChain = new volumes.run()
      await lastChain.handle()
    break;
  case "delete":
    lastChain = new DeleteClusterHandler();
    break;
  default:
    break;
}
if(projects !='delete' && projects != 'volumes') {
  createCluster.setNext(lastChain)
  await createCluster.handle(request)
}


