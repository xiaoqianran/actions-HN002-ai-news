---
title: "OpenLanguageModel: Readable and Composable Small-Language-Model Pretraining for Education and Research"
originalUrl: "https://arxiv.org/abs/2607.16669"
date: "2026-07-21T22:49:15.869Z"
---

**Title:** OpenLanguageModel: Readable and Composable Small-Language-Model Pretraining for Education and Research  
**标题：** OpenLanguageModel：面向教育与研究的高可读、可组合的小型语言模型预训练

**Authors:** Tavish Mankash, Vardhaman Kalloli, Keshava Prasad, Deepan Muthirayan  
**作者：** Tavish Mankash、Vardhaman Kalloli、Keshava Prasad、Deepan Muthirayan

OpenLanguageModel (OLM) is an open-source PyTorch library for building and pretraining small language models while keeping their machinery visible.  
OpenLanguageModel（OLM）是一个开源PyTorch库，用于构建和预训练小型语言模型，同时保持其内部机制透明可见。

In OLM, model code reads like the architecture: components are ordinary modules, while Block, Residual, Repeat, and Parallel describe how they are wired.  
在OLM中，模型代码如同架构图一般清晰：组件是普通模块，而Block、Residual、Repeat和Parallel描述了它们的连接方式。

The resulting model can move unchanged from a teaching notebook to a complete pretraining run or a research ablation.  
生成的模型无需修改即可从教学笔记本迁移到完整的预训练运行或研究消融实验。

OLM connects this readable model layer to tokenizers, local and streaming datasets, optimization, mixed precision, callbacks, checkpoints, and hardware-aware CPU, single-GPU, and single-node multi-GPU execution.  
OLM将此可读模型层与分词器、本地和流式数据集、优化、混合精度、回调、检查点以及硬件感知的CPU、单GPU和单节点多GPU执行相连接。

We demonstrate the full path by tracing GPT-2 from diagram to code, launching a FineWeb-Edu training script, replacing one attention component, and letting AutoTrainer configure the available machine.  
我们通过以下方式演示完整路径：从图表到代码追踪GPT-2、启动FineWeb-Edu训练脚本、替换一个注意力组件，并让AutoTrainer配置可用机器。

The package includes 27 presets across nine familiar model families and documentation that progresses from LM fundamentals to architecture research.  
该包包含涵盖九个常见模型家族的27个预设，以及从语言模型基础到架构研究的文档。

Validation shows close agreement with independent reference implementations, 90.6% four-GPU weak-scaling efficiency for a 348M-parameter workload, compact architecture edits, and positive early usability results.  
验证显示与独立参考实现高度一致，3.48亿参数规模工作负载在四GPU上实现90.6%的弱扩展效率，支持简洁的架构修改，并取得积极的早期可用性结果。

OLM is MIT-licensed and available through PyPI, GitHub, and its documentation site.  
OLM采用MIT许可，可通过PyPI、GitHub及其文档站点获取。

**Subjects:** Computation and Language (cs.CL); Machine Learning (cs.LG); Software Engineering (cs.SE)  
**主题：** 计算与语言（cs.CL）；机器学习（cs.LG）；软件工程（cs.SE）

**arXiv ID:** 2607.16669  
**arXiv ID：** 2607.16669

**DOI:** https://doi.org/10.48550/arXiv.2607.16669  
**DOI：** https://doi.org/10.48550/arXiv.2607.16669