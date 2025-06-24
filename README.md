# Practical Guide to Kubernetes
<video id="shortVideo" controls width="1000" height="400">
    <source src="https://github.com/mateovelilla/practical-guide-to-kubernetes/blob/8a5118a96c8d3220c504730cf137d9d8552a8a66/shorts/practical-guide-to-kubernetes.mp4" type="video/mp4">
    Tu navegador no soporta video HTML5.
</video>

## 🚀 Overview

This repository offers a hands-on approach to mastering Kubernetes, focusing on real-world scenarios and best practices. It's designed for developers, DevOps engineers, and Kubernetes enthusiasts aiming to deepen their understanding through practical exercises and structured learning modules.

## 🧰 Technologies & Tools

- **Kubernetes**: Orchestration platform for automating deployment, scaling, and management of containerized applications.
- **K3d**: Tool to run K3s clusters in Docker containers, facilitating local development and testing.
- **Node.js**: JavaScript runtime for building scalable network applications.
- **TypeScript**: Superset of JavaScript that adds static typing, enhancing development efficiency and code quality.
- **pnpm**: Fast, disk space-efficient package manager for JavaScript.

## 📚 Options

The CLI is organized into the following modules:
1. **Pods**: This setup involves a MongoDB container running the mongo:3.3 image with REST and HTTP interfaces enabled, deployed in a Pod labeled for organizational purposes. Additionally, a Go-based API container (vfarcic/go-demo-2) connects to the MongoDB instance using localhost, indicating both containers likely run within the same Pod to enable local communication.
2. **Replicasets**: The configuration defines a ReplicaSet named stack-with-replicaset using the apps/v1 API version, specifying two replicas. Each pod has specific labels (type: backend, service: simple-replicaset-stack, db: mongo, and language: go) and contains two containers: a MongoDB container (mongo:3.3) and a Go-based API container (vfarcic/go-demo-2). The API container connects to MongoDB via localhost and includes a liveness probe that checks the /demo/hello endpoint on port 8080. At one point, the ReplicaSet is deleted using the --cascade=orphan flag, which removes the controller but keeps the pods running. Later, the ReplicaSet is recreated to re-establish management over the previously orphaned pods.
3. **Services**: The configuration defines a ReplicaSet and a Service that work together to deploy an application and expose it via port forwarding. In one case, the ReplicaSet and Service are defined separately, while in the other, both resources are included within the same YAML file, simplifying deployment by consolidating the setup into a single configuration.
4. **Deployments**: This set of configurations defines two key Kubernetes Deployments: one for a MongoDB database (go-demo-2-db) and another for a Go-based API service (go-demo-2-api). The database Deployment uses the mongo:3.3 image and ensures high availability with labels for organization and a service exposing port 28017. In some cases, the associated Service is defined separately or within the same YAML file. The API Deployment runs three replicas of the vfarcic/go-demo-2 container, uses a RollingUpdate strategy for zero-downtime updates, and includes readiness and liveness probes on /demo/hello. It is configured with environment variables to connect to the database and includes rollout settings for stability and rollback. Like the database, the API Deployment and its Service may also be defined either separately or within a unified manifest.
5. **Ingress Controllers**: The provided configurations set up both the NGINX Ingress Controller and a specific Ingress rule for routing traffic. The Ingress Controller setup includes all required Kubernetes resources—such as service accounts, RBAC roles, Deployments, Services, and TLS jobs—to run a secure, production-ready ingress layer in the ingress-nginx namespace. It exposes traffic via a LoadBalancer and manages internal admission webhook communication. Separately, the Ingress rule configures HTTP routing for external requests to the /demo path, directing them to the go-demo-2-api service on port 8080 using the NGINX Ingress Controller, while disabling HTTPS redirection. Together, these manifests enable controlled, external access to services inside the cluster.
6. **Volumes**: These Kubernetes manifests define a complete Prometheus deployment that is exposed externally via NGINX Ingress. They configure an Ingress resource to route HTTP traffic from the /prometheus path to a Prometheus service on port 9090, with HTTPS redirection turned off. The Service targets pods labeled with type: monitor and service: prometheus, while the Deployment runs a single prom/prometheus:v2.0.0 container using custom command-line arguments for configuration, storage, and external URL. The Deployment uses a Recreate strategy and aligns labels for proper service targeting. Altogether, this setup provides a web-accessible Prometheus monitoring interface through the /prometheus route.
7. **Configmaps**: These Kubernetes configurations demonstrate various ways to use Alpine-based Pods and ConfigMaps to manage configuration data. They include examples of lightweight Pods running a sleep command for testing, with configuration files mounted into the container via a volume from a ConfigMap. Other setups inject ConfigMap key-value pairs directly as environment variables, either individually or as a whole, supporting clean and dynamic configuration management. Additionally, one configuration shows how Prometheus can load its settings from a ConfigMap mounted into the container, enabling a version-controlled and decoupled approach to managing monitoring configurations. Overall, these manifests illustrate flexible and maintainable patterns for injecting runtime configuration into containers.
8. **Secrets**: This Kubernetes configuration sets up a Jenkins deployment using three core resources: a Deployment that runs the Jenkins container with custom settings and credentials sourced from a Secret, a Service that exposes Jenkins internally on port 8080 by targeting labeled pods, and an Ingress that allows external access via the /jenkins path using the NGINX Ingress Controller, with SSL redirection disabled. Together, these resources enable a secure, customizable, and accessible Jenkins setup within the cluster.

Each module includes:

- **Detailed explanations** of concepts and configurations.
- **Hands-on exercises** to reinforce learning.
- **Sample manifests** and scripts for practical implementation.

## 🧩 Design Patterns Implemented

This guide emphasizes the following Kubernetes design patterns:

- **Declarative Configuration**: Using YAML manifests to define the desired state of resources.
- **Infrastructure as Code (IaC)**: Managing infrastructure through code to ensure consistency and repeatability.
- **Separation of Concerns**: Organizing resources into namespaces and using ConfigMaps and Secrets for configuration management.

## 🛠️ Getting Started

To get started with the guide:

1. Clone the repository:

   ```bash
   git clone https://github.com/mateovelilla/practical-guide-to-kubernetes.git
   cd practical-guide-to-kubernetes
   ```
2. Install dependencies:
    ```bash
        pnpm install
    ```
3. run:
    ```bash
    pnpm start
    ```
------------
Dependencies:
- NodeJs: 23
- k3d version v5.8.3
- k3s version v1.31.5-k3s1 (default)
- kubectl:
    - Client Version: v1.32.0
    - Kustomize Version: v5.5.0
    - Server Version: v1.31.5+k3s1
