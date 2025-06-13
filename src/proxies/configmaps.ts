import { select } from "@clack/prompts";
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
export async function run(){
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-configmap-with-files-shared', label: 'Simple shared in alpine pod', hint: "This Kubernetes manifest defines a simple Pod named alpine that runs a single container based on the lightweight Alpine Linux image. The container executes the sleep 100000 command to stay alive for testing or debugging purposes. A volume named config-vol is mounted inside the container at the path /etc/config, and this volume is sourced from a ConfigMap named my-config. This setup allows the container to access configuration data stored in the ConfigMap as files within the specified directory." },
        ],
    });
    let handler: AbstractHandler
    switch (podProject) {
        case "simple-configmap-with-files-shared":
            break;
        default:
            break;
    }
 
    return handler
}