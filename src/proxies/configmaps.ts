import { select } from "@clack/prompts";
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { SimpleConfigmapWithFilesSharedHandler } from "../handlers/configmaps/simpleConfigMapWithFilesShared/index.ts"
import { ConfigmapsUsingLiteralsHandler } from "../handlers/configmaps/configmapsUsingLiterals/index.ts"
import {  PodAlpineUsingEnvironmentVariablesHandler } from "../handlers/configmaps/podAlpineUsingEnvironmentVariables/index.ts"
export async function run(){
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-configmap-with-files-shared', label: 'Simple shared in alpine pod', hint: "This Kubernetes manifest defines a simple Pod named alpine that runs a single container based on the lightweight Alpine Linux image. The container executes the sleep 100000 command to stay alive for testing or debugging purposes. A volume named config-vol is mounted inside the container at the path /etc/config, and this volume is sourced from a ConfigMap named my-config. This setup allows the container to access configuration data stored in the ConfigMap as files within the specified directory." },
            { value: 'configmaps-using-literals', label: 'Configmaps using literals', hint: "This option allows you to generate a lightweight Alpine-based Pod that mounts a specific folder containing configuration files provided through ConfigMaps created from literal values. It’s particularly useful for testing or deploying minimal containers where configuration data needs to be injected at runtime in a structured and accessible way within the container’s filesystem." },
            { value: 'pod-alpine-using-variable-environments', label: 'Pod Alpine using configmap to charge environment variables', hint: "This configuration defines a lightweight Alpine-based Pod that uses a ConfigMap to load environment variables into the container. By referencing the ConfigMap, the Pod can dynamically inject key-value pairs as environment variables, enabling better separation of configuration from code and allowing easier updates or modifications to runtime settings without changing the container image. This approach is ideal for managing environment-specific configurations in a clean and maintainable way." },

        ],
    });
    let handler: AbstractHandler
    switch (podProject) {
        case "simple-configmap-with-files-shared":
            handler = new SimpleConfigmapWithFilesSharedHandler();
            break;
        case "configmaps-using-literals":
            handler = new ConfigmapsUsingLiteralsHandler(); 
            break;
        case "pod-alpine-using-variable-environments":
            handler = new PodAlpineUsingEnvironmentVariablesHandler()
            break;
        default:
            break;
    }
 
    return handler
}