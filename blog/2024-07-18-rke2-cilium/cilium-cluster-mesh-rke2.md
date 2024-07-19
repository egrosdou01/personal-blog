---
slug: cilium-cluster-mesh-rke2
title: Cilium Cluster Mesh on RKE2
authors: [egrosdou01]
date: 2024-07-18
tags: [cilium,rke2,open-source,kubernetes,gitops,devops]
---

## Introduction

After spending some time working with the on-prem [RKE2](https://docs.rke2.io/) lab setup, I came to notice a couple of issues while forming in an automated fashion the [Cilium cluster mesh](https://docs.cilium.io/en/stable/network/clustermesh/clustermesh/) between on-prem clusters.

In today's post, we will go through the step-by-step process of forming a Cilium Cluster Mesh and explain any issues that might have arised by following the **GitOps** approach. The cilium CLI will not be required. The deployment will be perform primarily via `Helm` and `kubectl`.
<!--truncate-->

Additionally, we will use the [shared CA](https://docs.cilium.io/en/v1.15/network/clustermesh/clustermesh/#shared-certificate-authority) (Certificate Authority) approach as this is a convenient way to form a cluster mesh in an automated fashion and also the best practise for the Hubble Relay setup. The approach will enable **mTLS** accross clusters.


## Diagram

<!-- ![Cilium, Sveltos, EKS](./cilium_sveltos_eks.jpg) -->

## Lab Setup

```bash
+-----------------+----------------------+----------------------+
|   Cluster Name  |        Type          |       Version        |
+-----------------+----------------------+----------------------+
|   mesh01        | RKE2 managed cluster | RKE2 v1.27.14+rke2r1 |
|   mesh02        | RKE2 managed cluster | RKE2 v1.27.14+rke2r1 |
+-----------------+----------------------+----------------------+

+-------------------+----------+
|    Deployment     | Version  |
+-------------------+----------+
| Rancher2 Provider | 4.2.0    |
|     Cilium        | 1.15.500 |
+-------------------+----------+
```

## Prerequisites

### Infrastructure

For this demonstration, we assume readers have at least two RKE2 clusters up and running. In our case, to create an RKE2 cluster on-prem we used the [Rancher2](https://registry.terraform.io/providers/rancher/rancher2/latest/docs) Terraform provider. The provider allows users to create different resources across different platform alongside defining information for the RKE2 deployment like IP Address handling, CNI (Container Network Interface) custom configuration etc.

### Cilium Cluster Mesh

- The **Cluster Name** and the **Cluster ID** must be unique.
- The **Pods** and the **Services CIDR** ranges must be unique across all the Kubernetes Clusters. The pods need to communicate over a unique IP address. See the IP address schema table above.
- Node CIDRs must be unique. The Nodes need have IP connectivity.
- The Cilium pods must connect to the `ClusterMesh API Server` service exposed on every Kubernetes cluster.

### Resources

Ensure the below are satisfied.

1. Helm CLI installed
1. kubectl installed

## Step 0: RKE2 Terraform Provider

The below snippet is an example configuration on how to deploy an RKE2 cluster via the **Rancher2** Provider.

```terraform
  # RKE2 configuration
  resource "rancher2_cluster_v2" "rke2" {
    # Define basic cluster details like labels and annotations
    annotations           = var.rancher_env.cluster_annotations
    kubernetes_version    = var.rancher_env.rke2_version
    labels                = var.rancher_env.cluster_labels
    enable_network_policy = var.rancher_env.network_policy # Option to enable or disable Project Network Isolation.
    name                  = var.rancher_env.cluster_id
      
      # Define the Cilium Configuration for the cluster
      chart_values = <<-EOF
        rke2-cilium:
          k8sServiceHost: 127.0.0.1
          k8sServicePort: 6443
          kubeProxyReplacement: true # Prepare the deployment for kube-proxy replacement
          operator:
            replicas: 1
          hubble: # Enable Hubble for observability 
            enabled: true
            peerService:
              clusterDomain: cluster.local
            relay:
              enabled: true
            tls:
              auto:
                certValidityDuration: 1095
                enabled: true
                method: helm
            ui:
              enabled: true
        EOF
      
      # Apply machine global settings for the clusters
      machine_global_config = <<EOF
        cni: "cilium" # Enable Cilium CNI for every cluster
        cluster-cidr: ${var.rke_cluster_cidr}
        service-cidr: ${var.rke_service_cidr}
        disable-kube-proxy: true # Disable kube-proxy
        etcd-expose-metrics: false # Do not expose the etcd metrics
        EOF
      
      # Start building the controller and workder nodes dynamically
      dynamic "machine_pools" {
        for_each = var.node
        content {
          cloud_credential_secret_name = data.rancher2_cloud_credential.auth.id
          control_plane_role           = machine_pools.key == "ctl_plane" ? true : false
          etcd_role                    = machine_pools.key == "ctl_plane" ? true : false
          name                         = machine_pools.value.name
          quantity                     = machine_pools.value.quantity
          worker_role                  = machine_pools.key != "ctl_plane" ? true : false

          machine_config {
            kind = rancher2_machine_config_v2.nodes[machine_pools.key].kind
            name = replace(rancher2_machine_config_v2.nodes[machine_pools.key].name, "_", "-")
          }
        }
      }
      machine_selector_config {
        config = null
      }
    }
  }

```
As the focus here is more about the **Cilium Cluster Mesh** setup, we will not go into much detail about the Terraform RKE2 deployment. If there is demand for an in-depth blog post about Terraform RKE2 deployments, feel fee to get in touch.

## Step 1: Export Kubeconfig
Either from the Terraform execution plan or via the Rancher UI, collect the kubeconfig of the RKE2 clusters we will form the Cilium cluster mesh. Alternatively, we can `SSH` into one of the RKE2 master nodes and collect the `kubeconfig` found in the directory `/ect/rancher/rke2/rke2.yaml`.

```bash
$ export KUBECONFIG=<directory of kubeconfig>
$ kubectl nodes
```

## Step 2: Helm list and values export
RKE2 comes with its own Cilium CNI Helm chart. That means, RKE2 clusters will have an RKE2 Cilium Helm chart deployment in the `kube-system` namespace.

### Validate

```bash
$ export KUBECONFIG=<directory of kubeconfig>
$ helm list -n kube-system

NAME                            	NAMESPACE  	REVISION	UPDATED                                	STATUS  	CHART                                       	APP VERSION
rke2-cilium                     	kube-system	1       	2024-07-13 09:32:09.981662 +0200 CEST  	deployed	rke2-cilium-1.15.500                        	1.15.5     
rke2-coredns                    	kube-system	1       	2024-07-13 07:05:49.846980773 +0000 UTC	deployed	rke2-coredns-1.29.002                       	1.11.1     
rke2-ingress-nginx              	kube-system	1       	2024-07-13 07:06:24.63272854 +0000 UTC 	deployed	rke2-ingress-nginx-4.8.200                  	1.9.3      
rke2-metrics-server             	kube-system	1       	2024-07-13 07:06:24.86243331 +0000 UTC 	deployed	rke2-metrics-server-2.11.100-build2023051513	0.6.3      
rke2-snapshot-controller        	kube-system	1       	2024-07-13 07:06:26.764326178 +0000 UTC	deployed	rke2-snapshot-controller-1.7.202            	v6.2.1     
rke2-snapshot-controller-crd    	kube-system	1       	2024-07-13 07:06:24.217899546 +0000 UTC	deployed	rke2-snapshot-controller-crd-1.7.202        	v6.2.1     
rke2-snapshot-validation-webhook	kube-system	1       	2024-07-13 07:06:24.544748567 +0000 UTC	deployed	rke2-snapshot-validation-webhook-1.7.302    	v6.2.2 
```

### Collect rke2-cilium Helm Values

**mesh01**
```bash
$ helm get values rke2-cilium -n kube-system -o yaml > values_mesh01.yaml
```

**mesh02**
```bash
$ helm get values rke2-cilium -n kube-system -o yaml > values_mesh02.yaml
```

**Example values_mesh01.yaml**

```yaml
global:
  cattle:
    clusterId: c-m-8ffz659l
  clusterCIDR: 10.244.0.0/16
  clusterCIDRv4: 10.244.0.0/16
  clusterDNS: 10.96.0.10
  clusterDomain: cluster.local
  rke2DataDir: /var/lib/rancher/rke2
  serviceCIDR: 10.96.0.0/18
hubble:
  enabled: true
  peerService:
    clusterDomain: cluster.local
  relay:
    enabled: true
  tls:
    auto:
      certValidityDuration: 1095
      enabled: true
      method: helm
  ui:
    enabled: true
k8sServiceHost: 127.0.0.1
k8sServicePort: 6443
kubeProxyReplacement: true
operator:
  replicas: 1
```

:::note
The configuration comes from the `machine_global_config` and `chart_values` sections defined in the Terraform code found in [Step 0](#step-0-rke2-terraform-provider).
:::

## Step 3: Cilium Cluster Mesh Helm Values

To setup the cluster mesh, we will need to include the `rke2-charts` repo and afterwards, update the Helm values with the required cluster mesh settings. For this demonstration, we will use the `NodePort` deployment. In a production environment, a `LoadBalancer` deployment is recommended as we do not have to rely on Node availability.

### Add rke2-charts Repo

The action should be performed in both clusters.

```bash
$ helm repo add rke2-charts https://rke2-charts.rancher.io/
$ helm repo update
```

### Update mesh01 Helm Values

On the same level as global, add the below configuration.

```yaml
tls:
  ca:
    cert: "" # Base64 encoded shared CA crt
    key: "" # Base64 encoded shared CA key
cluster:
  name: mesh01 # The unique name of the cluster
  id: 1 # The unique ID of the cluster used for the cluster mesh formation
clustermesh:
  apiserver:
    replicas: 2
    service:
      type: NodePort # Set the Clustermesh API service to be of type NodePort. Not recommended for Production environments
      nodePort: 32379 # Define the listening port for the Clustermesh API service
    tls:
      authMode: cluster
      server:
        extraDnsNames:
          - "mesh01.mesh.cilium.io" # Define the extra DNS
  config:
    clusters:
    - address: ""
      ips:
      - <Node IP> # The Node IP of the mesh02 cluster
      name: mesh02
      port: 32380 # The NodePort defined on mesh02 for the Clustermesh API service
    enabled: true
    domain: "mesh.cilium.io" # Define the default domain for the mesh
  useAPIServer: true # Enable the Clustermesh API deployment
```

### Update mesh02 Helm Values

On the same level as global, add the below configuration.

```yaml
tls:
  ca:
    cert: "" # Base64 encoded shared CA crt
    key: "" # Base64 encoded shared CA key
cluster:
  name: mesh02 # The unique name of the cluster
  id: 2 # The unique ID of the cluster used for the cluster mesh formation
clustermesh:
  apiserver:
    replicas: 2
    service:
      type: NodePort # Set the Clustermesh API service to be of type NodePort. Not recommended for production environments
      nodePort: 32380 # Define the listening port for the Clustermesh API service
    tls:
      authMode: cluster
      server:
        extraDnsNames:
          - "mesh02.mesh.cilium.io" # Define the extra DNS
  config:
    clusters:
    - address: ""
      ips:
      - <Node IP> # The Node IP of the mesg01 cluster
      name: mesh01 # Define the name of the cluster
      port: 32379 # The NodePort defined on mesh02 for the Clustermesh API service
    enabled: true
    domain: "mesh.cilium.io" # Define the default domain for the mesh
  useAPIServer: true # Enable the Clustermesh API deployment
```

### Update mesh01/mesh02 Helm deployment

To ensure the updated Helm values are applied, we will use the HELM cli to update the `rke2-cilium` deployment.

```bash
$ helm upgrade rke2-cilium rke2-charts/rke2-cilium --version 1.15.500 --namespace kube-system -f values_mesh01.yaml

$ helm list -n kube-system
```

Perform the commands above for the `mesh02` cluster.

:::tip
The `helm upgrade` command will create a new revision of the `rke2-cilium` application and show if the update was successful or not. Additionally, the cilium daemonset will get restarted and the Clustermesh API deployment will get created. Execute the commands below to double-check the update action.

```bash
$ kubectl rollout status daemonset cilium -n kube-system

$ kubectl get pods,svc -n kube-system | grep -i clustermesh
```
:::


## Step 4: Validate Cilium Cluster Mesh

As we will not use the cilium CLI to ensure the Cilium cluster mesh setup works as expected, we will exec into the cilium agent pods and check the required details.


## Conclusions

That’s it! We have performed a Cilium cluster mesh between two on-prem RKE2 cluster in just a few steps!

That’s a wrap for this post! 🎉 Thanks for reading! Stay tuned for more exciting updates!