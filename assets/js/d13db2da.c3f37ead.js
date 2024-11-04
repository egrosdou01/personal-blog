"use strict";(self.webpackChunkpersonal_blog=self.webpackChunkpersonal_blog||[]).push([[1854],{1623:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var r=i(4848),t=i(8453);const s={slug:"rancher-rke2-cilium-azure",title:"Rancher RKE2 Cluster on Azure",authors:["egrosdou01"],date:new Date("2024-07-26T00:00:00.000Z"),tags:["rancher","cilium","rke2","open-source","kubernetes","gitops","devops","azure","2024"],image:"./Rancher_RKE2_Cilium_Azure.jpg"},l=void 0,o={permalink:"/personal-blog/blog/rancher-rke2-cilium-azure",source:"@site/blog/2024-07-26-rancher-rke2-azure/rancher-rke2-cilium-azure.md",title:"Rancher RKE2 Cluster on Azure",description:"Introduction",date:"2024-07-26T00:00:00.000Z",tags:[{inline:!1,label:"Rancher",permalink:"/personal-blog/blog/tags/rancher",description:"Rancher"},{inline:!1,label:"Cilium",permalink:"/personal-blog/blog/tags/cilium",description:"eBPF-based Networking, Security, and Observability for Kubernetes"},{inline:!1,label:"RKE2",permalink:"/personal-blog/blog/tags/rke2",description:"Rancher Kubernetes Engine 2 (RKE2)"},{inline:!1,label:"Open Source",permalink:"/personal-blog/blog/tags/open-source",description:"Open source software"},{inline:!1,label:"Kubernetes",permalink:"/personal-blog/blog/tags/kubernetes",description:"Container orchestration platform for automating application deployment, scaling, and management"},{inline:!1,label:"GitOps",permalink:"/personal-blog/blog/tags/gitops",description:"Operational framework that uses Git as a single source of truth for declarative infrastructure and applications"},{inline:!1,label:"DevOps",permalink:"/personal-blog/blog/tags/devops",description:"Set of practices that combines software development and IT operations"},{inline:!1,label:"Azure",permalink:"/personal-blog/blog/tags/azure",description:"Azure Cloud"},{inline:!1,label:"2024",permalink:"/personal-blog/blog/tags/2024",description:"The year the post went online"}],readingTime:8.145,hasTruncateMarker:!0,authors:[{name:"Eleni Grosdouli",title:"DevOps Consulting Engineer at Cisco Systems",url:"https://github.com/egrosdou01",imageURL:"https://github.com/egrosdou01.png",key:"egrosdou01"}],frontMatter:{slug:"rancher-rke2-cilium-azure",title:"Rancher RKE2 Cluster on Azure",authors:["egrosdou01"],date:"2024-07-26T00:00:00.000Z",tags:["rancher","cilium","rke2","open-source","kubernetes","gitops","devops","azure","2024"],image:"./Rancher_RKE2_Cilium_Azure.jpg"},unlisted:!1,prevItem:{title:"Sveltos Templating: Cilium Cluster Mesh in One Run",permalink:"/personal-blog/blog/sveltos-templating-cilium-cluster-mesh"},nextItem:{title:"Cilium Cluster Mesh on RKE2",permalink:"/personal-blog/blog/cilium-cluster-mesh-rke2"}},a={image:i(519).A,authorsImageUrls:[void 0]},c=[{value:"Introduction",id:"introduction",level:2},{value:"Lab Setup",id:"lab-setup",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Rancher Server",id:"rancher-server",level:3},{value:"Azure Free Credits",id:"azure-free-credits",level:3},{value:"Set up Azure Cloud Environment",id:"set-up-azure-cloud-environment",level:2},{value:"Retrieve the Tenant ID",id:"retrieve-the-tenant-id",level:3},{value:"Create a Rancher App Registration",id:"create-a-rancher-app-registration",level:3},{value:"Create an Azure Client Secret for App Registration",id:"create-an-azure-client-secret-for-app-registration",level:3},{value:"Create App Registration Permissions",id:"create-app-registration-permissions",level:3},{value:"Azure Free Account Limitations",id:"azure-free-account-limitations",level:2},{value:"Set up Rancher Cloud Credentials",id:"set-up-rancher-cloud-credentials",level:2},{value:"Create an RKE2 cluster with Cilium",id:"create-an-rke2-cluster-with-cilium",level:2},{value:"RKE2 Cluster Validation",id:"rke2-cluster-validation",level:2},{value:"\u2709\ufe0f Contact",id:"\ufe0f-contact",level:2},{value:"Conclusions",id:"conclusions",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,r.jsxs)(n.p,{children:["For the last couple of days, I have been working on a new use case installing ",(0,r.jsx)(n.a,{href:"https://docs.rke2.io/",children:"RKE2"})," clusters powered with ",(0,r.jsx)(n.a,{href:"https://docs.cilium.io/en/v1.15/",children:"Cilium"})," on ",(0,r.jsx)(n.a,{href:"https://azure.microsoft.com/en-us/get-started",children:"Azure Cloud"}),". The requirement at hand was to use a ",(0,r.jsx)(n.a,{href:"https://ranchermanager.docs.rancher.com/v2.8",children:"Rancher"})," instance and from there start deploying RKE2 clusters. After going through the official Rancher documentation, I have noticed that the instructions provided to pre-configure ",(0,r.jsx)(n.a,{href:"https://ranchermanager.docs.rancher.com/v2.8/how-to-guides/new-user-guides/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/create-an-azure-cluster",children:"Azure Cloud"})," are outdated."]}),"\n",(0,r.jsxs)(n.p,{children:["In today's blog post, we will cover all the required steps taken to configure the ",(0,r.jsx)(n.a,{href:"https://azure.microsoft.com/en-us/free#all-free-services",children:"Azure cloud-free credits"})," to deploy RKE2 clusters with Cilium in that environment. Additionally, we will cover any limitations that come with the ",(0,r.jsx)(n.code,{children:"free credit"})," concept."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"title image reading &quot;Rancher RKE2 Cluster on Azure&quot;",src:i(1604).A+"",width:"8412",height:"1902"})}),"\n",(0,r.jsx)(n.h2,{id:"lab-setup",children:"Lab Setup"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"+-----------------------------+------------------+----------------------+\n|        Cluster Name         |       Type       |       Version        |\n+-----------------------------+------------------+----------------------+\n|          Rancher            |   k3s cluster    |    v1.28.7+k3s1      |\n| Downstream RKE2 cluster     |       RKE2       |  v1.28.11+rke2r1     |\n+-----------------------------+------------------+----------------------+\n\n+-------------------+----------+\n|    Deployment     | Version  |\n+-------------------+----------+\n|      Cilium       | 1.15.500 |\n+-------------------+----------+\n\n"})}),"\n",(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsx)(n.h3,{id:"rancher-server",children:"Rancher Server"}),"\n",(0,r.jsxs)(n.p,{children:["We do not concentrate on installing Rancher. If you are not sure how to install Rancher, have a look at the official documentation ",(0,r.jsx)(n.a,{href:"https://ranchermanager.docs.rancher.com/getting-started/quick-start-guides",children:"here"})," or go through the guide I created a couple of weeks back ",(0,r.jsx)(n.a,{href:"https://medium.com/@eleni.grosdouli/rancher-on-eks-with-nginx-ingress-and-lets-encrypt-4f041fc1adae",children:"here"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"azure-free-credits",children:"Azure Free Credits"}),"\n",(0,r.jsxs)(n.p,{children:["For this demonstration, we will use the Azure ",(0,r.jsx)(n.a,{href:"https://azure.microsoft.com/en-us/free",children:"free credits"})," offering. The approach taken is more than enough to give readers a free and good understanding of how to set up the Azure cloud environment to perform RKE2 deployments with Rancher."]}),"\n",(0,r.jsx)(n.p,{children:"Ensure the below are satisfied."}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Helm CLI installed (Optional Step)"}),"\n",(0,r.jsx)(n.li,{children:"kubectl installed"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"set-up-azure-cloud-environment",children:"Set up Azure Cloud Environment"}),"\n",(0,r.jsx)(n.p,{children:"In this section, we will provide readers with all the needed guidance on setting up their environment for the RKE2 deployment"}),"\n",(0,r.jsx)(n.h3,{id:"retrieve-the-tenant-id",children:"Retrieve the Tenant ID"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Tenant ID"})," identifies which Azure Active Directory (AD) instance the application sits under. To retrieve the Tenant ID, follow the steps below."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Login to Azure ",(0,r.jsx)(n.a,{href:"https://portal.azure.com/",children:"portal"})]}),"\n",(0,r.jsxs)(n.li,{children:["Navigate to ",(0,r.jsx)(n.strong,{children:"Home"})]}),"\n",(0,r.jsxs)(n.li,{children:["Search for ",(0,r.jsx)(n.code,{children:"Microsoft Entra ID"}),"\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;Microsoft Entra ID&quot;",src:i(2771).A+"",width:"3032",height:"574"})]}),"\n",(0,r.jsxs)(n.li,{children:["Navigate to ",(0,r.jsx)(n.strong,{children:"Manage > Properties"})]}),"\n",(0,r.jsxs)(n.li,{children:["Grab the ",(0,r.jsx)(n.code,{children:"Tenant ID"})," once the new windows appear"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"create-a-rancher-app-registration",children:"Create a Rancher App Registration"}),"\n",(0,r.jsx)(n.p,{children:"Azure App Registration is the process of registering an application with Azure AD."}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Access the Azure ",(0,r.jsx)(n.a,{href:"https://portal.azure.com/",children:"portal"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Navigate to ",(0,r.jsx)(n.strong,{children:"Home > App registrations > + New Registration"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Choose the below details:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Name"}),": What is the name your application will have"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Supported account types"}),': In my case, I chose the first one, "Accounts in this organizational directory only (Default Directory only - Single tenant)"']}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Redirect URI (optional)"}),": set ",(0,r.jsx)(n.code,{children:"Web"})," and leave the ",(0,r.jsx)(n.code,{children:"Sign-on URL"})," empty or add your own URI"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Click the ",(0,r.jsx)(n.strong,{children:"Register"})," button to create the application"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"title image reading &quot;App Registration&quot;",src:i(2811).A+"",width:"1984",height:"1906"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"create-an-azure-client-secret-for-app-registration",children:"Create an Azure Client Secret for App Registration"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Access the Azure ",(0,r.jsx)(n.a,{href:"https://portal.azure.com/",children:"portal"})]}),"\n",(0,r.jsxs)(n.li,{children:["Navigate to ",(0,r.jsx)(n.strong,{children:"Home > App registrations > App name"})]}),"\n",(0,r.jsxs)(n.li,{children:["Navigate to ",(0,r.jsx)(n.strong,{children:"Manage > Certificates & secrets"}),"\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;Client Secret&quot;",src:i(8502).A+"",width:"384",height:"567"})]}),"\n",(0,r.jsxs)(n.li,{children:["Click on the ",(0,r.jsx)(n.strong,{children:"+ New client secret"})]}),"\n",(0,r.jsxs)(n.li,{children:["Provide a ",(0,r.jsx)(n.code,{children:"description"})," and an ",(0,r.jsx)(n.code,{children:"expiry date"})]}),"\n",(0,r.jsxs)(n.li,{children:["Click ",(0,r.jsx)(n.strong,{children:"+ Add"})]}),"\n",(0,r.jsxs)(n.li,{children:["Copy the ",(0,r.jsx)(n.code,{children:"Value"})," and proceed with the configuraition"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"create-app-registration-permissions",children:"Create App Registration Permissions"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Access the Azure ",(0,r.jsx)(n.a,{href:"https://portal.azure.com/",children:"portal"})]}),"\n",(0,r.jsxs)(n.li,{children:["Navigate to ",(0,r.jsx)(n.strong,{children:"Home > Subscriptions > Your subscription name > Access Control (IAM)"}),"\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;IAM&quot;",src:i(5450).A+"",width:"3054",height:"844"})]}),"\n",(0,r.jsxs)(n.li,{children:["Click on the ",(0,r.jsx)(n.strong,{children:"+ Add > Add role assigment"}),"\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;IAM&quot;",src:i(9618).A+"",width:"2585",height:"1852"})]}),"\n",(0,r.jsxs)(n.li,{children:["Open the ",(0,r.jsx)(n.code,{children:"Privileged administrator roles"})," tab"]}),"\n",(0,r.jsxs)(n.li,{children:["For Role, select ",(0,r.jsx)(n.code,{children:"Contributor"})]}),"\n",(0,r.jsxs)(n.li,{children:["Click on ",(0,r.jsx)(n.strong,{children:"Next"})]}),"\n",(0,r.jsxs)(n.li,{children:["Members and ",(0,r.jsx)(n.strong,{children:"+ Select members"})," and then choose or type for ",(0,r.jsx)(n.code,{children:"Rancher"}),". If your application name is something else, provide the application name created in a previous step"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Review + assing"})}),"\n",(0,r.jsx)(n.li,{children:"Proceed with the creation"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"azure-free-account-limitations",children:"Azure Free Account Limitations"}),"\n",(0,r.jsxs)(n.p,{children:["Find below some of the limitations spotted with the ",(0,r.jsx)(n.code,{children:"free-credit"})," subscription."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["You cannot have more than ",(0,r.jsx)(n.strong,{children:"one"})," resource pools"]}),"\n",(0,r.jsxs)(n.li,{children:["You cannot have more than ",(0,r.jsx)(n.strong,{children:"3"})," Public IP addresses"]}),"\n",(0,r.jsxs)(n.li,{children:["You cannot create a resource pool with a ",(0,r.jsx)(n.code,{children:"VM Size"})," ",(0,r.jsx)(n.strong,{children:"greater than"})," ",(0,r.jsx)(n.code,{children:"Standard_D2_v2"})]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"set-up-rancher-cloud-credentials",children:"Set up Rancher Cloud Credentials"}),"\n",(0,r.jsxs)(n.p,{children:["Once we have the Azure environment ready, we can move on with Rancher. The first thing we have to do is to create ",(0,r.jsx)(n.code,{children:"Azure Cloud Credentials"}),". The cloud credentials will be used to provision clusters or can be used in other node templates."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Login to Rancher"}),"\n",(0,r.jsxs)(n.li,{children:["Navigate to ",(0,r.jsxs)(n.strong,{children:["Home > Cluster management ",(0,r.jsx)(n.img,{alt:"title image reading &quot;Cluster Management&quot;",src:i(7800).A+"",width:"20",height:"16"})," > Cloud Credentials > Create > Choose Azure"]})]}),"\n",(0,r.jsxs)(n.li,{children:["Provide a ",(0,r.jsx)(n.code,{children:"name"}),", ",(0,r.jsx)(n.code,{children:"tenant ID"})," (",(0,r.jsx)(n.strong,{children:"Home > Subscriptions"}),"), ",(0,r.jsx)(n.code,{children:"clientID"})," (",(0,r.jsx)(n.strong,{children:"Home > App registrations > Rancher > copy the Application (client) ID"}),"), ",(0,r.jsx)(n.code,{children:"client secret"})," (",(0,r.jsx)(n.strong,{children:"Home > App registrations > App name > manage > certificates & secrets"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:["Click the ",(0,r.jsx)(n.strong,{children:'"Create"'})," button and ensure no error appears on the screen"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"create-an-rke2-cluster-with-cilium",children:"Create an RKE2 cluster with Cilium"}),"\n",(0,r.jsx)(n.p,{children:"It is time to use the Azure cloud credentials to create an RKE2 cluster on Azure with Cilium."}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Login to the ",(0,r.jsx)(n.strong,{children:"Rancher UI"})]}),"\n",(0,r.jsxs)(n.li,{children:["Navigiate to ",(0,r.jsxs)(n.strong,{children:["Home > Cluster management ",(0,r.jsx)(n.img,{alt:"title image reading &quot;Cluster Management&quot;",src:i(7800).A+"",width:"20",height:"16"})," > Create > ensure RKE2 is selected > Choose Azure"]})]}),"\n",(0,r.jsxs)(n.li,{children:["The ",(0,r.jsx)(n.code,{children:"Cloud Credentials"})," field will get populated automatically. Fill out the details below.","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Cluster Name"}),": Set a cluster name"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Cluster Description"}),": Set a cluster description"]}),"\n",(0,r.jsxs)(n.li,{children:["Set the ",(0,r.jsx)(n.code,{children:"Machine Pools"})," details. This reflects the nodes we will have on the cluster and their specified role (controller or worker nodes).","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Pool Name"}),": Left the default"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Machine Count"}),": Set to 2 due to limitations"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Location"}),": Choose your favourable location\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;Azure RKE2 Cluster Page 01&quot;",src:i(5473).A+"",width:"1923",height:"893"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Continue with the ",(0,r.jsx)(n.strong,{children:"Cluster Configuration > Basics"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Kubernetes Version"}),": Define the preferred Kubernetes version"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Container Network"}),": Choose ",(0,r.jsx)(n.strong,{children:"Cilium"}),"\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;Azure RKE2 Cluster Page 02&quot;",src:i(4890).A+"",width:"1918",height:"706"}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["We can leave the rest of the configuration as default. However, if we want to enable Cilium with ",(0,r.jsx)(n.code,{children:"kube-proxy"})," replacement, we can update the cluster by editing the YAML configuration instead. This can be done by clicking the ",(0,r.jsx)(n.code,{children:"Edit as YAML"})," button at the bottom right-hand side."]})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Continue with the ",(0,r.jsx)(n.strong,{children:"Cluster Configuration > Advanced"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Additional Controller Manager Args"}),": Set ",(0,r.jsx)(n.code,{children:"--configure-cloud-routes=false"}),"\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;Azure RKE2 Cluster Page 03&quot;",src:i(99).A+"",width:"1917",height:"792"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Click ",(0,r.jsx)(n.strong,{children:'"Save"'})]}),"\n"]}),"\n",(0,r.jsxs)(n.admonition,{type:"note",children:[(0,r.jsx)(n.p,{children:"The cluster creation might take up to 20 minutes. Be patient as a couple of resources and Azure items are created for this cluster."}),(0,r.jsxs)(n.p,{children:["After 20 minutes:\n",(0,r.jsx)(n.img,{alt:"title image reading &quot;Azure RKE2 Cluster Page Success&quot;",src:i(7044).A+"",width:"1917",height:"653"})]})]}),"\n",(0,r.jsx)(n.h2,{id:"rke2-cluster-validation",children:"RKE2 Cluster Validation"}),"\n",(0,r.jsx)(n.p,{children:"Now that the RKE2 cluster is up and running, let's perform some validation steps to ensure the cluster is working as expected."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ kubectl get nodes -o wide\nNAME                          STATUS   ROLES                              AGE   VERSION           INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION     CONTAINER-RUNTIME\ntest03-pool1-cff6be83-jfnrw   Ready    control-plane,etcd,master,worker   50m   v1.28.11+rke2r1   192.168.0.5   <none>        Ubuntu 18.04.6 LTS   5.4.0-1109-azure   containerd://1.7.17-k3s1\ntest03-pool1-cff6be83-wml94   Ready    control-plane,etcd,master,worker   56m   v1.28.11+rke2r1   192.168.0.4   <none>        Ubuntu 18.04.6 LTS   5.4.0-1109-azure   containerd://1.7.17-k3s1\n\n$ kubectl get pods -n kube-system\nNAME                                                   READY   STATUS      RESTARTS      AGE\ncilium-4wzld                                           1/1     Running     0             49m\ncilium-7st9q                                           1/1     Running     0             55m\ncilium-operator-695b4bfc8b-rrdpw                       1/1     Running     3 (46m ago)   55m\ncilium-operator-695b4bfc8b-wvswc                       1/1     Running     5 (44m ago)   55m\ncloud-controller-manager-test03-pool1-cff6be83-jfnrw   1/1     Running     4 (43m ago)   49m\ncloud-controller-manager-test03-pool1-cff6be83-wml94   1/1     Running     5 (44m ago)   55m\netcd-test03-pool1-cff6be83-jfnrw                       1/1     Running     0             49m\netcd-test03-pool1-cff6be83-wml94                       1/1     Running     0             55m\nhelm-install-rke2-cilium-4g9m6                         0/1     Completed   0             56m\nhelm-install-rke2-coredns-4fcl8                        0/1     Completed   0             56m\nhelm-install-rke2-ingress-nginx-sllhl                  0/1     Completed   0             56m\nhelm-install-rke2-metrics-server-djld4                 0/1     Completed   0             56m\nhelm-install-rke2-snapshot-controller-6vktm            0/1     Completed   0             56m\nhelm-install-rke2-snapshot-controller-crd-fmr6n        0/1     Completed   0             56m\nhelm-install-rke2-snapshot-validation-webhook-tj4b8    0/1     Completed   0             56m\nkube-apiserver-test03-pool1-cff6be83-jfnrw             1/1     Running     1 (43m ago)   49m\nkube-apiserver-test03-pool1-cff6be83-wml94             1/1     Running     1             43m\nkube-controller-manager-test03-pool1-cff6be83-jfnrw    1/1     Running     3 (46m ago)   49m\nkube-controller-manager-test03-pool1-cff6be83-wml94    1/1     Running     1 (44m ago)   46m\nkube-proxy-test03-pool1-cff6be83-jfnrw                 1/1     Running     0             49m\nkube-proxy-test03-pool1-cff6be83-wml94                 1/1     Running     0             55m\nkube-scheduler-test03-pool1-cff6be83-jfnrw             1/1     Running     3 (46m ago)   49m\nkube-scheduler-test03-pool1-cff6be83-wml94             1/1     Running     1 (44m ago)   46m\nrke2-coredns-rke2-coredns-84b9cb946c-bd8p6             1/1     Running     0             49m\nrke2-coredns-rke2-coredns-84b9cb946c-npgl2             1/1     Running     0             55m\nrke2-coredns-rke2-coredns-autoscaler-b49765765-lp244   1/1     Running     0             55m\nrke2-ingress-nginx-controller-qk5mc                    1/1     Running     0             53m\nrke2-ingress-nginx-controller-wbdf8                    1/1     Running     0             48m\nrke2-metrics-server-655477f655-j9vzw                   1/1     Running     0             54m\nrke2-snapshot-controller-59cc9cd8f4-8fhwb              1/1     Running     6 (44m ago)   54m\nrke2-snapshot-validation-webhook-54c5989b65-9vb9w      1/1     Running     0             54m\n\n$ kubectl get pods,svc -n cattle-system\nNAME                                             READY   STATUS      RESTARTS      AGE\npod/cattle-cluster-agent-59df97fc7f-44q74        1/1     Running     2 (43m ago)   46m\npod/cattle-cluster-agent-59df97fc7f-vbvbb        1/1     Running     0             45m\npod/helm-operation-4clvk                         0/2     Completed   0             50m\npod/helm-operation-89qsx                         0/2     Completed   0             51m\npod/rancher-webhook-d677765b4-6vrkh              1/1     Running     1 (44m ago)   44m\npod/system-upgrade-controller-6f86d6d4df-jvd9k   1/1     Running     0             51m\n\nNAME                           TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE\nservice/cattle-cluster-agent   ClusterIP   10.43.82.34    <none>        80/TCP,443/TCP   56m\nservice/rancher-webhook        ClusterIP   10.43.80.125   <none>        443/TCP          51m\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'$ kubectl exec -it ds/cilium -n kube-system -- cilium status\nDefaulted container "cilium-agent" out of: cilium-agent, install-portmap-cni-plugin (init), config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)\nKVStore:                 Ok   Disabled\nKubernetes:              Ok   1.28 (v1.28.11+rke2r1) [linux/amd64]\nKubernetes APIs:         ["EndpointSliceOrEndpoint", "cilium/v2::CiliumClusterwideNetworkPolicy", "cilium/v2::CiliumEndpoint", "cilium/v2::CiliumNetworkPolicy", "cilium/v2::CiliumNode", "cilium/v2alpha1::CiliumCIDRGroup", "core/v1::Namespace", "core/v1::Pods", "core/v1::Service", "networking.k8s.io/v1::NetworkPolicy"]\nKubeProxyReplacement:    False   [eth0   192.168.0.5 fe80::6245:bdff:fe94:cd06]\nHost firewall:           Disabled\nSRv6:                    Disabled\nCNI Chaining:            portmap\nCNI Config file:         successfully wrote CNI configuration file to /host/etc/cni/net.d/05-cilium.conflist\nCilium:                  Ok   1.15.5 (v1.15.5-8c7e442c)\nNodeMonitor:             Disabled\nCilium health daemon:    Ok   \nIPAM:                    IPv4: 9/254 allocated from 10.42.1.0/24, \nIPv4 BIG TCP:            Disabled\nIPv6 BIG TCP:            Disabled\nBandwidthManager:        Disabled\nHost Routing:            Legacy\nMasquerading:            IPTables [IPv4: Enabled, IPv6: Disabled]\nController Status:       52/52 healthy\nProxy Status:            OK, ip 10.42.1.172, 0 redirects active on ports 10000-20000, Envoy: embedded\nGlobal Identity Range:   min 256, max 65535\nHubble:                  Disabled\nEncryption:              Disabled        \nCluster health:          2/2 reachable   (2024-07-26T09:19:17Z)\nModules Health:          Stopped(0) Degraded(0) OK(11)\n\n'})}),"\n",(0,r.jsx)(n.h2,{id:"\ufe0f-contact",children:"\u2709\ufe0f Contact"}),"\n",(0,r.jsxs)(n.p,{children:["If you have any questions, feel free to get in touch! You can use the ",(0,r.jsx)(n.code,{children:"Discussions"})," option found ",(0,r.jsx)(n.a,{href:"https://github.com/egrosdou01/personal-blog/discussions",children:"here"})," or reach out to me on any of the social media platforms provided. \ud83d\ude0a"]}),"\n",(0,r.jsx)(n.p,{children:"We look forward to hearing from you!"}),"\n",(0,r.jsx)(n.h2,{id:"conclusions",children:"Conclusions"}),"\n",(0,r.jsxs)(n.p,{children:["This is it! We performed an RKE2 cluster with Cilium using the Rancher UI in just a few clicks. \ud83c\udf89 In an upcoming blog post, we will demonstrate how to perform the same with either ",(0,r.jsx)(n.a,{href:"https://www.terraform.io/",children:"Terraform"})," or ",(0,r.jsx)(n.a,{href:"https://opentofu.org/",children:"OpenTofu"}),"!"]}),"\n",(0,r.jsx)(n.p,{children:"It's a wrap for this post! \ud83c\udf89 Thanks for reading! Stay tuned for more exciting updates!"})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},519:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/Rancher_RKE2_Cilium_Azure-5c16e5dc1bd8c9f1d6816d68dca6d0e8.jpg"},1604:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/Rancher_RKE2_Cilium_Azure-5c16e5dc1bd8c9f1d6816d68dca6d0e8.jpg"},9618:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/add_role_assigment-405ad73b8039535148cdf018c1579a26.png"},2811:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/app_registration-a7bc57ccbd9e147742e95a7a286653ae.png"},5473:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/azure_rke2_page01-56fcd29de3bab6431f65cad94caa45d2.png"},4890:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/azure_rke2_page02-a5ef6cc7238ae8559ee5278311360e42.png"},99:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/azure_rke2_page03-9f52550c7de5a3ecf728618142775be8.png"},7044:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/azure_rke2_success-1871165ca5bfbb55a502387aa991891d.png"},8502:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/client_secret-593e5e67a0c9da5ce01eee225d7e1153.png"},7800:(e,n,i)=>{i.d(n,{A:()=>r});const r="data:image/png;base64,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"},5450:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/iam-6a88e8c23b90c4289246a47821981987.png"},2771:(e,n,i)=>{i.d(n,{A:()=>r});const r=i.p+"assets/images/microsoft_entra_id-af1923eb3d97674f94a215088411e374.png"},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>o});var r=i(6540);const t={},s=r.createContext(t);function l(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);