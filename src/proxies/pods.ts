import { spinner, log, select } from "@clack/prompts";
import { SimpleMongoPodHandler } from "../handlers/pods/simpleMongoPod/index.ts"
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    let handler: AbstractHandler
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-mongo-pod', label: 'Simple Pod with MongoDB', hint: "This Kubernetes manifest defines a single Pod named db that runs a MongoDB container using the mongo:3.3 image. The container is configured to run the mongod command with two arguments: --rest and --httpinterface, which enable REST access and the HTTP interface for the MongoDB server. The Pod is labeled with metadata to indicate its type (db) and vendor (MongoLabs), which can be useful for selection or organization within a cluster." },
            { value: 'Other', label: 'nothing' },
        ],
    });
    switch (podProject) {
        case "simple-mongo-pod":
            handler = new SimpleMongoPodHandler();
            break;
    
        default:
            break;
    }
    return handler
}