---
slug: cilium-cluster-mesh-rke2
title: Cilium Cluster Mesh on RKE2
authors: [egrosdou01]
date: 2024-07-18
tags: [cilium,rke2,open-source,kubernetes,gitops,devops]
---

## Introduction

After spending some time working with the on-prem [RKE2](https://docs.rke2.io/) lab setup, I came to notice a couple of issues while forming in an automated fashion the [Cilium cluster mesh](https://docs.cilium.io/en/stable/network/clustermesh/clustermesh/) between on-prem clusters.

In today's post, we will go through the step-by-step process of forming a Cilium Cluster Mesh and explain any issues that might have arised by following the GitOps approach.
<!--truncate-->

Additionally, we will use the [shared CA](https://docs.cilium.io/en/v1.15/network/clustermesh/clustermesh/#shared-certificate-authority) (Certificate Authority) approach as this is a convenient wayt to form a cluster mesh in an automated fashion and also the best practise for the Hubble Relay setup. The approach will enable **mTLS** accross clusters.


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
|     Cilium        | v1.15.5  |
+-------------------+----------+
```

## Prerequisites

For this demonstration, we assume readers have at least two RKE2 clusters up and running. In our case, to create an RKE2 cluster on-prem we used the [Rancher2](https://registry.terraform.io/providers/rancher/rancher2/latest/docs) Terraform provider. The provider allows users to create different resources across different platform alongside defining information for the RKE2 deployment like IP Address handling, CNI (Container Network Interface) custom configuration etc.

Additionally, ensure the below are satisfied.

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

As we the focus here is more about the **Cilium Cluster Mesh** setup, we will not go into much detail about the Terraform RKE2 deployment. If there is demand for an in-depth dlog post about Terraform RKE2 deployments, feel fee to get in touch.

## Step 1: Export Kubeconfig
Either from the Terraform execution plan or the Rancher UI, collect the kubeconfig of the clusters we will form the Cilium cluster mesh.
