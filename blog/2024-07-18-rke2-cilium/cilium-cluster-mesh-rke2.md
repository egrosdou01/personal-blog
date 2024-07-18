---
slug: cilium-cluster-mesh-rke2
title: Cilium Cluster Mesh on RKE2
authors: [egrosdou01]
date: 2024-07-18
tags: [cilium,rke2,open-source,kubernetes,gitops,devops]
---

## Introduction

After spending some time working with the [RKE2](https://docs.rke2.io/) lab update, I came to notice a couple of issues setting up in an automated fashion a [Cilium cluster mesh](https://docs.cilium.io/en/stable/network/clustermesh/clustermesh/) between different on-prem clusters. In today's post, we will go through the process step-by-step and explain any issues appeared throught the process.

<!--truncate-->

## Diagram

<!-- ![Cilium, Sveltos, EKS](./cilium_sveltos_eks.jpg) -->

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
