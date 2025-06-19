import { select } from "@clack/prompts";
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { ExposePortHandler } from "../handlers/utils/exposeServiceViaPort/index.ts"
import { NginxIngressControllerHandler } from "../handlers/ingress/nginx-ingress-controller/index.ts";
import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts";
import { ListPodsHandler } from "../handlers/utils/listPods/index.ts"
import { JenkinsMountingGenericSecretsHandler } from "../handlers/secrets/jenkinsMountingGenericSecrets/index.ts";
export async function run(){
    const secretProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'jenkins-mounting-generic-secrets', label: 'Simple Jenkins project with generic secrets', hint: "This Kubernetes manifest deploys Jenkins using three key resources: a Deployment that runs a Jenkins container with custom configuration and secrets mounted from a Secret, a Service that exposes Jenkins internally on port 8080 using labels to route traffic to the correct pod, and an Ingress that enables external access to Jenkins through the /jenkins path without SSL redirection, using the NGINX Ingress controller." },
        ],
    });
    let handler: AbstractHandler
    switch (secretProject) {
        case "jenkins-mounting-generic-secrets": 
            handler = new NginxIngressControllerHandler();
            const jenkinsMountingGenericSecretsHandler = new JenkinsMountingGenericSecretsHandler();
            const exposedPort = new ExposePortHandler();
            const statusCheckerNginx = new StatusPodsCheckerHandler()
            const statusCheckerJenkinsPods = new StatusPodsCheckerHandler()
            const listPods = new ListPodsHandler();
            statusCheckerJenkinsPods.setNext(exposedPort)
            jenkinsMountingGenericSecretsHandler.setNext(statusCheckerJenkinsPods)
            listPods.setNext(jenkinsMountingGenericSecretsHandler)
            statusCheckerNginx.setNext(listPods)
            handler.setNext(statusCheckerNginx)
            break;
        default:
            break;
    }
 
    return handler
}