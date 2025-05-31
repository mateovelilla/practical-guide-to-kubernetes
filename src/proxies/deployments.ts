import { select } from "@clack/prompts";
import { SimpleMongoDeploymentHandler } from "../handlers/deployments/simpleMongoDeployment/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    let handler: AbstractHandler
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-mongo-deployment', label: 'Simple Deployment with MongoDB', hint: "defines a Deployment named go-demo-2-db that manages a MongoDB database service. It uses the apps/v1 API version and creates Pods with a container running the mongo:3.3 image. The Deployment uses a selector to match Pods labeled with type: db and service: go-demo-2. Each Pod will include these labels, along with an additional vendor: MongoLabs label. The MongoDB container inside the Pods exposes port 28017. Essentially, this manifest sets up a database backend (MongoDB) as a replicated and self-healing service within Kubernetes, ensuring that the database service is consistently available." },
            { value: 'Other', label: 'nothing' },
        ],
    });
    switch (podProject) {
        case "simple-mongo-deployment":
            handler = new SimpleMongoDeploymentHandler();
            break;
        default:
            break;
    }
    return handler
}