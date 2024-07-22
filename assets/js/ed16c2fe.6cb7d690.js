"use strict";(self.webpackChunkpersonal_blog=self.webpackChunkpersonal_blog||[]).push([[197],{3203:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var s=t(4848),i=t(8453);const o={slug:"cilium-eks-sveltos",title:"Cilium on EKS with Sveltos",authors:["egrosdou01"],date:new Date("2024-07-15T00:00:00.000Z"),tags:["cilium","open-source","kubernetes","gitops","devops"]},l=void 0,r={permalink:"/personal-blog/blog/cilium-eks-sveltos",source:"@site/blog/2024-07-15-welcome/cilium-eks-sveltos.md",title:"Cilium on EKS with Sveltos",description:"Introduction",date:"2024-07-15T00:00:00.000Z",tags:[{inline:!1,label:"Cilium",permalink:"/personal-blog/blog/tags/cilium",description:"eBPF-based Networking, Security, and Observability for Kubernetes"},{inline:!1,label:"Open Source",permalink:"/personal-blog/blog/tags/open-source",description:"Open source software"},{inline:!1,label:"Kubernetes",permalink:"/personal-blog/blog/tags/kubernetes",description:"Container orchestration platform for automating application deployment, scaling, and management"},{inline:!1,label:"GitOps",permalink:"/personal-blog/blog/tags/gitops",description:"Operational framework that uses Git as a single source of truth for declarative infrastructure and applications"},{inline:!1,label:"DevOps",permalink:"/personal-blog/blog/tags/devops",description:"Set of practices that combines software development and IT operations"}],readingTime:8.08,hasTruncateMarker:!0,authors:[{name:"Eleni Grosdouli",title:"DevOps Consulting Engineer at Cisco Systems",url:"https://github.com/egrosdou01",imageURL:"https://github.com/egrosdou01.png",key:"egrosdou01"}],frontMatter:{slug:"cilium-eks-sveltos",title:"Cilium on EKS with Sveltos",authors:["egrosdou01"],date:"2024-07-15T00:00:00.000Z",tags:["cilium","open-source","kubernetes","gitops","devops"]},unlisted:!1,prevItem:{title:"Cilium Cluster Mesh on RKE2",permalink:"/personal-blog/blog/cilium-cluster-mesh-rke2"},nextItem:{title:"Welcome",permalink:"/personal-blog/blog/welcome"}},a={authorsImageUrls:[void 0]},c=[{value:"Introduction",id:"introduction",level:2},{value:"Diagram",id:"diagram",level:2},{value:"Lab Setup",id:"lab-setup",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Step 1: Create EKS Cluster with Terraform",id:"step-1-create-eks-cluster-with-terraform",level:2},{value:"Step 2: Register Cluster with\xa0Sveltos",id:"step-2-register-cluster-withsveltos",level:2},{value:"Generate Sveltos kubeconfig",id:"generate-sveltos-kubeconfig",level:3},{value:"Register EKS\xa0Cluster",id:"register-ekscluster",level:3},{value:"Step 3: Update the EKS\xa0cluster",id:"step-3-update-the-ekscluster",level:2},{value:"Validation",id:"validation",level:3},{value:"Delete kube-proxy Resources",id:"delete-kube-proxy-resources",level:3},{value:"Update aws-node Resources",id:"update-aws-node-resources",level:3},{value:"Step 4: Create Sveltos ClusterProfile",id:"step-4-create-sveltos-clusterprofile",level:3},{value:"Step 5: Deploy Cilium and\xa0Validate",id:"step-5-deploy-cilium-andvalidate",level:2},{value:"Validation",id:"validation-1",level:3},{value:"Deploy Nginx Application",id:"deploy-nginx-application",level:3},{value:"Cilium Validation",id:"cilium-validation",level:3},{value:"Conclusions",id:"conclusions",level:2},{value:"Contact",id:"contact",level:2},{value:"\ud83d\udc4f Support this\xa0project",id:"-support-thisproject",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsxs)(n.p,{children:["In today's blog post, we will demonstrate an easy way of deploying and controlling ",(0,s.jsx)(n.a,{href:"https://docs.cilium.io/en/v1.14/",children:"Cilium"})," on an ",(0,s.jsx)(n.a,{href:"https://aws.amazon.com/eks/",children:"EKS"})," cluster with ",(0,s.jsx)(n.a,{href:"https://github.com/projectsveltos",children:"Sveltos"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["As the majority of the documentation out there provides a step-by-step installation directly with the Helm chart commands, we decided to demonstrate a different approach, the GitOps approach, with the use of ",(0,s.jsx)(n.a,{href:"https://projectsveltos.github.io/sveltos/addons/addons/",children:"Sveltos ClusterProfile"})," CRD (Custom Resource Definition)."]}),"\n",(0,s.jsxs)(n.p,{children:["We will utilise the Terraform ",(0,s.jsx)(n.a,{href:"https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest",children:"AWS EKS module"})," to create an EKS cluster. Once the cluster is up and running, we will register it with Sveltos. Then, we will update the ",(0,s.jsxs)(n.a,{href:"https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html",children:[(0,s.jsx)(n.code,{children:"aws-core"})," daemonset"]})," to support  ENI mode and remove the ",(0,s.jsx)(n.code,{children:"kube-proxy"})," Kubernetes resources as Cilium will take over."]}),"\n",(0,s.jsx)(n.h2,{id:"diagram",children:"Diagram"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Cilium, Sveltos, EKS",src:t(7618).A+"",width:"1600",height:"870"})}),"\n",(0,s.jsx)(n.h2,{id:"lab-setup",children:"Lab Setup"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"+-----------------+-------------------+--------------------------+\n|   Cluster Name  |        Type       |         Version          |\n+-----------------+-------------------+--------------------------+\n|   mgmt          | Management Cluster| RKE2 v1.28.9+rke2r1      |\n| eks-test01      | Managed Cluster   | EKS v1.28.10-eks-49c6de4 |\n+-----------------+-------------------+--------------------------+\n\n+-------------+----------+\n|  Deployment | Version  |\n+-------------+----------+\n|    Cilium   | v1.14.8  |\n|  sveltosctl | v0.27.0  |\n+-------------+----------+\n"})}),"\n",(0,s.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsx)(n.p,{children:"To follow along with the blog post, ensure the below are satisfied."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"AWS Service Account"}),"\n",(0,s.jsx)(n.li,{children:"AWS CLI installed"}),"\n",(0,s.jsx)(n.li,{children:"Terraform installed"}),"\n",(0,s.jsx)(n.li,{children:"kubectl installed"}),"\n",(0,s.jsx)(n.li,{children:"sveltosctl installed"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"step-1-create-eks-cluster-with-terraform",children:"Step 1: Create EKS Cluster with Terraform"}),"\n",(0,s.jsx)(n.p,{children:"The easiest way to spin up an EKS cluster is by following the recommended training and resources from the Hashicorp website. Find the training material and the Git repository further below."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Training: ",(0,s.jsx)(n.a,{href:"https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks",children:"https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["GitHub Repository: ",(0,s.jsx)(n.a,{href:"https://github.com/hashicorp/learn-terraform-provision-eks-cluster",children:"https://github.com/hashicorp/learn-terraform-provision-eks-cluster"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["To execute the Terraform plan, a valid ",(0,s.jsx)(n.code,{children:"AWS Service Account"})," should be available with the right permissions to create the required resources. For more information about the AWS Service Accounts, have a look ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html",children:"here"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["To get the cluster ",(0,s.jsx)(n.code,{children:"kubeconfig"})," and start interacting with the cluster, the ",(0,s.jsx)(n.strong,{children:"AWS CLI"})," is used. Modify and execute the command below."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ aws eks update-kubeconfig --region <the region the cluster created> --name <the name of the cluster>\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["The command will save the kubeconfig in the default directory ",(0,s.jsx)(n.code,{children:"~/.kube/config"}),". If the file should be stored elsewhere, pass the argument ",(0,s.jsx)(n.code,{children:"--kubeconfig"})," and specify the output directory. For more details, check out the ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/cli/latest/reference/eks/update-kubeconfig.html",children:"link"}),"."]})}),"\n",(0,s.jsx)(n.h2,{id:"step-2-register-cluster-withsveltos",children:"Step 2: Register Cluster with\xa0Sveltos"}),"\n",(0,s.jsxs)(n.p,{children:["Once we have access to the cluster, it is time to proceed with the Sveltos cluster registration. As this is a cloud Kubernetes cluster, we need to ensure Sveltos has the ",(0,s.jsx)(n.strong,{children:"right set of permissions"})," to perform the Kubernetes deployments and add-ons. To do that, we will utilise ",(0,s.jsx)(n.code,{children:"sveltosctl"})," and generate a new kubeconfig file."]}),"\n",(0,s.jsx)(n.h3,{id:"generate-sveltos-kubeconfig",children:"Generate Sveltos kubeconfig"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ export KUBECONFIG=<directory of the EKS kubeconfig file>\n\n$ sveltosctl generate kubeconfig --create --expirationSeconds=86400\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"sveltosctl"})," command will create a kubeconfig file. The file will be used for the Sveltos cluster registration."]}),"\n",(0,s.jsx)(n.h3,{id:"register-ekscluster",children:"Register EKS\xa0Cluster"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ sveltosctl register cluster --namespace=<namespace> --cluster=<cluster name> \\\n    --kubeconfig=<path to Sveltos file with Kubeconfig> \\\n    --labels=env=test\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The command above will register the EKS cluster with Sveltos on the mentioned ",(0,s.jsx)(n.strong,{children:"namespace"}),", and ",(0,s.jsx)(n.strong,{children:"name"})," and will attach the cluster ",(0,s.jsx)(n.strong,{children:"label"})," ",(0,s.jsx)(n.code,{children:"env=test"})," defined."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"If the namespace does not exist in the management cluster, the command will fail with the namespace not found error. Ensure the defined namespace exists in the cluster before registration."})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ export KUBECONFIG=<Sveltos managament cluster> \n\n$ kubectl get sveltosclusters -A --show-labels\nNAMESPACE        NAME         READY   VERSION                LABELS\nmgmt             mgmt         true    v1.28.9+rke2r1         sveltos-agent=present\ntest             eks-test01   true    v1.28.10-eks-49c6de4   env=test,sveltos-agent=present\n"})}),"\n",(0,s.jsx)(n.h2,{id:"step-3-update-the-ekscluster",children:"Step 3: Update the EKS\xa0cluster"}),"\n",(0,s.jsxs)(n.p,{children:["As we would like to use Cilium with the Kube Proxy replacement and the ",(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/networking-networkmode-awsvpc.html",children:"ENI"})," mode enabled, we need to perform additional actions. As the ",(0,s.jsx)(n.code,{children:"kube-proxy"})," daemonset is already installed, we have to remove all related resources and update the ",(0,s.jsx)(n.code,{children:"aws-node"})," daemonset to support the ENI mode."]}),"\n",(0,s.jsx)(n.h3,{id:"validation",children:"Validation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ kubectl get pods,ds -n kube-system\nNAME                                      READY   STATUS    RESTARTS   AGE\npod/aws-node-4x8sq                        2/2     Running   0          16m\npod/aws-node-vjtlx                        2/2     Running   0          16m\npod/aws-node-xp7vl                        2/2     Running   0          16m\npod/coredns-648485486-t5sxm               1/1     Running   0          20m\npod/coredns-648485486-tv4h5               1/1     Running   0          20m\npod/ebs-csi-controller-5df9db689f-8hmdm   6/6     Running   0          15m\npod/ebs-csi-controller-5df9db689f-qmxhs   6/6     Running   0          15m\npod/ebs-csi-node-2rspx                    3/3     Running   0          15m\npod/ebs-csi-node-gvtfj                    3/3     Running   0          15m\npod/ebs-csi-node-t96ch                    3/3     Running   0          15m\npod/kube-proxy-4jxlt                      1/1     Running   0          16m\npod/kube-proxy-hgx9h                      1/1     Running   0          16m\npod/kube-proxy-l877x                      1/1     Running   0          16m\n\nNAME                                  DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR              AGE\ndaemonset.apps/aws-node               3         3         3       3            3           <none>                     20m\ndaemonset.apps/ebs-csi-node           3         3         3       3            3           kubernetes.io/os=linux     16m\ndaemonset.apps/ebs-csi-node-windows   0         0         0       0            0           kubernetes.io/os=windows   16m\ndaemonset.apps/kube-proxy             3         3         3       3            3           <none>                     20m\n"})}),"\n",(0,s.jsx)(n.h3,{id:"delete-kube-proxy-resources",children:"Delete kube-proxy Resources"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ export KUBECONFIG=<directory of the EKS kubeconfig file>\n\n$ kubectl delete ds kube-proxy -n kube-system # Remove the kube-proxy daemonset\n\n$ kubectl delete cm kube-proxy -n kube-system # Remove the kube-proxy ConfigMap\n"})}),"\n",(0,s.jsx)(n.h3,{id:"update-aws-node-resources",children:"Update aws-node Resources"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'$ kubectl patch daemonset aws-node --type=\'strategic\' -p=\'{"spec":{"template":{"spec":{"nodeSelector":{"io.cilium/aws-node-enabled":"true"}}}}}\' -n kube-system # This is required based on the Cilium documentation to enable the ENI mode\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ kubectl get pods,ds -n kube-system\nNAME                                      READY   STATUS    RESTARTS   AGE\npod/coredns-648485486-t5sxm               1/1     Running   0          22m\npod/coredns-648485486-tv4h5               1/1     Running   0          22m\npod/ebs-csi-controller-5df9db689f-8hmdm   6/6     Running   0          17m\npod/ebs-csi-controller-5df9db689f-qmxhs   6/6     Running   0          17m\npod/ebs-csi-node-2rspx                    3/3     Running   0          17m\npod/ebs-csi-node-gvtfj                    3/3     Running   0          17m\npod/ebs-csi-node-t96ch                    3/3     Running   0          17m\n\nNAME                                  DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                     AGE\ndaemonset.apps/aws-node               0         0         0       0            0           io.cilium/aws-node-enabled=true   22m\ndaemonset.apps/ebs-csi-node           3         3         3       3            3           kubernetes.io/os=linux            17m\ndaemonset.apps/ebs-csi-node-windows   0         0         0       0            0           kubernetes.io/os=windows          17m\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsx)(n.p,{children:"The aws-node daemonset scaled down to 0 replicas."})}),"\n",(0,s.jsx)(n.h3,{id:"step-4-create-sveltos-clusterprofile",children:"Step 4: Create Sveltos ClusterProfile"}),"\n",(0,s.jsxs)(n.p,{children:["It is time to create a ",(0,s.jsx)(n.strong,{children:"Sveltos ClusterProfile"})," and deploy ",(0,s.jsx)(n.strong,{children:"Cilium"})," to the EKS cluster with the label set to ",(0,s.jsx)(n.code,{children:"env=test"}),". Following the Cilium ",(0,s.jsx)(n.a,{href:"https://docs.cilium.io/en/v1.14/installation/k8s-install-helm/",children:"documentation"}),", we will enable the required Helm values for the ",(0,s.jsx)(n.code,{children:"kube-proxy "}),"replacement and the ENI mode."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"---\napiVersion: config.projectsveltos.io/v1alpha1\nkind: ClusterProfile\nmetadata:\n  name: cilium-1148\nspec:\n  clusterSelector: env=test # Deploy Cilium v1.14.8 to any cluster with the cluster label set to env=test\n  helmCharts:\n  - chartName: cilium/cilium\n    chartVersion: 1.14.8\n    helmChartAction: Install\n    releaseName: cilium\n    releaseNamespace: kube-system\n    repositoryName: cilium\n    repositoryURL: https://helm.cilium.io/\n    values: |\n      eni:\n        enabled: true\n      ipam:\n        mode: eni\n      egressMasqueradeInterfaces: eth0\n      routingMode: native\n      kubeProxyReplacement: true\n      k8sServiceHost: <The Server API FQDN or IP Address> # The information can be exctracted from the kubeconfig file or the AWS UI\n      k8sServicePort: <The Server API listening port> # The information can be extracted from the kubeconfig file or the AWS UI\n      nodePort:\n        enabled: true\n      debug:\n        enabled: true\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The ClusterProfile will deploy Cilium CNI to any cluster with the cluster label set to ",(0,s.jsx)(n.code,{children:"env=test"}),". It will then deploy the Cilium Helm chart in the ",(0,s.jsx)(n.code,{children:"kube-system"})," namespace alongside the kube-proxy replacement and the ENI mode. Hubble is also enabled."]}),"\n",(0,s.jsx)(n.h2,{id:"step-5-deploy-cilium-andvalidate",children:"Step 5: Deploy Cilium and\xa0Validate"}),"\n",(0,s.jsx)(n.p,{children:"To see and evaluate the results, the Sveltos ClusterProfile will be deployed to the management cluster."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'$ export KUBECONFIG=<Sveltos managament cluster>\n\n$ kubectl apply -f "clusterprofile_cilium1148.yaml"\n'})}),"\n",(0,s.jsx)(n.h3,{id:"validation-1",children:"Validation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ ./sveltosctl show addons\n+-----------------+---------------+-------------+--------+---------+-------------------------------+----------------------------+\n|     CLUSTER     | RESOURCE TYPE |  NAMESPACE  |  NAME  | VERSION |             TIME              |          PROFILES          |\n+-----------------+---------------+-------------+--------+---------+-------------------------------+----------------------------+\n| test/eks-test01 | helm chart    | kube-system | cilium | 1.14.8  | 2024-06-18 14:39:26 +0000 UTC | ClusterProfile/cilium-1148 |\n+-----------------+---------------+-------------+--------+---------+-------------------------------+----------------------------+\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"$ export KUBECONFIG=<directory of the EKS kubeconfig file>\n\n$ kubectl get pods -n kube-system | grep -i cilium\ncilium-2vg4c                          1/1     Running             0          54s\ncilium-operator-594f4858f6-km2wh      1/1     Running             0          54s\ncilium-operator-594f4858f6-xx2q6      1/1     Running             0          55s\ncilium-qrwwf                          1/1     Running             0          55s\ncilium-s55v5                          1/1     Running             0          54s\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'$ kubectl exec -it cilium-2vg4c -n kube-system -- cilium status\nDefaulted container "cilium-agent" out of: cilium-agent, config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)\nKVStore:                 Ok   Disabled\nKubernetes:              Ok   1.28+ (v1.28.10-eks-49c6de4) [linux/amd64]\nKubernetes APIs:         ["EndpointSliceOrEndpoint", "cilium/v2::CiliumClusterwideNetworkPolicy", "cilium/v2::CiliumEndpoint", "cilium/v2::CiliumNetworkPolicy", "cilium/v2::CiliumNode", "cilium/v2alpha1::CiliumCIDRGroup", "core/v1::Namespace", "core/v1::Pods", "core/v1::Service", "networking.k8s.io/v1::NetworkPolicy"]\nKubeProxyReplacement:    True   [eth0 10.0.1.150 (Direct Routing), eth1 10.0.1.37]\n'})}),"\n",(0,s.jsx)(n.h3,{id:"deploy-nginx-application",children:"Deploy Nginx Application"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'$ kubectl apply -f "nginx.yaml"\n\n$ kubectl get pods,svc\nNAME                            READY   STATUS    RESTARTS   AGE\npod/my-nginx-684dd4dcd4-gl9rm   1/1     Running   0          18s\npod/my-nginx-684dd4dcd4-nk9mm   1/1     Running   0          18s\n\nNAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE\nservice/kubernetes   ClusterIP   172.20.0.1      <none>        443/TCP        33m\nservice/my-nginx     NodePort    172.20.80.220   <none>        80:32449/TCP   3s\n'})}),"\n",(0,s.jsx)(n.h3,{id:"cilium-validation",children:"Cilium Validation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'$ kubectl -n kube-system exec ds/cilium -- cilium service list\nDefaulted container "cilium-agent" out of: cilium-agent, config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)\nID   Frontend             Service Type   Backend                         \n1    172.20.0.1:443       ClusterIP      1 => 10.0.1.15:443 (active)     \n                                         2 => 10.0.2.226:443 (active)    \n2    172.20.208.197:443   ClusterIP      1 => 10.0.1.150:4244 (active)   \n3    172.20.22.66:80      ClusterIP      1 => 10.0.3.36:4245 (active)    \n4    172.20.141.67:80     ClusterIP      1 => 10.0.2.229:8081 (active)   \n5    172.20.0.10:53       ClusterIP      1 => 10.0.1.144:53 (active)     \n                                         2 => 10.0.3.123:53 (active)     \n6    172.20.80.220:80     ClusterIP      1 => 10.0.1.216:80 (active)     \n                                         2 => 10.0.3.39:80 (active)      \n7    10.0.1.150:32449     NodePort       1 => 10.0.1.216:80 (active)     \n                                         2 => 10.0.3.39:80 (active)      \n8    10.0.1.37:32449      NodePort       1 => 10.0.1.216:80 (active)     \n                                         2 => 10.0.3.39:80 (active)      \n9    0.0.0.0:32449        NodePort       1 => 10.0.1.216:80 (active)     \n                                         2 => 10.0.3.39:80 (active)\n'})}),"\n",(0,s.jsx)(n.p,{children:"From the output above, we can observe that Cilium eBPF kube-proxy replacement created the NodePort service for Nginx."}),"\n",(0,s.jsxs)(n.p,{children:["As the blog post is not intended to outline in depth how the kube-proxy replacement works, check out the ",(0,s.jsx)(n.a,{href:"https://docs.cilium.io/en/v1.14/network/kubernetes/kubeproxy-free/",children:"link"})," for further tests."]}),"\n",(0,s.jsx)(n.h2,{id:"conclusions",children:"Conclusions"}),"\n",(0,s.jsx)(n.p,{children:"We demonstrated an easy way of deploying Cilium CNI to an EKS cluster with the Sveltos ClusterProfile. The complete lifecycle of the CNI is now controlled by Sveltos and without external dependencies."}),"\n",(0,s.jsxs)(n.p,{children:["Take advantage of the ",(0,s.jsx)(n.a,{href:"https://projectsveltos.github.io/sveltos/template/intro_template/",children:"Sveltos Templating"})," and the ",(0,s.jsx)(n.a,{href:"https://projectsveltos.github.io/sveltos/events/addon_event_deployment/",children:"Sveltos Event Framework"})," capabilities to make every Kubernetes deployment and add-on easier!"]}),"\n",(0,s.jsx)(n.h2,{id:"contact",children:"Contact"}),"\n",(0,s.jsxs)(n.p,{children:["We are here to help! Whether you have questions, or issues or need assistance, our Slack channel is the perfect place for you. Click here to ",(0,s.jsx)(n.a,{href:"https://app.slack.com/client/T0471SNT5CZ/C06UZCXQLGP",children:"join us"})," us."]}),"\n",(0,s.jsx)(n.h2,{id:"-support-thisproject",children:"\ud83d\udc4f Support this\xa0project"}),"\n",(0,s.jsxs)(n.p,{children:["Every contribution counts! If you enjoyed this article, check out the Projectsveltos ",(0,s.jsx)(n.a,{href:"https://github.com/projectsveltos",children:"GitHub repo"}),". You can ",(0,s.jsx)(n.a,{href:"https://github.com/projectsveltos",children:"star \ud83c\udf1f the project"})," if you find it helpful."]}),"\n",(0,s.jsx)(n.p,{children:"The GitHub repo is a great resource for getting started with the project. It contains the code, documentation, and many more examples."}),"\n",(0,s.jsx)(n.p,{children:"Thanks for reading!"})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},7618:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/cilium_sveltos_eks-96202e60f24f3661fb326790c8b28ead.jpg"},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>r});var s=t(6540);const i={},o=s.createContext(i);function l(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);