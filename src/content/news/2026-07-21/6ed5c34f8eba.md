---
title: "SkillCorpus: Consolidating and Evaluating the Open Skill Ecosystem for Real-World LLM Agents"
originalUrl: "https://arxiv.org/abs/2607.15557"
date: "2026-07-20T23:00:35.027Z"
---

# SkillCorpus: Consolidating and Evaluating the Open Skill Ecosystem for Real-World LLM Agents

**SkillCorpus：整合与评估面向真实世界大语言模型智能体的开放技能生态系统**

**Authors:** Yanze Wang, Pengfei Yao, Tianyi Sun, Chuanrui Hu, Yan Xiao, Yunyun Han, Jun Sun, Yafeng Deng

**作者：** 王延泽、姚鹏飞、孙天翼、胡川瑞、肖岩、韩云云、孙骏、邓亚锋

---

**Abstract:** Agent skills, i.e., files that package reusable procedural knowledge for an LLM agent, are a popular mechanism for extending agent capabilities. Public repositories now host them in large and growing numbers, yet these artifacts are fragmented, redundant, and uneven in quality, and their value in practice is unclear. A core question remains open, namely how to consolidate this open-source skill ecosystem into a single usable corpus, and what bounds its benefit on real-world agent tasks.

**摘要：** 智能体技能（即封装可复用过程性知识的文件，供大语言模型智能体使用）是扩展智能体能力的常用机制。公共代码库现在托管了数量庞大且不断增长的技能，但这些产物是碎片化的、冗余的，且质量参差不齐，其实际价值尚不明确。一个核心问题仍未解决：如何将这一开源技能生态系统整合为一个可用的语料库，以及什么因素限制了其在真实世界智能体任务中的收益。

---

We present SkillCorpus, a framework that aggregates, curates, matches, and evaluates the open skill ecosystem at scale. It filters ~821,000 crawled skills through a multi-stage pipeline into 96,401 skills organised by a 16-class taxonomy and three quality facets (utility, robustness, safety), and pairs them with a fine-tuned retrieval-and-selection stack that matches task-relevant skills.

我们提出了 SkillCorpus 框架，该框架大规模地聚合、策展、匹配和评估开放技能生态系统。它通过一个多阶段流水线从约 821,000 个爬取的技能中筛选出 96,401 个技能，这些技能按 16 类分类法和三个质量维度（实用性、鲁棒性、安全性）进行组织，并与一个经过微调的检索-选择堆栈配对，以匹配与任务相关的技能。

---

We evaluate end-to-end across three benchmarks (SkillsBench, GDPVal, QwenClawBench), two harnesses, and two open backbones with a frontier robustness check. Integrating SkillCorpus yields consistent gains across all three benchmarks, largest on SkillsBench (+7.5 pp). An operational analysis traces the gains to a coverage boundary and a harness boundary.

我们在三个基准测试（SkillsBench、GDPVal、QwenClawBench）、两个测试框架和两个开源骨干模型上进行了端到端评估，并进行了前沿鲁棒性检查。集成 SkillCorpus 在所有三个基准测试中都带来了持续的性能提升，在 SkillsBench 上提升最大（+7.5 个百分点）。一项操作分析将收益归因于覆盖边界和测试框架边界。

---

SkillCorpus is, to our knowledge, the first end-to-end account of when a curated, retrieval-served community corpus improves real agent tasks, and where it does not. The dataset, models, and code will be released upon acceptance.

据我们所知，SkillCorpus 是首个对经过策展、通过检索服务的社区语料库在何时、何地能改善真实智能体任务进行端到端说明的工作。数据集、模型和代码将在论文被接受后发布。

---

**Subjects:** Computation and Language (cs.CL)  
**主题：** 计算与语言 (cs.CL)

**Cite as:** arXiv:2607.15557 [cs.CL] (or arXiv:2607.15557v1 [cs.CL] for this version)  
**引用格式：** arXiv:2607.15557 [cs.CL] (或本文版本使用 arXiv:2607.15557v1 [cs.CL])

**https://doi.org/10.48550/arXiv.2607.15557**  
**提交历史：** 来自 王延泽 [查看邮件] [v1] 2026年7月17日 星期五 01:55:17 UTC (1,458 KB)