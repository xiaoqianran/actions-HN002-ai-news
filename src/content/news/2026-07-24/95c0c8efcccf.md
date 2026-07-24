---
title: "Multi-Mask Diffusion Language Models for Few-Step Generation"
originalUrl: "https://arxiv.org/abs/2607.19686"
date: "2026-07-23T23:48:14.994Z"
---

**Title: Multi-Mask Diffusion Language Models for Few-Step Generation**  
**标题：用于少步生成的多掩码扩散语言模型**

**Authors:** Sijin Chen, Yinuo Ren, Heyang Zhao, Ziheng Cheng, Quanquan Gu, Lexing Ying  
**作者：** 陈思进、任一诺、赵鹤洋、程子恒、管全全、应乐兴

**Abstract:** Masked diffusion models (MDMs) are a promising family of language generators, but achieving high-quality few-step generation remains challenging. In MDMs, all forward trajectories collapse to a single fully masked state, leaving no terminal entropy for consistency-style few-step generation. While recent few-step alternatives based on uniform-state diffusion avoid this degeneracy, it becomes harder to distinguish clean tokens from noise than MDMs, which usually harms modeling quality and training efficiency. In this work, we propose a multi-mask diffusion model (MultiMDM) that preserves the masking structure towards few-step generation. In the forward process, each clean token is first pushed towards a designated mask and then gradually mixes over the mask set. As a result, the backward process has a drafting capability by predicting a designated mask before refining to a clean token. We derive a closed-form ELBO training objective for MultiMDM that supports continual training from pretrained MDMs. In addition, we formulate a purely discrete-state consistency distillation scheme, with a shared-Gumbel coupling to reduce pathwise entropy. Experiments on pretraining and distillation show that MultiMDM provides an effective foundation for principled few-step generation.  
**摘要：** 掩码扩散模型（MDM）是一类有前景的语言生成器，但实现高质量的少步生成仍具有挑战性。在MDM中，所有前向轨迹会坍缩至单一的完全掩码状态，导致缺乏终端熵，无法进行一致性风格的少步生成。虽然近期基于均匀状态扩散的少步替代方法避免了这种退化，但相比MDM，它们更难区分干净token与噪声，这通常会损害建模质量和训练效率。在本工作中，我们提出了一个多掩码扩散模型（MultiMDM），它保留了掩码结构以支持少步生成。在前向过程中，每个干净token首先被推向一个指定掩码，然后逐渐在掩码集合中混合。因此，反向过程具有草稿能力——在精炼为干净token之前先预测一个指定掩码。我们为MultiMDM推导了一个闭式ELBO训练目标，支持从预训练MDM进行持续训练。此外，我们制定了一个纯离散状态的一致性蒸馏方案，采用共享Gumbel耦合来降低路径熵。预训练和蒸馏实验表明，MultiMDM为原则性的少步生成提供了有效基础。

**Comments:** Subjects: Computation and Language (cs.CL); Machine Learning (cs.LG)  
**评论：** 主题：计算与语言（cs.CL）；机器学习（cs.LG）

**Cite as:** arXiv:2607.19686 [cs.CL] (or arXiv:2607.19686v1 [cs.CL] for this version)  
**引用为：** arXiv:2607.19686 [cs.CL]（或本文版本使用 arXiv:2607.19686v1 [cs.CL]）

**https://doi.org/10.48550/arXiv.2607.19686**  
**https://doi.org/10.48550/arXiv.2607.19686**

**Submission history**  
**提交历史**  
From: Sijin Chen [view email]  
**来自：** 陈思进 [查看邮件]  
[v1] Wed, 22 Jul 2026 02:35:40 UTC (11,333 KB)  
**[v1] 2026年7月22日 星期三 02:35:40 UTC (11,333 KB)**