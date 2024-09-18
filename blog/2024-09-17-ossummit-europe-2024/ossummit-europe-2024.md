---
slug: ossummit-europe-2024
title: "OSSummit Europe 2024"
authors: [egrosdou01]
date: 2024-09-17
tags: [conference,open-source,kubernetes,gitops,devops,"2024"]
---

## Introduction

[Sveltos](https://github.com/projectsveltos) is on tour! A non-technical post describing my experience at the [OSSummit Europe 2024](https://events.linuxfoundation.org/open-source-summit-europe/). Apart from outlining my experience, the post will include useful resources on the open-source projects I learned during this event.

About Sveltos, Gianluca Mardente and I had the chance to talk at the conference and present Sveltos and how it can be used to deploy and manage different Kubernetes applications and add-ons in a Multi-Cloud setup.

In the sections below, I will outline my highlights of the conference and what I have learned, while later on, I will describe what we presented about Sveltos and where to locate the required resources.

![title image reading "OSSummit Europe 2024"](ossummit_europe_2024.jpg)

<!--truncate-->

## OSSummit - Day 1

As with any other conference, the day started with the registration, badge pick-up and familiariasation with the location. Of course, coffee was widely avaibale in almost every place of the conference!

![title image reading "Coffee Trap"](https://www.reddit.com/r/coffeelife/comments/1b7pmnp/funny_coffee_meme/#lightbox)

Taking a quick look at the keynotes of Day 1, find below my personal highlights alongside the resources for further information on respective topics.

- [Linux Foundation, CNCF, Unified Patents - partnership expansion](https://www.linuxfoundation.org/press/linux-foundation-and-cncf-expand-partnership-with-unified-patents-to-defend-open-source-software-from-non-practicing-entities)
- [Linux Foundation, Valkey 8.0](https://www.prnewswire.com/news-releases/announcing-valkey-8-0--302248447.html)
- [Developer Relations Foundation Announcement](https://github.com/DevRel-Foundation)
- [Open Source Innovation in Artificial Intelligence and Data](https://lfaidata.foundation/)
- [The Linux Foundation Europe](https://linuxfoundation.eu/)

Moving to technical topics, there was an announcement about the formation of the [Opensearch Software foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-opensearch-software-foundation-to-foster-open-collaboration-in-search-and-analytics). Basically, AWS decided to move OpenSearch to the Linux Foundation. OpenSearch is a community-driven, Apache 2.0-licensed open source search and analytics suite that makes it easy to ingest, search, visualize, and analyze data.

### OpenSearch - Resources

- [GitHub](https://github.com/opensearch-project)
- [OpenSearch Playground](https://playground.opensearch.org/app/home)

Apart from that, I was introduced to [cdk8s](https://cdk8s.io/) which is an open-source software development framework for defining Kubernetes applications and reusable abstractions using familiar programming languages and rich object-oriented APIs. It synthesizes applications into standard Kubernetes manifests files.

### cdk8s - Resources

- [GitHub](https://github.com/cdk8s-team/cdk8s)
- [cdk8s Documentation](https://cdk8s.io/docs/latest/)

## OSSummit - Day 2

Day 2 involced topics around secure supply chain consumption with existing frameworks, how to be compliant in a cloud native landscape while ways to perform Policy as Code.

### Frameworks

- [Secure Supply Chain Consumption Framework (S2C2F)](https://github.com/ossf/s2c2f)
- [SLSA](https://slsa.dev/)

### Container Image Patch Tools

- [COPA](https://github.com/project-copacetic/copacetic)

COPA is an open-source tool written in Go that allows DevSecOps engineers to directly patch container images given vulnerability scanning results from popular tools.

### Supply Chain Control Plane

- [Chainloop](https://github.com/chainloop-dev/chainloop)

Chainloop is an open-source project I found out while crowling at the booth. Chainloop provides a single source of truth for **metadata** and **artifacts**, plus a declarative attestation process. We can declaratively state the pieces of evidence and artifact expectations for different CI/CD pipelines.

During the end of the day, had the chance to learn more about [Zypher](https://github.com/zephyrproject-rtos/zephyr/tree/main) while attended interactive sessions about IoT development.

Finally, if you have an interest in open-source research checkout [TODO](https://todogroup.org/) and [LERO/CURIOOS](https://lero.ie/) initialives along side the [opensource.net](https://opensource.net) website.

## OSSummit - Day 3

Day 3 started with a group talk on Kernel development and how development looks like with RUST. I found interesting the talk from Paolo blabla who talked about the European citizen wallet and what they want to achieve with the use of open-source while getting help from the community.


## OSSummit - Sveltos

For the conference, we decided to demonstrate how Sveltos can be used to deploy and manage the Container Network Interface (CNI) lifecycle on a fleet of clusters with one manifest file while enabling Cilium Hubble for Network observability. In the second part of the presentation, we demonstrated how to create another set of manifest files to deploy Kyverno and specific cluster policies down the clusters based on their scope.

### Diagram

![title image reading "OSSummit Europe 2024 - Sveltos Diagram"](ossummit_europe_diagram.jpg)

### Git Repository

The Git repository with the manifest files and the execution instructions are located [here](https://github.com/egrosdou01/OSSummit_2024).

## Conclusions

I had a great fun at the conference! Not only had the chance to present alongside Gianluca Mardente, but also met many cloud native enthusiasts.

Till next August 2025!

![title image reading "OSSummit Europe 2025"](ossummit_europe_2025.jpg)

It's a wrap for this post! 🎉 Thanks for reading! Stay tuned for more exciting updates!