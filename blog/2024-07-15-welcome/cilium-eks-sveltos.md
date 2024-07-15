---
slug: cilium-eks-sveltos
title: Cilium on EKS with Sveltos
authors: [egrosdou01]
date: 2024-07-15
tags: [cilium,open-source,kubernetes,gitops,devops]
---

## Introduction

In today's blog post, we will demonstrate an easy way of deploying and controlling [Cilium](https://docs.cilium.io/en/v1.14/) on an [EKS](https://aws.amazon.com/eks/) cluster with [Sveltos](https://github.com/projectsveltos). As the majority of the documentation out there provides a step-by-step installation directly with the Helm chart commands, we decided to demonstrate a different approach, the GitOps approach, with the use of [Sveltos ClusterProfile](https://projectsveltos.github.io/sveltos/addons/addons/) CRD (Custom Resource Definition).

We will utilise the Terraform [AWS EKS module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest) to create an EKS cluster. Once the cluster is up and running, we will register it with Sveltos. Then, we will update the [`aws-core` daemonset](https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html) to support  ENI mode and remove the `kube-proxy` Kubernetes resources as Cilium will take over.

## Diagram

![Cilium, Sveltos, EKS](./cilium_sveltos_eks.jpg)

## Lab Setup

```bash
+-----------------+-------------------+--------------------------+
|   Cluster Name  |        Type       |         Version          |
+-----------------+-------------------+--------------------------+
|   mgmt          | Management Cluster| RKE2 v1.28.9+rke2r1      |
| eks-test01      | Managed Cluster   | EKS v1.28.10-eks-49c6de4 |
+-----------------+-------------------+--------------------------+

+-------------+----------+
|  Deployment | Version  |
+-------------+----------+
|    Cilium   | v1.14.8  |
|  sveltosctl | v0.27.0  |
+-------------+----------+
```

## Prerequisites

To follow along with the blog post, ensure the below are satisfied.

1. AWS Service Account
1. AWS CLI installed
1. Terraform installed
1. kubectl installed
1. sveltosctl installed

## Step 1: Create EKS Cluster with Terraform

The easiest way to spin up an EKS cluster is by following the recommended training and resources from the Hashicorp website. Find the training material and the Git repository further below.

- Training: https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks

- GitHub Repository: https://github.com/hashicorp/learn-terraform-provision-eks-cluster

To execute the Terraform plan, a valid AWS Service Account should be available with the right permissions to create the required resources. For more information about the AWS Service Accounts, have a look here.
To get the cluster kubeconfig and start interacting with the cluster, the AWS CLI is used. Modify and execute the command below.

```bash
$ aws eks update-kubeconfig --region <the region the cluster created> --name <the name of the cluster>
```

:::tip
The command will save the kubeconfig in the default directory `~/.kube/config`. If the file should be stored elsewhere, pass the argument `--kubeconfig` and specify the output directory. For more details, check out the [link](https://docs.aws.amazon.com/cli/latest/reference/eks/update-kubeconfig.html).
:::

## Step 2: Register Cluster with Sveltos

Once we have access to the cluster, it is time to proceed with the Sveltos registration. As this is a cloud cluster, we need to ensure Sveltos has the right permissions to perform the Kubernetes deployments and add-ons. To do that, we will utilise `sveltosctl` and generate a new kubeconfig file.

### Generate Sveltos kubeconfig

```bash
$ export KUBECONFIG=<directory of the EKS kubeconfig file>

$ sveltosctl generate kubeconfig --create --expirationSeconds=86400
```

The `sveltosctl` command will create a kubeconfig file. The file will be used for the Sveltos cluster registration.

### Register EKS Cluster

```bash
$ sveltosctl register cluster --namespace=<namespace> --cluster=<cluster name> \
    --kubeconfig=<path to Sveltos file with Kubeconfig> \
    --labels=env=test
```