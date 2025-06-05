import { select } from "@clack/prompts";
import { SimpleMongoDeploymentHandler } from "../handlers/deployments/simpleMongoDeployment/index.ts"
import { MongoDeploymentWithServiceHandler } from "../handlers/deployments/deploymentMongoDbWithService/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts";
import { StatusDeploymentsCheckerHandler } from "../handlers/utils/statusDeploymentsChecker/index.ts";
import { ListPodsHandler } from "../handlers/utils/listPods/index.ts";

export async function run(){
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-mongo-deployment', label: 'Simple Deployment with MongoDB', hint: "defines a Deployment named go-demo-2-db that manages a MongoDB database service. It uses the apps/v1 API version and creates Pods with a container running the mongo:3.3 image. The Deployment uses a selector to match Pods labeled with type: db and service: go-demo-2. Each Pod will include these labels, along with an additional vendor: MongoLabs label. The MongoDB container inside the Pods exposes port 28017. Essentially, this manifest sets up a database backend (MongoDB) as a replicated and self-healing service within Kubernetes, ensuring that the database service is consistently available." },
            { value: 'mongo-deployment-with-service', label: 'Deployment with MongoDB with service', hint: "defines a Deployment named go-demo-2-db that manages a MongoDB database service. It uses the apps/v1 API version and creates Pods with a container running the mongo:3.3 image. The Deployment uses a selector to match Pods labeled with type: db and service: go-demo-2. Each Pod will include these labels, along with an additional vendor: MongoLabs label. The MongoDB container inside the Pods exposes port 28017. Essentially, this manifest sets up a database backend (MongoDB) as a replicated and self-healing service within Kubernetes, ensuring that the database service is consistently available and finally create a service associate to the deployment." },
            { value: 'Other', label: 'nothing' },
        ],
    });
    const statusCheckerPods = new StatusPodsCheckerHandler()
    const statusCheckerDeployments = new StatusDeploymentsCheckerHandler()
    const listPods = new ListPodsHandler();
    let handler: AbstractHandler
    switch (podProject) {
        case "simple-mongo-deployment":
            handler = new SimpleMongoDeploymentHandler();
            statusCheckerDeployments.setNext(listPods)
            statusCheckerPods.setNext(statusCheckerDeployments)
            handler.setNext(statusCheckerPods)
            break;
        case "mongo-deployment-with-service":
             const mongoDeploymentWithService = new MongoDeploymentWithServiceHandler()
             handler = new SimpleMongoDeploymentHandler()
             statusCheckerDeployments.setNext(listPods)
             statusCheckerPods.setNext(statusCheckerDeployments)
             mongoDeploymentWithService.setNext(statusCheckerPods)
             handler.setNext(mongoDeploymentWithService)
            break;
        default:
            break;
    }
 
    return handler
}