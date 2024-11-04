"use strict";(self.webpackChunkpersonal_blog=self.webpackChunkpersonal_blog||[]).push([[1620],{891:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var o=n(4848),i=n(8453);const s={slug:"cilium-cluster-mesh-rke2",title:"Cilium Cluster Mesh on RKE2",authors:["egrosdou01"],date:new Date("2024-07-18T00:00:00.000Z"),tags:["cilium","rke2","open-source","kubernetes","gitops","devops","2024"]},r=void 0,l={permalink:"/personal-blog/blog/cilium-cluster-mesh-rke2",source:"@site/blog/2024-07-18-rke2-cilium/cilium-cluster-mesh-rke2.md",title:"Cilium Cluster Mesh on RKE2",description:"Introduction",date:"2024-07-18T00:00:00.000Z",tags:[{inline:!1,label:"Cilium",permalink:"/personal-blog/blog/tags/cilium",description:"eBPF-based Networking, Security, and Observability for Kubernetes"},{inline:!1,label:"RKE2",permalink:"/personal-blog/blog/tags/rke2",description:"Rancher Kubernetes Engine 2 (RKE2)"},{inline:!1,label:"Open Source",permalink:"/personal-blog/blog/tags/open-source",description:"Open source software"},{inline:!1,label:"Kubernetes",permalink:"/personal-blog/blog/tags/kubernetes",description:"Container orchestration platform for automating application deployment, scaling, and management"},{inline:!1,label:"GitOps",permalink:"/personal-blog/blog/tags/gitops",description:"Operational framework that uses Git as a single source of truth for declarative infrastructure and applications"},{inline:!1,label:"DevOps",permalink:"/personal-blog/blog/tags/devops",description:"Set of practices that combines software development and IT operations"},{inline:!1,label:"2024",permalink:"/personal-blog/blog/tags/2024",description:"The year the post went online"}],readingTime:10.415,hasTruncateMarker:!0,authors:[{name:"Eleni Grosdouli",title:"DevOps Consulting Engineer at Cisco Systems",url:"https://github.com/egrosdou01",imageURL:"https://github.com/egrosdou01.png",key:"egrosdou01"}],frontMatter:{slug:"cilium-cluster-mesh-rke2",title:"Cilium Cluster Mesh on RKE2",authors:["egrosdou01"],date:"2024-07-18T00:00:00.000Z",tags:["cilium","rke2","open-source","kubernetes","gitops","devops","2024"]},unlisted:!1,prevItem:{title:"Rancher RKE2 Cluster on Azure",permalink:"/personal-blog/blog/rancher-rke2-cilium-azure"},nextItem:{title:"Cilium on EKS with Sveltos",permalink:"/personal-blog/blog/cilium-eks-sveltos"}},a={authorsImageUrls:[void 0]},c=[{value:"Introduction",id:"introduction",level:2}];function u(e){const t={a:"a",code:"code",h2:"h2",p:"p",strong:"strong",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,o.jsxs)(t.p,{children:["After spending some time working with the on-prem ",(0,o.jsx)(t.a,{href:"https://docs.rke2.io/",children:"RKE2"})," lab setup, I came to notice a couple of issues while forming in an automated fashion the ",(0,o.jsx)(t.a,{href:"https://docs.cilium.io/en/stable/network/clustermesh/clustermesh/",children:"Cilium cluster mesh"})," between on-prem clusters."]}),"\n",(0,o.jsxs)(t.p,{children:["In today's post, we will go through the step-by-step process of forming a ",(0,o.jsx)(t.strong,{children:"Cilium Cluster Mesh"})," and explain any issues that might have arisen by following the ",(0,o.jsx)(t.strong,{children:"GitOps"})," approach. The cilium CLI will not be required. The deployment will be performed primarily via ",(0,o.jsx)(t.code,{children:"Helm"})," and ",(0,o.jsx)(t.code,{children:"kubectl"}),"."]})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>l});var o=n(6540);const i={},s=o.createContext(i);function r(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);