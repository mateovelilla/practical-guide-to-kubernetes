# Practical Guide to Kubernetes

## 🚀 Overview

This repository offers a hands-on approach to mastering Kubernetes, focusing on real-world scenarios and best practices. It's designed for developers, DevOps engineers, and Kubernetes enthusiasts aiming to deepen their understanding through practical exercises and structured learning modules.

## 🧰 Technologies & Tools

- **Kubernetes**: Orchestration platform for automating deployment, scaling, and management of containerized applications.
- **K3s**: Lightweight Kubernetes distribution optimized for ARM and IoT devices.
- **K3d**: Tool to run K3s clusters in Docker containers, facilitating local development and testing.
- **Node.js**: JavaScript runtime for building scalable network applications.
- **TypeScript**: Superset of JavaScript that adds static typing, enhancing development efficiency and code quality.
- **pnpm**: Fast, disk space-efficient package manager for JavaScript.
- **Docker**: Platform for developing, shipping, and running applications in containers.

## 📚 Learning Modules

The guide is organized into the following modules:

1. **Namespaces**: Understanding Kubernetes namespaces for organizing resources.
2. **ConfigMaps**: Managing configuration data in a Kubernetes-native way.
3. **Secrets**: Securely storing and managing sensitive information.
4. **Managing Resources**: Best practices for resource allocation and limits.
5. **Securing the Cluster**: Implementing security measures to protect your Kubernetes environment.
6. **Deploying Applications**: Step-by-step instructions for deploying applications in a Kubernetes cluster.

Each module includes:

- **Detailed explanations** of concepts and configurations.
- **Hands-on exercises** to reinforce learning.
- **Sample manifests** and scripts for practical implementation.

## 🧩 Design Patterns Implemented

This guide emphasizes the following Kubernetes design patterns:

- **Declarative Configuration**: Using YAML manifests to define the desired state of resources.
- **Infrastructure as Code (IaC)**: Managing infrastructure through code to ensure consistency and repeatability.
- **Separation of Concerns**: Organizing resources into namespaces and using ConfigMaps and Secrets for configuration management.
- **Security Best Practices**: Implementing RBAC, Network Policies, and Pod Security Policies to secure the cluster.
- **CI/CD Integration**: Incorporating continuous integration and deployment pipelines for automated application delivery.

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
### TODO
- Test all modules a create diagrams and scripts to generate labs automatically
- Refactored script and test the module securing-cluster/first-secure-feature
------------
Dependencies:
- NodeJs: 23
- k3d version v5.8.3
- k3s version v1.31.5-k3s1 (default)
- kubectl:
    - Client Version: v1.32.0
    - Kustomize Version: v5.5.0
    - Server Version: v1.31.5+k3s1