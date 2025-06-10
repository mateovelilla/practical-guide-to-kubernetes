import { select } from "@clack/prompts";
import { NginxIngressControllerHandler } from "../handlers/ingress/nginx-ingress-controller/index.ts"
import { NginxIngressBasedOnPathsHandler } from "../handlers/ingress/nginx-ingress-based-on-paths/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts"
import { ListPodsHandler } from "../handlers/utils/listPods/index.ts"
import { ExposePortHandler } from "../handlers/utils/exposeServiceViaPort/index.ts"
export async function run(){
    const statusCheckerNginx = new StatusPodsCheckerHandler()
    const listPods = new ListPodsHandler();
    const exportPortHandler = new ExposePortHandler();
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'nginx-ingress-controller', label: 'Nginx Ingress controller', hint: "The provided YAML manifests define the necessary Kubernetes resources to deploy the NGINX Ingress Controller in the ingress-nginx namespace. This includes creating service accounts, roles, role bindings, cluster roles, and cluster role bindings for both the controller and its admission webhook components, ensuring proper RBAC (Role-Based Access Control). It deploys the controller using a Deployment with readiness and liveness probes, resource limits, and secure configurations. Two Service resources expose the controller: one as a LoadBalancer for external traffic and another as a ClusterIP for internal webhook communication. It also includes jobs to create and patch TLS certificates used by the admission webhook, enabling secure communication for admission control. Overall, this setup enables a production-ready, secure, and extensible ingress controller in a Kubernetes cluster." },
            { value: 'nginx-ingress-based-on-paths', label: 'Nginx Ingress Based on Paths', hint: "This Kubernetes Ingress manifest defines a rule that directs incoming HTTP traffic targeting the /demo path to a service named go-demo-2-api on port 8080 within the cluster. It uses the NGINX Ingress Controller (specified via the kubernetes.io/ingress.class: 'nginx' annotation) to handle the routing. The annotations also explicitly disable automatic redirection from HTTP to HTTPS. The path matching type is set to ImplementationSpecific, which means the controller determines how to interpret the path (usually prefix-based in NGINX). Overall, this configuration allows external clients to access the internal go-demo-2-api service via the /demo route without enforcing SSL redirection." },
            
        ],
    });
    let handler: AbstractHandler
    switch (podProject) {
        case "nginx-ingress-controller":
            handler = new NginxIngressControllerHandler();
            listPods.setNext(exportPortHandler)
            statusCheckerNginx.setNext(listPods)
            handler.setNext(statusCheckerNginx)
            break;
        case "nginx-ingress-based-on-paths":
            handler = new NginxIngressControllerHandler();
            const nginxBasedOnPaths = new NginxIngressBasedOnPathsHandler();
            listPods.setNext(exportPortHandler)
            nginxBasedOnPaths.setNext(listPods)
            statusCheckerNginx.setNext(nginxBasedOnPaths)
            handler.setNext(statusCheckerNginx)
            break;
        default:
            break;
    }
 
    return handler
}