---
title: "SAAG: Structured Agent Assessment and Grounding"
originalUrl: "https://arxiv.org/abs/2607.18245"
date: "2026-07-22T23:03:55.919Z"
---

**Title:** SAAG: Structured Agent Assessment and Grounding  
**标题：** SAAG：结构化智能体评估与锚定  

**Authors:** Ritvik Garimella, Vedant Khandelwal, Anvi Kohli, Amit Sheth  
**作者：** Ritvik Garimella, Vedant Khandelwal, Anvi Kohli, Amit Sheth  

Exact-match evaluation of agent-calling obscures qualitatively different failure modes: a model may select the right function yet hallucinate argument values, or satisfy a schema while choosing an agent for the wrong reason. Existing benchmarks collapse these distinctions into a single binary score, leaving practitioners unable to diagnose where agent calls fail.  
精确匹配评估会掩盖智能体调用中性质不同的失败模式：模型可能选择了正确的函数，却生成了不存在的参数值；或虽满足模式要求，却因错误原因选择了智能体。现有基准测试将这些差异压缩为单一二元分数，导致从业者无法诊断智能体调用失败的具体环节。  

We propose SAAG, a cascaded diagnostic framework that decomposes agent-calling evaluation into three sequential stages: registry conformance, structural completeness, and argument grounding, each producing interpretable stage-specific diagnostics.  
我们提出 SAAG，一个级联诊断框架，将智能体调用评估分解为三个连续阶段：注册表一致性、结构完整性和参数锚定，每个阶段均生成可解释的阶段性诊断结果。  

These diagnostics additionally enable iterative self-repair: on prediction failure, the stage-specific signal guides targeted correction without leaking ground-truth values.  
这些诊断结果还能支持迭代式自我修复：在预测失败时，阶段性信号可引导针对性修正，且不会泄露真实值。  

We evaluate this framework on a controlled benchmark derived from Glaive's function-calling dataset across registry sizes of 5, 10, and 15 agents using three local sub-4B-parameter models.  
我们在一个源自 Glaive 函数调用数据集的受控基准上评估该框架，注册表规模涵盖 5、10 和 15 个智能体，并使用了三个参数量低于 4B 的本地模型。  

Structured feedback consistently improves argument precision and reduces value hallucination relative to single-pass inference and uninformative binary feedback, while end-to-end F1 gains are modest and model-dependent.  
相较于单次推理和无信息量的二元反馈，结构化反馈持续提升了参数精确度并减少了值幻觉；而端到端 F1 分数提升有限且因模型而异。  

These results suggest that stage-decomposed diagnostic evaluation is a necessary lens for understanding and improving agent-calling reliability across model families and registry scales.  
这些结果表明，阶段分解式诊断评估是理解和提升跨模型家族与注册表规模下智能体调用可靠性的必要视角。