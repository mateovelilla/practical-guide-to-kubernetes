import * as p from "@clack/prompts";
import { StateClusterHandler } from "./src/handlers/stateCluster.ts";
import { type Request } from "./src/handlers/request.type.ts";
const clusterName = await p.text({
  message: 'What is the cluster name?',
  initialValue: 'myCluster'
});
const request: Request = {
	clusterName
} 
const stateCluster = new StateClusterHandler();
stateCluster.handle(request)
console.log(clusterName)
