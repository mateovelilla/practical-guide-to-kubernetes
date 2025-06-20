import { select } from "@clack/prompts";
import type { AbstractHandler } from "../handlers/handler.abstract.ts";
import { SimpleConfigmapWithFilesSharedHandler } from "../handlers/configmaps/simpleConfigMapWithFilesShared/index.ts"
import { ConfigmapsUsingLiteralsHandler } from "../handlers/configmaps/configmapsUsingLiterals/index.ts"
import {  PodAlpineUsingEnvironmentVariablesHandler } from "../handlers/configmaps/podAlpineUsingEnvironmentVariables/index.ts"
import { LoadAllConfigmapsInAlpinePodHandler } from "../handlers/configmaps/loadAllConfigmapsInAlpinePod/index.ts"
import { ExposePortHandler } from "../handlers/utils/exposeServiceViaPort/index.ts"
import { NginxIngressControllerHandler } from "../handlers/ingress/nginx-ingress-controller/index.ts";
import { StatusPodsCheckerHandler } from "../handlers/utils/statusPodsChecker/index.ts";
import { ListPodsHandler } from "../handlers/utils/listPods/index.ts"
import { PrometheusWithConfigmapGeneratedViaManifestHandler } from "../handlers/configmaps/prometheusWithConfigmapGeneratedViaManifest/index.ts"
export async function run(){
    const podProject = await select({
        message: 'What project do you want to implement?',
        options: [
            { value: 'simple-configmap-with-files-shared', label: 'Simple shared in alpine pod', hint: "This Kubernetes manifest defines a simple Pod named alpine that runs a single container based on the lightweight Alpine Linux image. The container executes the sleep 100000 command to stay alive for testing or debugging purposes. A volume named config-vol is mounted inside the container at the path /etc/config, and this volume is sourced from a ConfigMap named my-config. This setup allows the container to access configuration data stored in the ConfigMap as files within the specified directory." },
            { value: 'configmaps-using-literals', label: 'Configmaps using literals', hint: "This option allows you to generate a lightweight Alpine-based Pod that mounts a specific folder containing configuration files provided through ConfigMaps created from literal values. It’s particularly useful for testing or deploying minimal containers where configuration data needs to be injected at runtime in a structured and accessible way within the container’s filesystem." },
            { value: 'pod-alpine-using-variable-environments', label: 'Pod Alpine using configmap to charge environment variables', hint: "This configuration defines a lightweight Alpine-based Pod that uses a ConfigMap to load environment variables into the container. By referencing the ConfigMap, the Pod can dynamically inject key-value pairs as environment variables, enabling better separation of configuration from code and allowing easier updates or modifications to runtime settings without changing the container image. This approach is ideal for managing environment-specific configurations in a clean and maintainable way." },
            { value: 'pod-alpine-using-all-variables-in-the-configmap', label: 'Pod Alpine using all values loaded in the configmap', hint: "This setup defines an Alpine-based Pod that loads all key-value pairs from a ConfigMap as environment variables within the container. By referencing the entire ConfigMap, the Pod can access all its configuration data without specifying each variable individually. This approach streamlines configuration management, especially when dealing with multiple environment variables, and ensures the container has access to all necessary settings defined in the ConfigMap at runtime." },
            { value: 'prometheus-pod-with-config-map', label: 'Prometheus Project loading configmap from manifest', hint: "This Prometheus project configuration involves loading a ConfigMap directly from a Kubernetes manifest to supply the necessary settings for Prometheus to run. The ConfigMap contains the prometheus.yml file or other configuration data, which is then mounted into the Prometheus container at the expected path. This method ensures that configuration is version-controlled, easily updated, and decoupled from the container image, making the Prometheus deployment more flexible and maintainable in dynamic Kubernetes environments." },
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
            handler = new PodAlpineUsingEnvironmentVariablesHandler();
            break;
        case "pod-alpine-using-all-variables-in-the-configmap":
            handler = new LoadAllConfigmapsInAlpinePodHandler();
            break;
        case "prometheus-pod-with-config-map": 
            handler = new NginxIngressControllerHandler();
            const prometheusWithConfigmapGeneratedViaManifest = new PrometheusWithConfigmapGeneratedViaManifestHandler();
            const exposedPort = new ExposePortHandler();
            const statusCheckerNginx = new StatusPodsCheckerHandler()
            const listPods = new ListPodsHandler();
            prometheusWithConfigmapGeneratedViaManifest.setNext(exposedPort)
            listPods.setNext(prometheusWithConfigmapGeneratedViaManifest)
            statusCheckerNginx.setNext(listPods)
            handler.setNext(statusCheckerNginx)
            break;
        default:
            break;
    }
 
    return handler
}