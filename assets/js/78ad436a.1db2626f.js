"use strict";(self.webpackChunkpersonal_blog=self.webpackChunkpersonal_blog||[]).push([[977],{936:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"cilium-cluster-mesh-rke2","metadata":{"permalink":"/personal-blog/blog/cilium-cluster-mesh-rke2","source":"@site/blog/2024-07-18-rke2-cilium/cilium-cluster-mesh-rke2.md","title":"Cilium Cluster Mesh on RKE2","description":"Introduction","date":"2024-07-18T00:00:00.000Z","tags":[{"inline":false,"label":"Cilium","permalink":"/personal-blog/blog/tags/cilium","description":"eBPF-based Networking, Security, and Observability for Kubernetes"},{"inline":false,"label":"RKE2","permalink":"/personal-blog/blog/tags/rke2","description":"Rancher Kubernetes Engine 2"},{"inline":false,"label":"Open Source","permalink":"/personal-blog/blog/tags/open-source","description":"Open source software"},{"inline":false,"label":"Kubernetes","permalink":"/personal-blog/blog/tags/kubernetes","description":"Container orchestration platform for automating application deployment, scaling, and management"},{"inline":false,"label":"GitOps","permalink":"/personal-blog/blog/tags/gitops","description":"Operational framework that uses Git as a single source of truth for declarative infrastructure and applications"},{"inline":false,"label":"DevOps","permalink":"/personal-blog/blog/tags/devops","description":"Set of practices that combines software development and IT operations"}],"readingTime":10.2,"hasTruncateMarker":true,"authors":[{"name":"Eleni Grosdouli","title":"DevOps Consulting Engineer at Cisco Systems","url":"https://github.com/egrosdou01","imageURL":"https://github.com/egrosdou01.png","key":"egrosdou01"}],"frontMatter":{"slug":"cilium-cluster-mesh-rke2","title":"Cilium Cluster Mesh on RKE2","authors":["egrosdou01"],"date":"2024-07-18T00:00:00.000Z","tags":["cilium","rke2","open-source","kubernetes","gitops","devops"]},"unlisted":false,"nextItem":{"title":"Cilium on EKS with Sveltos","permalink":"/personal-blog/blog/cilium-eks-sveltos"}},"content":"## Introduction\\n\\nAfter spending some time working with the on-prem [RKE2](https://docs.rke2.io/) lab setup, I came to notice a couple of issues while forming in an automated fashion the [Cilium cluster mesh](https://docs.cilium.io/en/stable/network/clustermesh/clustermesh/) between on-prem clusters.\\n\\nIn today\'s post, we will go through the step-by-step process of forming a **Cilium Cluster Mesh** and explain any issues that might have arisen by following the **GitOps** approach. The cilium CLI will not be required. The deployment will be performed primarily via `Helm` and `kubectl`.\\n\x3c!--truncate--\x3e\\n\\nAdditionally, we will use the [shared CA](https://docs.cilium.io/en/v1.15/network/clustermesh/clustermesh/#shared-certificate-authority) (Certificate Authority) approach as this is a convenient way to form a cluster mesh in an automated fashion and also the best practise for the Hubble Relay setup. The approach will enable **mTLS** across clusters.\\n\\n## Lab Setup\\n\\n```bash\\n+-----------------+----------------------+----------------------+\\n|   Cluster Name  |        Type          |       Version        |\\n+-----------------+----------------------+----------------------+\\n|   mesh01        | RKE2 managed cluster | RKE2 v1.27.14+rke2r1 |\\n|   mesh02        | RKE2 managed cluster | RKE2 v1.27.14+rke2r1 |\\n+-----------------+----------------------+----------------------+\\n\\n+-------------------+----------+\\n|    Deployment     | Version  |\\n+-------------------+----------+\\n| Rancher2 Provider |  4.2.0   |\\n|     Cilium        | 1.15.500 |\\n+-------------------+----------+\\n```\\n\\n## Prerequisites\\n\\n### Infrastructure\\n\\nFor this demonstration, we assume readers have at least two RKE2 clusters up and running. In our case, to create an RKE2 cluster on-prem we used the [Rancher2](https://registry.terraform.io/providers/rancher/rancher2/latest/docs) Terraform provider. The provider allows users to create different resources across different platforms alongside defining information for the RKE2 deployment like IP Address handling, and CNI (Container Network Interface) custom configuration.\\n\\n### Cilium Cluster Mesh\\n\\n- The **Cluster Name** and the **Cluster ID** must be unique.\\n- The **Pods** and the **Services CIDR** ranges must be unique across all the Kubernetes Clusters. The pods need to communicate over a unique IP address. See the IP address schema table above.\\n- Node CIDRs must be unique. The Nodes to have IP connectivity.\\n- The Cilium pods must connect to the `ClusterMesh API Server` service exposed on every Kubernetes cluster.\\n\\n### Resources\\n\\nEnsure the below are satisfied.\\n\\n1. Helm CLI installed\\n1. kubectl installed\\n\\n## Step 0: RKE2 Terraform Provider\\n\\nThe below snippet is an example configuration on how to deploy an RKE2 cluster via the **Rancher2** Provider.\\n\\n```terraform\\n  # RKE2 configuration\\n  resource \\"rancher2_cluster_v2\\" \\"rke2\\" {\\n    # Define basic cluster details like labels and annotations\\n    annotations           = var.rancher_env.cluster_annotations\\n    kubernetes_version    = var.rancher_env.rke2_version\\n    labels                = var.rancher_env.cluster_labels\\n    enable_network_policy = var.rancher_env.network_policy # Option to enable or disable Project Network Isolation.\\n    name                  = var.rancher_env.cluster_id\\n      \\n      # Define the Cilium Configuration for the cluster\\n      chart_values = <<-EOF\\n        rke2-cilium:\\n          k8sServiceHost: 127.0.0.1\\n          k8sServicePort: 6443\\n          kubeProxyReplacement: true # Prepare the deployment for kube-proxy replacement\\n          operator:\\n            replicas: 1\\n          hubble: # Enable Hubble for observability \\n            enabled: true\\n            peerService:\\n              clusterDomain: cluster.local\\n            relay:\\n              enabled: true\\n            tls:\\n              auto:\\n                certValidityDuration: 1095\\n                enabled: true\\n                method: helm\\n            ui:\\n              enabled: true\\n        EOF\\n      \\n      # Apply machine global settings for the clusters\\n      machine_global_config = <<EOF\\n        cni: \\"cilium\\" # Enable Cilium CNI for every cluster\\n        cluster-cidr: ${var.rke_cluster_cidr}\\n        service-cidr: ${var.rke_service_cidr}\\n        disable-kube-proxy: true # Disable kube-proxy\\n        etcd-expose-metrics: false # Do not expose the etcd metrics\\n        EOF\\n      \\n      # Start building the controller and workder nodes dynamically\\n      dynamic \\"machine_pools\\" {\\n        for_each = var.node\\n        content {\\n          cloud_credential_secret_name = data.rancher2_cloud_credential.auth.id\\n          control_plane_role           = machine_pools.key == \\"ctl_plane\\" ? true : false\\n          etcd_role                    = machine_pools.key == \\"ctl_plane\\" ? true : false\\n          name                         = machine_pools.value.name\\n          quantity                     = machine_pools.value.quantity\\n          worker_role                  = machine_pools.key != \\"ctl_plane\\" ? true : false\\n\\n          machine_config {\\n            kind = rancher2_machine_config_v2.nodes[machine_pools.key].kind\\n            name = replace(rancher2_machine_config_v2.nodes[machine_pools.key].name, \\"_\\", \\"-\\")\\n          }\\n        }\\n      }\\n      machine_selector_config {\\n        config = null\\n      }\\n    }\\n  }\\n\\n```\\nAs the focus here is more on the **Cilium Cluster Mesh** setup, we will not go into much detail about the Terraform RKE2 deployment. If there is demand for an in-depth blog post about Terraform RKE2 deployments, feel free to get in touch.\\n\\n## Step 1: Export kubeconfig\\nEither from the Terraform execution plan or via the Rancher UI, collect the kubeconfig of the RKE2 clusters. Alternatively, we can `SSH` into one of the RKE2 master nodes and collect the `kubeconfig` found in the directory `/etc/rancher/rke2/rke2.yaml`.\\n\\n```bash\\n$ export KUBECONFIG=<directory of kubeconfig>\\n$ kubectl nodes\\n```\\n\\n## Step 2: Helm list and values export\\nRKE2 comes with its own Cilium CNI Helm chart. That means RKE2 clusters will have an RKE2 Cilium Helm chart deployment in the `kube-system` namespace.\\n\\n### Validate\\n\\n```bash\\n$ export KUBECONFIG=<directory of kubeconfig>\\n$ helm list -n kube-system\\n\\nNAME                            \\tNAMESPACE  \\tREVISION\\tUPDATED                                \\tSTATUS  \\tCHART                                       \\tAPP VERSION\\nrke2-cilium                     \\tkube-system\\t1       \\t2024-07-13 09:32:09.981662 +0200 CEST  \\tdeployed\\trke2-cilium-1.15.500                        \\t1.15.5     \\nrke2-coredns                    \\tkube-system\\t1       \\t2024-07-13 07:05:49.846980773 +0000 UTC\\tdeployed\\trke2-coredns-1.29.002                       \\t1.11.1     \\nrke2-ingress-nginx              \\tkube-system\\t1       \\t2024-07-13 07:06:24.63272854 +0000 UTC \\tdeployed\\trke2-ingress-nginx-4.8.200                  \\t1.9.3      \\nrke2-metrics-server             \\tkube-system\\t1       \\t2024-07-13 07:06:24.86243331 +0000 UTC \\tdeployed\\trke2-metrics-server-2.11.100-build2023051513\\t0.6.3      \\nrke2-snapshot-controller        \\tkube-system\\t1       \\t2024-07-13 07:06:26.764326178 +0000 UTC\\tdeployed\\trke2-snapshot-controller-1.7.202            \\tv6.2.1     \\nrke2-snapshot-controller-crd    \\tkube-system\\t1       \\t2024-07-13 07:06:24.217899546 +0000 UTC\\tdeployed\\trke2-snapshot-controller-crd-1.7.202        \\tv6.2.1     \\nrke2-snapshot-validation-webhook\\tkube-system\\t1       \\t2024-07-13 07:06:24.544748567 +0000 UTC\\tdeployed\\trke2-snapshot-validation-webhook-1.7.302    \\tv6.2.2 \\n```\\n\\n### Collect rke2-cilium Helm Values\\n\\n**mesh01**\\n```bash\\n$ helm get values rke2-cilium -n kube-system -o yaml > values_mesh01.yaml\\n```\\n\\n**mesh02**\\n```bash\\n$ helm get values rke2-cilium -n kube-system -o yaml > values_mesh02.yaml\\n```\\n\\n**Example values_mesh01.yaml**\\n\\n```yaml\\nglobal:\\n  cattle:\\n    clusterId: c-m-8ffz659l\\n  clusterCIDR: 10.244.0.0/16\\n  clusterCIDRv4: 10.244.0.0/16\\n  clusterDNS: 10.96.0.10\\n  clusterDomain: cluster.local\\n  rke2DataDir: /var/lib/rancher/rke2\\n  serviceCIDR: 10.96.0.0/18\\nhubble:\\n  enabled: true\\n  peerService:\\n    clusterDomain: cluster.local\\n  relay:\\n    enabled: true\\n  tls:\\n    auto:\\n      certValidityDuration: 1095\\n      enabled: true\\n      method: helm\\n  ui:\\n    enabled: true\\nk8sServiceHost: 127.0.0.1\\nk8sServicePort: 6443\\nkubeProxyReplacement: true\\noperator:\\n  replicas: 1\\n```\\n\\n:::note\\nThe configuration comes from the `machine_global_config` and `chart_values` sections defined in the Terraform code found in [Step 0](#step-0-rke2-terraform-provider).\\n:::\\n\\n## Step 3: Cilium Cluster Mesh Helm Values\\n\\nTo set up the Cilium cluster mesh, we need to include the `rke2-charts` repo and later on, update the Helm values with the required cluster mesh settings. For this demonstration, we will use the `NodePort` deployment. For production environments, a `LoadBalancer` deployment is recommended as we do not have to rely on Node availability.\\n\\n### Add rke2-charts Repo\\n\\nThe action should be performed in both clusters.\\n\\n```bash\\n$ helm repo add rke2-charts https://rke2-charts.rancher.io/\\n$ helm repo update\\n```\\n\\n### Update mesh01 Helm Values\\n\\nOn the same level as global, add the below configuration.\\n\\n```yaml\\ntls:\\n  ca:\\n    cert: \\"\\" # Base64 encoded shared CA crt\\n    key: \\"\\" # Base64 encoded shared CA key\\ncluster:\\n  name: mesh01 # The unique name of the cluster\\n  id: 1 # The unique ID of the cluster used for the cluster mesh formation\\nclustermesh:\\n  apiserver:\\n    replicas: 2\\n    service:\\n      type: NodePort # Set the Clustermesh API service to be of type NodePort. Not recommended for Production environments\\n      nodePort: 32379 # Define the listening port for the Clustermesh API service\\n    tls:\\n      authMode: cluster\\n      server:\\n        extraDnsNames:\\n          - \\"mesh01.mesh.cilium.io\\" # Define the extra DNS\\n  config:\\n    clusters:\\n    - address: \\"\\"\\n      ips:\\n      - <Node IP> # The Node IP of the mesh02 cluster\\n      name: mesh02\\n      port: 32380 # The NodePort defined on mesh02 for the Clustermesh API service\\n    enabled: true\\n    domain: \\"mesh.cilium.io\\" # Define the default domain for the mesh\\n  useAPIServer: true # Enable the Clustermesh API deployment\\n```\\n\\n### Update mesh02 Helm Values\\n\\nOn the same level as global, add the below configuration.\\n\\n```yaml\\ntls:\\n  ca:\\n    cert: \\"\\" # Base64 encoded shared CA crt\\n    key: \\"\\" # Base64 encoded shared CA key\\ncluster:\\n  name: mesh02 # The unique name of the cluster\\n  id: 2 # The unique ID of the cluster used for the cluster mesh formation\\nclustermesh:\\n  apiserver:\\n    replicas: 2\\n    service:\\n      type: NodePort # Set the Clustermesh API service to be of type NodePort. Not recommended for production environments\\n      nodePort: 32380 # Define the listening port for the Clustermesh API service\\n    tls:\\n      authMode: cluster\\n      server:\\n        extraDnsNames:\\n          - \\"mesh02.mesh.cilium.io\\" # Define the extra DNS\\n  config:\\n    clusters:\\n    - address: \\"\\"\\n      ips:\\n      - <Node IP> # The Node IP of the mesg01 cluster\\n      name: mesh01 # Define the name of the cluster\\n      port: 32379 # The NodePort defined on mesh02 for the Clustermesh API service\\n    enabled: true\\n    domain: \\"mesh.cilium.io\\" # Define the default domain for the mesh\\n  useAPIServer: true # Enable the Clustermesh API deployment\\n```\\n\\n### Update mesh01/mesh02 Helm deployment\\n\\nTo ensure the updated Helm values are applied, we will use the HELM CLI to update the `rke2-cilium` deployment.\\n\\n```bash\\n$ helm upgrade rke2-cilium rke2-charts/rke2-cilium --version 1.15.500 --namespace kube-system -f values_mesh01.yaml\\n\\n$ helm list -n kube-system\\n```\\n\\nPerform the commands for the `mesh02` cluster.\\n\\n:::tip\\nThe `helm upgrade` command will create a new revision of the `rke2-cilium` application and show if the update was successful or not. Additionally, the cilium daemonset will get restarted and the Clustermesh API deployment will get created. Execute the commands below to double-check the update action.\\n\\n```bash\\n$ kubectl rollout status daemonset cilium -n kube-system\\n\\n$ kubectl get pods,svc -n kube-system | grep -i clustermesh\\n```\\n:::\\n\\n\\n## Step 4: Validate Cilium Cluster Mesh\\n\\nAs we do not use the Cilium CLI, to ensure the Cilium cluster mesh works as expected, we will exec into the cilium daemonset and check the required details.\\n\\n```bash\\n$ kubectl get ds -n kube-system | grep -i cilium\\ncilium                          4         4         4       4            4           kubernetes.io/os=linux   7d6h\\n```\\n\\n### On mesh01 and mesh02\\n\\n```bash\\n$ kubectl exec -it ds/cilium -n kube-system -- cilium status | grep -i clustermesh\\n\\nDefaulted container \\"cilium-agent\\" out of: cilium-agent, install-portmap-cni-plugin (init), config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)\\nClusterMesh:             1/1 clusters ready, 11 global-services\\n```\\n\\nOn both sides, the `ClusterMesh` should point to `1/1 clusters ready`.\\n\\n```bash\\n$ kubectl exec -it ds/cilium -n kube-system -- cilium-health status               \\nDefaulted container \\"cilium-agent\\" out of: cilium-agent, install-portmap-cni-plugin (init), config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)\\nProbe time:   2024-07-20T13:58:47Z\\nNodes:\\n  mesh01/mesh01-controller-3d16581b-7q5bj (localhost):\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=693.829\xb5s\\n      HTTP to agent:   OK, RTT=118.583\xb5s\\n    Endpoint connectivity to 10.244.1.71:\\n      ICMP to stack:   OK, RTT=688.411\xb5s\\n      HTTP to agent:   OK, RTT=251.927\xb5s\\n  mesh01/mesh01-controller-3d16581b-v58rq:\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=671.007\xb5s\\n      HTTP to agent:   OK, RTT=237.395\xb5s\\n    Endpoint connectivity to 10.244.0.75:\\n      ICMP to stack:   OK, RTT=702.976\xb5s\\n      HTTP to agent:   OK, RTT=342.115\xb5s\\n  mesh01/mesh01-worker-7ced0c6c-lz9sp:\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=819.21\xb5s\\n      HTTP to agent:   OK, RTT=397.398\xb5s\\n    Endpoint connectivity to 10.244.3.215:\\n      ICMP to stack:   OK, RTT=821.223\xb5s\\n      HTTP to agent:   OK, RTT=465.965\xb5s\\n  mesh01/mesh01-worker-7ced0c6c-w294x:\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=738.787\xb5s\\n      HTTP to agent:   OK, RTT=335.803\xb5s\\n    Endpoint connectivity to 10.244.2.36:\\n      ICMP to stack:   OK, RTT=693.326\xb5s\\n      HTTP to agent:   OK, RTT=426.571\xb5s\\n  mesh02/mesh02-controller-52d8e160-b27rn:\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=683.278\xb5s\\n      HTTP to agent:   OK, RTT=335.076\xb5s\\n    Endpoint connectivity to 10.245.0.106:\\n      ICMP to stack:   OK, RTT=818.386\xb5s\\n      HTTP to agent:   OK, RTT=387.314\xb5s\\n  mesh02/mesh02-controller-52d8e160-q4rvf:\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=683.097\xb5s\\n      HTTP to agent:   OK, RTT=301.448\xb5s\\n    Endpoint connectivity to 10.245.1.75:\\n      ICMP to stack:   OK, RTT=748.101\xb5s\\n      HTTP to agent:   OK, RTT=510.124\xb5s\\n  mesh02/mesh02-worker-a1c14ae0-5l759:\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=631.954\xb5s\\n      HTTP to agent:   OK, RTT=266.391\xb5s\\n    Endpoint connectivity to 10.245.3.232:\\n      ICMP to stack:   OK, RTT=751.853\xb5s\\n      HTTP to agent:   OK, RTT=433.049\xb5s\\n  mesh02/mesh02-worker-a1c14ae0-c7tcb:\\n    Host connectivity to x.x.x.x:\\n      ICMP to stack:   OK, RTT=671.823\xb5s\\n      HTTP to agent:   OK, RTT=365.949\xb5s\\n    Endpoint connectivity to 10.245.2.69:\\n      ICMP to stack:   OK, RTT=690.894\xb5s\\n      HTTP to agent:   OK, RTT=466.73\xb5s\\n```\\n\\n:::note\\nWith the cilium-health status command, you should be able to see all the nodes from both clusters. Check the ICMP and HTTP status. Should be \\"OK\\".\\n\\nAlso, it might take a couple of minutes till the cilium-health status is available.\\n\\nIf the time-out persists, have a look at the firewall rules and whether traffic between the clusters is allowed.\\n:::\\n\\n:::warning\\nThe NodePort IP addresses set for the cluster mesh need to be the IP addresses of the worker node instead of the master node. If they are the master node, the Cilium Cluster Mesh will not get deployed and we will get the below error.\\n```\\nremote-etcd-cluster01                                                             4m25s ago      4s ago       22      failed to detect whether the cluster configuration is required: etcdserver: permission denied \\n```\\n:::\\n\\n## Step 5: Hubble UI\\n\\nTo work with the Hubble UI we can use the `kubectl port-forward` of the Hubble UI service or update the existing `rke2-cilium` deployment on one of the nodes and expose the Hubble UI as a `NodePort` service. Just include the below in the `values_mesh01.yaml` or the `values_mesh02.yaml` file.\\n\\n```yaml\\n  ui:\\n    enabled: true\\n    service:\\n      type: NodePort\\n```\\n\\nFor more information about the RKE2 Cilium Helm Chart values, have a look [here](https://artifacthub.io/packages/helm/rke2-charts/rke2-cilium/1.15.500).\\n\\n\\n## Conclusions\\n\\nThis is it! We performed a Cilium cluster mesh between two on-prem RKE2 clusters in just a few steps! \ud83c\udf89\\n\\nIt\'s a wrap for this post! \ud83c\udf89 Thanks for reading! Stay tuned for more exciting updates!"},{"id":"cilium-eks-sveltos","metadata":{"permalink":"/personal-blog/blog/cilium-eks-sveltos","source":"@site/blog/2024-07-15-welcome/cilium-eks-sveltos.md","title":"Cilium on EKS with Sveltos","description":"Introduction","date":"2024-07-15T00:00:00.000Z","tags":[{"inline":false,"label":"Cilium","permalink":"/personal-blog/blog/tags/cilium","description":"eBPF-based Networking, Security, and Observability for Kubernetes"},{"inline":false,"label":"Open Source","permalink":"/personal-blog/blog/tags/open-source","description":"Open source software"},{"inline":false,"label":"Kubernetes","permalink":"/personal-blog/blog/tags/kubernetes","description":"Container orchestration platform for automating application deployment, scaling, and management"},{"inline":false,"label":"GitOps","permalink":"/personal-blog/blog/tags/gitops","description":"Operational framework that uses Git as a single source of truth for declarative infrastructure and applications"},{"inline":false,"label":"DevOps","permalink":"/personal-blog/blog/tags/devops","description":"Set of practices that combines software development and IT operations"}],"readingTime":8.08,"hasTruncateMarker":true,"authors":[{"name":"Eleni Grosdouli","title":"DevOps Consulting Engineer at Cisco Systems","url":"https://github.com/egrosdou01","imageURL":"https://github.com/egrosdou01.png","key":"egrosdou01"}],"frontMatter":{"slug":"cilium-eks-sveltos","title":"Cilium on EKS with Sveltos","authors":["egrosdou01"],"date":"2024-07-15T00:00:00.000Z","tags":["cilium","open-source","kubernetes","gitops","devops"]},"unlisted":false,"prevItem":{"title":"Cilium Cluster Mesh on RKE2","permalink":"/personal-blog/blog/cilium-cluster-mesh-rke2"},"nextItem":{"title":"Welcome","permalink":"/personal-blog/blog/welcome"}},"content":"## Introduction\\n\\nIn today\'s blog post, we will demonstrate an easy way of deploying and controlling [Cilium](https://docs.cilium.io/en/v1.14/) on an [EKS](https://aws.amazon.com/eks/) cluster with [Sveltos](https://github.com/projectsveltos). \\n\\nAs the majority of the documentation out there provides a step-by-step installation directly with the Helm chart commands, we decided to demonstrate a different approach, the GitOps approach, with the use of [Sveltos ClusterProfile](https://projectsveltos.github.io/sveltos/addons/addons/) CRD (Custom Resource Definition).\\n\\n\x3c!--truncate--\x3e\\n\\nWe will utilise the Terraform [AWS EKS module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest) to create an EKS cluster. Once the cluster is up and running, we will register it with Sveltos. Then, we will update the [`aws-core` daemonset](https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html) to support  ENI mode and remove the `kube-proxy` Kubernetes resources as Cilium will take over.\\n\\n## Diagram\\n\\n![Cilium, Sveltos, EKS](./cilium_sveltos_eks.jpg)\\n\\n## Lab Setup\\n\\n```bash\\n+-----------------+-------------------+--------------------------+\\n|   Cluster Name  |        Type       |         Version          |\\n+-----------------+-------------------+--------------------------+\\n|   mgmt          | Management Cluster| RKE2 v1.28.9+rke2r1      |\\n| eks-test01      | Managed Cluster   | EKS v1.28.10-eks-49c6de4 |\\n+-----------------+-------------------+--------------------------+\\n\\n+-------------+----------+\\n|  Deployment | Version  |\\n+-------------+----------+\\n|    Cilium   | v1.14.8  |\\n|  sveltosctl | v0.27.0  |\\n+-------------+----------+\\n```\\n\\n## Prerequisites\\n\\nTo follow along with the blog post, ensure the below are satisfied.\\n\\n1. AWS Service Account\\n1. AWS CLI installed\\n1. Terraform installed\\n1. kubectl installed\\n1. sveltosctl installed\\n\\n## Step 1: Create EKS Cluster with Terraform\\n\\nThe easiest way to spin up an EKS cluster is by following the recommended training and resources from the Hashicorp website. Find the training material and the Git repository further below.\\n\\n- Training: https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks\\n\\n- GitHub Repository: https://github.com/hashicorp/learn-terraform-provision-eks-cluster\\n\\nTo execute the Terraform plan, a valid `AWS Service Account` should be available with the right permissions to create the required resources. For more information about the AWS Service Accounts, have a look [here](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).\\n\\nTo get the cluster `kubeconfig` and start interacting with the cluster, the **AWS CLI** is used. Modify and execute the command below.\\n\\n```bash\\n$ aws eks update-kubeconfig --region <the region the cluster created> --name <the name of the cluster>\\n```\\n\\n:::tip\\nThe command will save the kubeconfig in the default directory `~/.kube/config`. If the file should be stored elsewhere, pass the argument `--kubeconfig` and specify the output directory. For more details, check out the [link](https://docs.aws.amazon.com/cli/latest/reference/eks/update-kubeconfig.html).\\n:::\\n\\n## Step 2: Register Cluster with\xa0Sveltos\\n\\nOnce we have access to the cluster, it is time to proceed with the Sveltos cluster registration. As this is a cloud Kubernetes cluster, we need to ensure Sveltos has the **right set of permissions** to perform the Kubernetes deployments and add-ons. To do that, we will utilise `sveltosctl` and generate a new kubeconfig file.\\n\\n### Generate Sveltos kubeconfig\\n\\n```bash\\n$ export KUBECONFIG=<directory of the EKS kubeconfig file>\\n\\n$ sveltosctl generate kubeconfig --create --expirationSeconds=86400\\n```\\n\\nThe `sveltosctl` command will create a kubeconfig file. The file will be used for the Sveltos cluster registration.\\n\\n### Register EKS\xa0Cluster\\n\\n```bash\\n$ sveltosctl register cluster --namespace=<namespace> --cluster=<cluster name> \\\\\\n    --kubeconfig=<path to Sveltos file with Kubeconfig> \\\\\\n    --labels=env=test\\n```\\n\\nThe command above will register the EKS cluster with Sveltos on the mentioned **namespace**, and **name** and will attach the cluster **label** `env=test` defined.\\n\\n:::note\\nIf the namespace does not exist in the management cluster, the command will fail with the namespace not found error. Ensure the defined namespace exists in the cluster before registration.\\n:::\\n\\n```bash\\n$ export KUBECONFIG=<Sveltos managament cluster> \\n\\n$ kubectl get sveltosclusters -A --show-labels\\nNAMESPACE        NAME         READY   VERSION                LABELS\\nmgmt             mgmt         true    v1.28.9+rke2r1         sveltos-agent=present\\ntest             eks-test01   true    v1.28.10-eks-49c6de4   env=test,sveltos-agent=present\\n```\\n\\n## Step 3: Update the EKS\xa0cluster\\n\\nAs we would like to use Cilium with the Kube Proxy replacement and the [ENI](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/networking-networkmode-awsvpc.html) mode enabled, we need to perform additional actions. As the `kube-proxy` daemonset is already installed, we have to remove all related resources and update the `aws-node` daemonset to support the ENI mode.\\n\\n### Validation\\n\\n```bash\\n$ kubectl get pods,ds -n kube-system\\nNAME                                      READY   STATUS    RESTARTS   AGE\\npod/aws-node-4x8sq                        2/2     Running   0          16m\\npod/aws-node-vjtlx                        2/2     Running   0          16m\\npod/aws-node-xp7vl                        2/2     Running   0          16m\\npod/coredns-648485486-t5sxm               1/1     Running   0          20m\\npod/coredns-648485486-tv4h5               1/1     Running   0          20m\\npod/ebs-csi-controller-5df9db689f-8hmdm   6/6     Running   0          15m\\npod/ebs-csi-controller-5df9db689f-qmxhs   6/6     Running   0          15m\\npod/ebs-csi-node-2rspx                    3/3     Running   0          15m\\npod/ebs-csi-node-gvtfj                    3/3     Running   0          15m\\npod/ebs-csi-node-t96ch                    3/3     Running   0          15m\\npod/kube-proxy-4jxlt                      1/1     Running   0          16m\\npod/kube-proxy-hgx9h                      1/1     Running   0          16m\\npod/kube-proxy-l877x                      1/1     Running   0          16m\\n\\nNAME                                  DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR              AGE\\ndaemonset.apps/aws-node               3         3         3       3            3           <none>                     20m\\ndaemonset.apps/ebs-csi-node           3         3         3       3            3           kubernetes.io/os=linux     16m\\ndaemonset.apps/ebs-csi-node-windows   0         0         0       0            0           kubernetes.io/os=windows   16m\\ndaemonset.apps/kube-proxy             3         3         3       3            3           <none>                     20m\\n```\\n\\n### Delete kube-proxy Resources\\n\\n```bash\\n$ export KUBECONFIG=<directory of the EKS kubeconfig file>\\n\\n$ kubectl delete ds kube-proxy -n kube-system # Remove the kube-proxy daemonset\\n\\n$ kubectl delete cm kube-proxy -n kube-system # Remove the kube-proxy ConfigMap\\n```\\n\\n### Update aws-node Resources\\n\\n```bash\\n$ kubectl patch daemonset aws-node --type=\'strategic\' -p=\'{\\"spec\\":{\\"template\\":{\\"spec\\":{\\"nodeSelector\\":{\\"io.cilium/aws-node-enabled\\":\\"true\\"}}}}}\' -n kube-system # This is required based on the Cilium documentation to enable the ENI mode\\n```\\n\\n```bash\\n$ kubectl get pods,ds -n kube-system\\nNAME                                      READY   STATUS    RESTARTS   AGE\\npod/coredns-648485486-t5sxm               1/1     Running   0          22m\\npod/coredns-648485486-tv4h5               1/1     Running   0          22m\\npod/ebs-csi-controller-5df9db689f-8hmdm   6/6     Running   0          17m\\npod/ebs-csi-controller-5df9db689f-qmxhs   6/6     Running   0          17m\\npod/ebs-csi-node-2rspx                    3/3     Running   0          17m\\npod/ebs-csi-node-gvtfj                    3/3     Running   0          17m\\npod/ebs-csi-node-t96ch                    3/3     Running   0          17m\\n\\nNAME                                  DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                     AGE\\ndaemonset.apps/aws-node               0         0         0       0            0           io.cilium/aws-node-enabled=true   22m\\ndaemonset.apps/ebs-csi-node           3         3         3       3            3           kubernetes.io/os=linux            17m\\ndaemonset.apps/ebs-csi-node-windows   0         0         0       0            0           kubernetes.io/os=windows          17m\\n```\\n\\n:::tip\\nThe aws-node daemonset scaled down to 0 replicas.\\n:::\\n\\n### Step 4: Create Sveltos ClusterProfile\\n\\nIt is time to create a **Sveltos ClusterProfile** and deploy **Cilium** to the EKS cluster with the label set to `env=test`. Following the Cilium [documentation](https://docs.cilium.io/en/v1.14/installation/k8s-install-helm/), we will enable the required Helm values for the `kube-proxy `replacement and the ENI mode.\\n\\n```yaml\\n---\\napiVersion: config.projectsveltos.io/v1alpha1\\nkind: ClusterProfile\\nmetadata:\\n  name: cilium-1148\\nspec:\\n  clusterSelector: env=test # Deploy Cilium v1.14.8 to any cluster with the cluster label set to env=test\\n  helmCharts:\\n  - chartName: cilium/cilium\\n    chartVersion: 1.14.8\\n    helmChartAction: Install\\n    releaseName: cilium\\n    releaseNamespace: kube-system\\n    repositoryName: cilium\\n    repositoryURL: https://helm.cilium.io/\\n    values: |\\n      eni:\\n        enabled: true\\n      ipam:\\n        mode: eni\\n      egressMasqueradeInterfaces: eth0\\n      routingMode: native\\n      kubeProxyReplacement: true\\n      k8sServiceHost: <The Server API FQDN or IP Address> # The information can be exctracted from the kubeconfig file or the AWS UI\\n      k8sServicePort: <The Server API listening port> # The information can be extracted from the kubeconfig file or the AWS UI\\n      nodePort:\\n        enabled: true\\n      debug:\\n        enabled: true\\n```\\n\\nThe ClusterProfile will deploy Cilium CNI to any cluster with the cluster label set to `env=test`. It will then deploy the Cilium Helm chart in the `kube-system` namespace alongside the kube-proxy replacement and the ENI mode. Hubble is also enabled.\\n\\n## Step 5: Deploy Cilium and\xa0Validate\\n\\nTo see and evaluate the results, the Sveltos ClusterProfile will be deployed to the management cluster.\\n\\n```bash\\n$ export KUBECONFIG=<Sveltos managament cluster>\\n\\n$ kubectl apply -f \\"clusterprofile_cilium1148.yaml\\"\\n```\\n\\n### Validation\\n\\n```bash\\n$ ./sveltosctl show addons\\n+-----------------+---------------+-------------+--------+---------+-------------------------------+----------------------------+\\n|     CLUSTER     | RESOURCE TYPE |  NAMESPACE  |  NAME  | VERSION |             TIME              |          PROFILES          |\\n+-----------------+---------------+-------------+--------+---------+-------------------------------+----------------------------+\\n| test/eks-test01 | helm chart    | kube-system | cilium | 1.14.8  | 2024-06-18 14:39:26 +0000 UTC | ClusterProfile/cilium-1148 |\\n+-----------------+---------------+-------------+--------+---------+-------------------------------+----------------------------+\\n```\\n\\n```bash\\n$ export KUBECONFIG=<directory of the EKS kubeconfig file>\\n\\n$ kubectl get pods -n kube-system | grep -i cilium\\ncilium-2vg4c                          1/1     Running             0          54s\\ncilium-operator-594f4858f6-km2wh      1/1     Running             0          54s\\ncilium-operator-594f4858f6-xx2q6      1/1     Running             0          55s\\ncilium-qrwwf                          1/1     Running             0          55s\\ncilium-s55v5                          1/1     Running             0          54s\\n```\\n\\n```bash\\n$ kubectl exec -it cilium-2vg4c -n kube-system -- cilium status\\nDefaulted container \\"cilium-agent\\" out of: cilium-agent, config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)\\nKVStore:                 Ok   Disabled\\nKubernetes:              Ok   1.28+ (v1.28.10-eks-49c6de4) [linux/amd64]\\nKubernetes APIs:         [\\"EndpointSliceOrEndpoint\\", \\"cilium/v2::CiliumClusterwideNetworkPolicy\\", \\"cilium/v2::CiliumEndpoint\\", \\"cilium/v2::CiliumNetworkPolicy\\", \\"cilium/v2::CiliumNode\\", \\"cilium/v2alpha1::CiliumCIDRGroup\\", \\"core/v1::Namespace\\", \\"core/v1::Pods\\", \\"core/v1::Service\\", \\"networking.k8s.io/v1::NetworkPolicy\\"]\\nKubeProxyReplacement:    True   [eth0 10.0.1.150 (Direct Routing), eth1 10.0.1.37]\\n```\\n\\n### Deploy Nginx Application\\n\\n```bash\\n$ kubectl apply -f \\"nginx.yaml\\"\\n\\n$ kubectl get pods,svc\\nNAME                            READY   STATUS    RESTARTS   AGE\\npod/my-nginx-684dd4dcd4-gl9rm   1/1     Running   0          18s\\npod/my-nginx-684dd4dcd4-nk9mm   1/1     Running   0          18s\\n\\nNAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE\\nservice/kubernetes   ClusterIP   172.20.0.1      <none>        443/TCP        33m\\nservice/my-nginx     NodePort    172.20.80.220   <none>        80:32449/TCP   3s\\n```\\n\\n### Cilium Validation\\n\\n```bash\\n$ kubectl -n kube-system exec ds/cilium -- cilium service list\\nDefaulted container \\"cilium-agent\\" out of: cilium-agent, config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)\\nID   Frontend             Service Type   Backend                         \\n1    172.20.0.1:443       ClusterIP      1 => 10.0.1.15:443 (active)     \\n                                         2 => 10.0.2.226:443 (active)    \\n2    172.20.208.197:443   ClusterIP      1 => 10.0.1.150:4244 (active)   \\n3    172.20.22.66:80      ClusterIP      1 => 10.0.3.36:4245 (active)    \\n4    172.20.141.67:80     ClusterIP      1 => 10.0.2.229:8081 (active)   \\n5    172.20.0.10:53       ClusterIP      1 => 10.0.1.144:53 (active)     \\n                                         2 => 10.0.3.123:53 (active)     \\n6    172.20.80.220:80     ClusterIP      1 => 10.0.1.216:80 (active)     \\n                                         2 => 10.0.3.39:80 (active)      \\n7    10.0.1.150:32449     NodePort       1 => 10.0.1.216:80 (active)     \\n                                         2 => 10.0.3.39:80 (active)      \\n8    10.0.1.37:32449      NodePort       1 => 10.0.1.216:80 (active)     \\n                                         2 => 10.0.3.39:80 (active)      \\n9    0.0.0.0:32449        NodePort       1 => 10.0.1.216:80 (active)     \\n                                         2 => 10.0.3.39:80 (active)\\n```\\n\\nFrom the output above, we can observe that Cilium eBPF kube-proxy replacement created the NodePort service for Nginx.\\n\\nAs the blog post is not intended to outline in depth how the kube-proxy replacement works, check out the [link](https://docs.cilium.io/en/v1.14/network/kubernetes/kubeproxy-free/) for further tests.\\n\\n## Conclusions\\n\\nWe demonstrated an easy way of deploying Cilium CNI to an EKS cluster with the Sveltos ClusterProfile. The complete lifecycle of the CNI is now controlled by Sveltos and without external dependencies.\\n\\nTake advantage of the [Sveltos Templating](https://projectsveltos.github.io/sveltos/template/intro_template/) and the [Sveltos Event Framework](https://projectsveltos.github.io/sveltos/events/addon_event_deployment/) capabilities to make every Kubernetes deployment and add-on easier!\\n\\n## Contact\\n\\nWe are here to help! Whether you have questions, or issues or need assistance, our Slack channel is the perfect place for you. Click here to [join us](https://app.slack.com/client/T0471SNT5CZ/C06UZCXQLGP) us.\\n\\n## \ud83d\udc4f Support this\xa0project\\n\\nEvery contribution counts! If you enjoyed this article, check out the Projectsveltos [GitHub repo](https://github.com/projectsveltos). You can [star \ud83c\udf1f the project](https://github.com/projectsveltos) if you find it helpful.\\n\\nThe GitHub repo is a great resource for getting started with the project. It contains the code, documentation, and many more examples.\\n\\nThanks for reading!"},{"id":"welcome","metadata":{"permalink":"/personal-blog/blog/welcome","source":"@site/blog/2024-07-15-welcome/index.md","title":"Welcome","description":"\ud83c\udf1f Welcome!","date":"2024-07-15T00:00:00.000Z","tags":[{"inline":false,"label":"Hello","permalink":"/personal-blog/blog/tags/hello","description":"Hello tag description"}],"readingTime":0.17,"hasTruncateMarker":false,"authors":[{"name":"Eleni Grosdouli","title":"DevOps Consulting Engineer at Cisco Systems","url":"https://github.com/egrosdou01","imageURL":"https://github.com/egrosdou01.png","key":"egrosdou01"}],"frontMatter":{"slug":"welcome","title":"Welcome","authors":["egrosdou01"],"tags":["hello"]},"unlisted":false,"prevItem":{"title":"Cilium on EKS with Sveltos","permalink":"/personal-blog/blog/cilium-eks-sveltos"}},"content":"## \ud83c\udf1f Welcome!\\n\\nHello and welcome to my blog! \ud83d\ude80\\n\\nHere, you will discover everything you need to know about open source tools, DevOps, and GitOps practices.\\n\\nDive in and let\'s explore together! \ud83d\udca1\ud83d\udd27"}]}}')}}]);