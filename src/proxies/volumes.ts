import { select } from "@clack/prompts";
import {  CreateClusterHandler } from "../handlers/utils/createCluster/index.ts"
import { JenkinsWithEmptyFolderHandler } from "../handlers/volumes/jenkins-project-with-empty-folder/index.ts"
import { SharingFilePrometheusConfigHandler } from "../handlers/volumes/sharing-file-prometheus-config/index.ts"
import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts"
import { ListPodsHandler } from "../handlers/utils/listPods/index.ts";
import { ExposePortHandler } from "../handlers/utils/exposeServiceViaPort/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import type { Request } from "../handlers/request.type.ts"
export async function run(){
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
         { value: 'sharing-file-to-pod-prometheus', label: 'Sharing file for prometheus config', hint: "This Kubernetes manifest sets up a full Prometheus deployment exposed via NGINX Ingress. It defines an Ingress resource named prometheus that routes external HTTP traffic from the /prometheus path to the internal Prometheus service on port 9090, with HTTPS redirection explicitly disabled. The Service named prometheus forwards requests to pods labeled with type: monitor and service: prometheus. The Deployment also named prometheus runs a single container using the prom/prometheus:v2.0.0 image, configuring it with specific command-line arguments for the config file, storage path, and a custom external URL. The deployment uses a Recreate strategy and ensures pods are matched by the same labels defined in the service selector. This configuration allows Prometheus to be deployed, exposed, and accessed through a web URL under /prometheus." },
         { value: 'jenkins-project-with-empty-folder', label: 'Simple Jenkis project with empty folder', hint: "This Kubernetes manifest sets up a full Prometheus deployment exposed via NGINX Ingress. It defines an Ingress resource named prometheus that routes external HTTP traffic from the /prometheus path to the internal Prometheus service on port 9090, with HTTPS redirection explicitly disabled. The Service named prometheus forwards requests to pods labeled with type: monitor and service: prometheus. The Deployment also named prometheus runs a single container using the prom/prometheus:v2.0.0 image, configuring it with specific command-line arguments for the config file, storage path, and a custom external URL. The deployment uses a Recreate strategy and ensures pods are matched by the same labels defined in the service selector. This configuration allows Prometheus to be deployed, exposed, and accessed through a web URL under /prometheus." },
        ],
    });
    let handler: AbstractHandler
    const request: Request  = {};
    const statusPodsChecker = new StatusPodsCheckerHandler()
    const exportPortHandler = new ExposePortHandler()
    switch (podProject) {
        case "sharing-file-to-pod-prometheus":
            const sharingFilePrometheusConfig = new SharingFilePrometheusConfigHandler();
            statusPodsChecker.setNext(exportPortHandler)
            sharingFilePrometheusConfig.setNext(statusPodsChecker)
            await sharingFilePrometheusConfig.handle(request)
            break;
        case "jenkins-project-with-empty-folder":
            const clusterHandler = new CreateClusterHandler()
            const jenkinsWithEmptyFolder = new JenkinsWithEmptyFolderHandler();
            const listPods = new ListPodsHandler();
            listPods.setNext(exportPortHandler)
            jenkinsWithEmptyFolder.setNext(listPods)
            clusterHandler.setNext(jenkinsWithEmptyFolder); 
            await clusterHandler.handle(request);
            break;
        default:
            break;
    }
 
    return handler
}