import { select } from "@clack/prompts";
// import { NginxIngressControllerHandler } from "../handlers/ingress/nginx-ingress-controller/index.ts"
// import { NginxIngressBasedOnPathsHandler } from "../handlers/ingress/nginx-ingress-based-on-paths/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { CreateClusterWithVolumeHandler } from "../handlers/utils/createClusterWithVolume/index.ts"
// import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts"
// import { ListPodsHandler } from "../handlers/utils/listPods/index.ts"
// import { ExposePortHandler } from "../handlers/utils/exposeServiceViaPort/index.ts"
export async function run(){
    const statusCheckerNginx = new StatusPodsCheckerHandler()
    const listPods = new ListPodsHandler();
    const exportPortHandler = new ExposePortHandler();
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
         { value: 'sharing-file-to-pod-prometheus', label: 'Sharing file for prometheus config', hint: "This Kubernetes manifest sets up a full Prometheus deployment exposed via NGINX Ingress. It defines an Ingress resource named prometheus that routes external HTTP traffic from the /prometheus path to the internal Prometheus service on port 9090, with HTTPS redirection explicitly disabled. The Service named prometheus forwards requests to pods labeled with type: monitor and service: prometheus. The Deployment also named prometheus runs a single container using the prom/prometheus:v2.0.0 image, configuring it with specific command-line arguments for the config file, storage path, and a custom external URL. The deployment uses a Recreate strategy and ensures pods are matched by the same labels defined in the service selector. This configuration allows Prometheus to be deployed, exposed, and accessed through a web URL under /prometheus." },
        ],
    });
    let handler: AbstractHandler
    switch (podProject) {
        case "sharing-file-to-pod-prometheus":
            
            handler = new NginxIngressControllerHandler();
            listPods.setNext(exportPortHandler)
            statusCheckerNginx.setNext(listPods)
            handler.setNext(statusCheckerNginx)
            break;
        default:
            break;
    }
 
    return handler
}