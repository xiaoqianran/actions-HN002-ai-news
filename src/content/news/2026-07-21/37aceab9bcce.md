---
title: "Do Coding Agents Need Executable World Models, Simplification, and Verification to Solve ARC-AGI-3?"
originalUrl: "https://arxiv.org/abs/2607.15439"
date: "2026-07-20T22:57:55.445Z"
---

**Title:** Do Coding Agents Need Executable World Models, Simplification, and Verification to Solve ARC-AGI-3?  
编码代理需要可执行世界模型、简化和验证来解决 ARC-AGI-3 吗？

**Content:**  
我们之前用于 ARC-AGI-3 的代理捆绑了可执行世界建模、计划简化和精确回放验证，但其性能主要归因于哪个设计仍不明确。为解答这一归因问题，我们构建了四个嵌套的 Codex 代理：一个纯文本基线；一个无回放验证的灵活接口可执行世界模型；同一可执行模型附加计划简化；以及一个固定接口验证方案，保留简化但要求精确复现记录观测。主研究使用 gpt-5.4 和 gpt-5.5 在高低两种推理强度下，评估所有四个代理在公开 ARC-AGI-3 游戏上的表现。探索性后续测试则使用 gpt-5.6-sol 在超高和最大推理强度下评估文本和验证变体。最稳健的结论是：**每个代理变体均随模型增强和推理强度提升而改善**。在同一模型-强度组合内，变体间差异小于预期，而各组件的效果随设置变化。要求持久化可执行交付物并非普遍有益：在 gpt-5.5 的两种设置中，文本变体均优于灵活接口可执行变体。简化在四个模型-强度设置中的三个提升性能，仅最弱设置为例外。完整验证方案在所有四个设置中均排名第一，尽管其资源消耗显著更高。在 gpt-5.6-sol 后续测试中，验证变体在两种推理强度下完全解决了所有公开游戏，达到约 99% 的 RHAE，且总操作数不足人类基线的一半。由于该模型晚于这些游戏发布，且保留测试性能仍未验证，此结果应仅解读为对公开集的饱和。

**Comments:**  
**Subjects:** Artificial Intelligence (cs.AI)  
**Cite as:** arXiv:2607.15439 [cs.AI] (or arXiv:2607.15439v1 [cs.AI] for this version)  
https://doi.org/10.48550/arXiv.2607.15439