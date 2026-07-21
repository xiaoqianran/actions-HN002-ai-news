---
title: "SpecLA: Efficient Speculative Decoding for Linear-Attention Models"
originalUrl: "https://arxiv.org/abs/2607.16673"
date: "2026-07-21T22:49:36.018Z"
---

**SpecLA: Efficient Speculative Decoding for Linear-Attention Models**  
**SpecLA：面向线性注意力模型的高效推测解码**

**Authors:** Zhibin Wang, Xuying Han, Zhaohua Yang, Fuliang Liu, Xue Li, Rong Gu, Sheng Zhong, Chen Tian  
**作者：** 王志斌、韩旭颖、杨钊华、刘福亮、李雪、宫荣、钟晟、田琛

**Abstract:** Linear-attention models replace the growing KV cache with recurrent states, but autoregressive decoding still reads, updates, and writes these states one token at a time. Speculative decoding can reduce this cost by verifying several draft tokens in one target pass, yet existing speculative systems are designed for Transformer KV caches. For stateful linear-attention targets, verification must follow recurrent dependencies across chains and branches, acceptance must update only the accepted state trajectory, and the drafter must avoid submitting candidates that waste stateful verification work. This paper presents SpecLA, a speculative decoding runtime for stateful linear-attention models. SpecLA verifies chains and trees with topology-aware kernels, stores compact factors produced during verification to recover accepted states, and uses confidence pruning plus a target-aligned EAGLE-style drafter to feed useful candidates to the verifier. On an NVIDIA H100 with a public GDN-1.3B target, SpecLA achieves up to 1.70x end-to-end speedup over autoregressive decoding.  
**摘要：** 线性注意力模型用循环状态替代不断增长的KV缓存，但自回归解码仍需要逐个token地读取、更新和写入这些状态。推测解码可通过在单次目标传递中验证多个草稿token来降低这一开销，然而现有推测系统均针对Transformer的KV缓存设计。对于有状态的线性注意力目标模型，验证必须遵循跨链和分支的循环依赖，接受操作仅需更新被接受的状态轨迹，且草稿生成器必须避免提交会浪费有状态验证工作的候选token。本文提出SpecLA，一个面向有状态线性注意力模型的推测解码运行时。SpecLA通过拓扑感知内核验证链和树，存储验证过程中产生的紧凑因子以恢复被接受的状态，并利用置信度剪枝与目标对齐的EAGLE风格草稿生成器，向验证器提供有用的候选token。在NVIDIA H100上使用公开的GDN-1.3B目标模型，SpecLA实现了相比自回归解码最高1.70倍的整体加速。

**Subjects:** Computation and Language (cs.CL)  
**主题：** 计算与语言 (cs.CL)

**Cite as:** arXiv:2607.16673 [cs.CL] (or arXiv:2607.16673v1 [cs.CL] for this version)  
**引用格式：** arXiv:2607.16673 [cs.CL] (或本文版本使用 arXiv:2607.16673v1 [cs.CL])

**https://doi.org/10.48550/arXiv.2607.16673**  
**https://doi.org/10.48550/arXiv.2607.16673**

**Submission history**  
**提交历史**  
From: Fuliang Liu [view email]  
**来自：** 刘福亮 [查看邮件]  
[v1] Sat, 18 Jul 2026 07:08:19 UTC (6,576 KB)  
**[v1] 2026年7月18日 星期六 07:08:19 UTC (6,576 KB)**