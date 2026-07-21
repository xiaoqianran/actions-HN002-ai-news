---
title: "From Memory to Skills: Evidence-Grounded Co-Evolution Governance for Long-Horizon LLM Agents"
originalUrl: "https://arxiv.org/abs/2607.16621"
date: "2026-07-21T22:48:36.450Z"
---

**Title:** From Memory to Skills: Evidence-Grounded Co-Evolution Governance for Long-Horizon LLM Agents  
**标题：** 从记忆到技能：面向长周期LLM智能体的证据驱动协同演化治理

**Authors:** Bo Tang, Yang Zhang, Guomian Zhuang, Wenqiang Wei, Gaoyang Zheng, Lindong Xie, Yanchao Tan, Feiyu Xiong, Qingyu Yang, Edward Chung, Zhiyu li  
**作者：** Bo Tang, Yang Zhang, Guomian Zhuang, Wenqiang Wei, Gaoyang Zheng, Lindong Xie, Yanchao Tan, Feiyu Xiong, Qingyu Yang, Edward Chung, Zhiyu li

Existing memory systems for long-horizon LLM agents often retrieve prior traces as passive context rather than converting them into executable capabilities.  
现有面向长周期LLM智能体的记忆系统通常将先验轨迹作为被动上下文检索，而非将其转化为可执行的能力。

In this paper, we propose MSCE, a training-free Memory--Skill Co-Evolution framework that organizes agent experience into grounded step traces, reusable procedural policies, and declarative environmental cognition.  
本文提出MSCE，一个无需训练的“记忆-技能协同演化”框架，它将智能体经验组织为具身步骤轨迹、可复用的过程策略和陈述性环境认知。

MSCE crystallizes evidence-backed L2 policies with positive estimated gain into callable skills that retain evidence links, applicability boundaries, decision guidance, verification rules, and reliability estimates.  
MSCE将具有正向估计收益的、基于证据的L2策略结晶化为可调用技能，这些技能保留证据链接、适用性边界、决策指导、验证规则和可靠性估计。

It further introduces reflection-weighted value backfilling, which propagates sparse terminal feedback through dense local self-reflections to produce evidence-calibrated trace values for governing memory and skill evolution.  
它进一步引入了反思加权价值回溯填充，该技术通过密集的局部自我反思来传播稀疏的终端反馈，从而产生证据校准的轨迹价值，以治理记忆和技能的演化。

Experiments on EvoAgentBench and LoCoMo demonstrate that MSCE significantly outperforms state-of-the-art skill-augmented and memory-driven agent baselines, exhibiting strong cross-domain transferability and lifelong-evolution capabilities.  
在EvoAgentBench和LoCoMo上的实验表明，MSCE显著优于最先进的技能增强和内存驱动智能体基线，展现出强大的跨领域迁移能力和终身演化能力。