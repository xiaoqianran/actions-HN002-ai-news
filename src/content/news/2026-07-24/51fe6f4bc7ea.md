---
title: "Building Fast, Evaluating Slow: Pipeline Choices Dominate Autointerpretability Score Variance"
originalUrl: "https://arxiv.org/abs/2607.19386"
date: "2026-07-24T00:10:36.482Z"
---

**Title:** Building Fast, Evaluating Slow: Pipeline Choices Dominate Autointerpretability Score Variance  
**标题：** 构建快速，评估缓慢：管道选择主导自动可解释性分数方差  

**Authors:** Sinie van der Ben, Neele Roch, Anna Hedström, Mennatallah El-Assady  
**作者：** Sinie van der Ben, Neele Roch, Anna Hedström, Mennatallah El-Assady  

Cross-paper comparison of sparse autoencoder (SAE) interpretability often relies on autointerpretability scores. In this evaluation pipeline, a language model (LM) explains each feature, and another LM scores the explanation. For these comparisons to be meaningful, scores must reflect stable properties of the features rather than confounding aspects of the evaluation pipeline.  
跨论文比较稀疏自编码器（SAE）的可解释性通常依赖于自动可解释性分数。在此评估管道中，一个语言模型（LM）解释每个特征，另一个LM对解释进行评分。为了使这些比较有意义，分数必须反映特征的稳定属性，而不是评估管道中的混淆因素。  

Through systematic experiments across four metrics (simulation, detection, fuzzing, purity), two models (Pythia-160M, Apertus-8B), and four axes of methodological variation, we show that this assumption does not hold.  
通过系统实验，涵盖四个指标（模拟、检测、模糊测试、纯度）、两个模型（Pythia-160M、Apertus-8B）和四个方法学变化轴，我们表明这一假设不成立。  

Specifically, we find that R1) methodological variance collectively exceeds architectural variance across all metrics and tested models; R2) each metric exhibits a distinct instability profile, with detection being the most stable and fuzzing unreliable across all conditions; R3) top-k feature rankings do not stay consistent across corpus and draw conditions, masking per-feature instability behind stable mean scores; a failure that cannot be detected by monitoring explanation similarity alone.  
具体而言，我们发现：R1）方法学方差总体超过架构方差，且在所有指标和测试模型中均如此；R2）每个指标表现出不同的不稳定性特征，其中检测最稳定，而模糊测试在所有条件下均不可靠；R3）前k特征排名在语料库和绘制条件下不一致，稳定的平均分数掩盖了每个特征的不稳定性；仅通过监控解释相似性无法检测到这一失败。  

These findings suggest that cross-paper comparisons based on autointerpretability scores may reflect pipeline differences rather than architectural differences, with implications for the ongoing debate on SAE utility. More broadly, unreliable evaluation slows progress in interpretability research at a time when reliable tools for understanding AI systems are needed.  
这些发现表明，基于自动可解释性分数的跨论文比较可能反映管道差异而非架构差异，这对关于SAE效用的持续辩论有影响。更广泛地说，在需要可靠工具来理解AI系统的时候，不可靠的评估拖慢了可解释性研究的进展。  

To support evaluation, we contribute a variance decomposition approach, a Stability Check, and a Minimum Reporting Checklist.  
为支持评估，我们贡献了方差分解方法、稳定性检查和最低报告清单。  

**Subjects:** Machine Learning (cs.LG); Computation and Language (cs.CL)  
**主题：** 机器学习 (cs.LG); 计算与语言 (cs.CL)  

**Cite as:** arXiv:2607.19386 [cs.LG]  
**引用：** arXiv:2607.19386 [cs.LG]