import { select } from "@clack/prompts";
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { SimpleMongoDeploymentHandler } from "../handlers/deployments/simpleMongoDeployment/index.ts"
import { MongoDeploymentWithServiceHandler } from "../handlers/deployments/deploymentMongoDbWithService/index.ts"
import { DeploymentWithZeroDownTimeHandler } from "../handlers/deployments/deploymentZeroDownTime/index.ts";
import { DeploymentApiWithMongoInTheSameFileTimeHandler } from "../handlers/deployments/deploymentApiWithMongoInTheSameFile/index.ts"; 
import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts";
import { StatusDeploymentsCheckerHandler } from "../handlers/utils/statusDeploymentsChecker/index.ts";
import { ListPodsHandler } from "../handlers/utils/listPods/index.ts";

export async function run(){
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-mongo-deployment', label: 'Simple Deployment with MongoDB', hint: "defines a Deployment named go-demo-2-db that manages a MongoDB database service. It uses the apps/v1 API version and creates Pods with a container running the mongo:3.3 image. The Deployment uses a selector to match Pods labeled with type: db and service: go-demo-2. Each Pod will include these labels, along with an additional vendor: MongoLabs label. The MongoDB container inside the Pods exposes port 28017. Essentially, this manifest sets up a database backend (MongoDB) as a replicated and self-healing service within Kubernetes, ensuring that the database service is consistently available." },
            { value: 'mongo-deployment-with-service', label: 'Deployment with MongoDB with service', hint: "defines a Deployment named go-demo-2-db that manages a MongoDB database service. It uses the apps/v1 API version and creates Pods with a container running the mongo:3.3 image. The Deployment uses a selector to match Pods labeled with type: db and service: go-demo-2. Each Pod will include these labels, along with an additional vendor: MongoLabs label. The MongoDB container inside the Pods exposes port 28017. Essentially, this manifest sets up a database backend (MongoDB) as a replicated and self-healing service within Kubernetes, ensuring that the database service is consistently available and finally create a service associate to the deployment." },
            { value: 'deployment-zero-downtime', label: 'Deployment with zero downtime', hint: "This Kubernetes Deployment manifest defines a service called go-demo-2-api that maintains 3 replicas of a container running the vfarcic/go-demo-2 image. It uses a RollingUpdate strategy with a max surge and max unavailable of 1 to ensure smooth, zero-downtime updates. Pods are labeled with type: api, service: go-demo-2, and language: go, and matched by the selector to be managed by this deployment. Each container sets the environment variable DB=go-demo-2-db and exposes a health check endpoint at /demo/hello on port 8080, used for both readiness and liveness probes. The deployment includes rollout controls like minReadySeconds: 1, progressDeadlineSeconds: 60, and a revisionHistoryLimit of 5 to manage stability and rollback capabilities." },
            { value: 'deployment-zero-downtime-in-the-same-file', label: 'Deployment of an API and MongoDb with zero downtime in the same manifest', hint: "This Kubernetes Deployment manifest defines a service called go-demo-2-api that maintains 3 replicas of a container running the vfarcic/go-demo-2 image. It uses a RollingUpdate strategy with a max surge and max unavailable of 1 to ensure smooth, zero-downtime updates. Pods are labeled with type: api, service: go-demo-2, and language: go, and matched by the selector to be managed by this deployment. Each container sets the environment variable DB=go-demo-2-db and exposes a health check endpoint at /demo/hello on port 8080, used for both readiness and liveness probes. The deployment includes rollout controls like minReadySeconds: 1, progressDeadlineSeconds: 60, and a revisionHistoryLimit of 5 to manage stability and rollback capabilities in the same file." },
        ],
    });
    const statusCheckerPods = new StatusPodsCheckerHandler()
    const statusCheckerDeployments = new StatusDeploymentsCheckerHandler()
    const listPods = new ListPodsHandler();
    const deploymentWithZeroDowntime = new DeploymentWithZeroDownTimeHandler()
    const mongoDeploymentWithService = new MongoDeploymentWithServiceHandler()
    let handler: AbstractHandler
    switch (podProject) {
        case "simple-mongo-deployment":
            handler = new SimpleMongoDeploymentHandler();
            statusCheckerDeployments.setNext(listPods)
            statusCheckerPods.setNext(statusCheckerDeployments)
            handler.setNext(statusCheckerPods)
            break;
        case "mongo-deployment-with-service":
             handler = new SimpleMongoDeploymentHandler()
             statusCheckerDeployments.setNext(listPods)
             statusCheckerPods.setNext(statusCheckerDeployments)
             mongoDeploymentWithService.setNext(statusCheckerPods)
             handler.setNext(mongoDeploymentWithService)
            break;
        case "deployment-zero-downtime":
             handler = new SimpleMongoDeploymentHandler()
             deploymentWithZeroDowntime.setNext(statusCheckerPods)
             listPods.setNext(deploymentWithZeroDowntime)
             statusCheckerDeployments.setNext(listPods)
             statusCheckerPods.setNext(statusCheckerDeployments)
             mongoDeploymentWithService.setNext(statusCheckerPods)
             handler.setNext(mongoDeploymentWithService)
            break;
        case "deployment-zero-downtime-in-the-same-file":
            handler = new DeploymentApiWithMongoInTheSameFileTimeHandler();
            statusCheckerDeployments.setNext(listPods)
            statusCheckerPods.setNext(statusCheckerDeployments)
            handler.setNext(statusCheckerPods)
            break;
        default:
            break;
    }
 
    return handler
}