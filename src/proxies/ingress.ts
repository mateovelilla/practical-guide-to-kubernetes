import { select } from "@clack/prompts";
import { NginxIngressControllerHandler } from "../handlers/ingress/nginx-ingress-controller/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts"
import { ListPodsHandler } from "../handlers/utils/listPods/index.ts"
export async function run(){
    const statusCheckerNginx = new StatusPodsCheckerHandler()
    const listPods = new ListPodsHandler();
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'nginx-ingress-controller', label: 'Nginx Ingress controller', hint: "The provided YAML manifests define the necessary Kubernetes resources to deploy the NGINX Ingress Controller in the ingress-nginx namespace. This includes creating service accounts, roles, role bindings, cluster roles, and cluster role bindings for both the controller and its admission webhook components, ensuring proper RBAC (Role-Based Access Control). It deploys the controller using a Deployment with readiness and liveness probes, resource limits, and secure configurations. Two Service resources expose the controller: one as a LoadBalancer for external traffic and another as a ClusterIP for internal webhook communication. It also includes jobs to create and patch TLS certificates used by the admission webhook, enabling secure communication for admission control. Overall, this setup enables a production-ready, secure, and extensible ingress controller in a Kubernetes cluster." },
        ],
    });
    let handler: AbstractHandler
    switch (podProject) {
        case "nginx-ingress-controller":
            handler = new NginxIngressControllerHandler();
            break;
        default:
            break;
    }
    statusCheckerNginx.setNext(listPods)
    handler.setNext(statusCheckerNginx)
    return handler
}