---
title: "From Weights to Words: Expressing and Editing Preference Model Inferences in Natural Language"
originalUrl: "https://arxiv.org/abs/2607.16232"
date: "2026-07-21T23:10:50.291Z"
---

### From Weights to Words: Expressing and Editing Preference Model Inferences in Natural Language  
从权重到词汇：用自然语言表达和编辑偏好模型推理  

**Content:**  
Computer Science > Machine Learning arXiv:2607.16232 (cs) [Submitted on 24 Jun 2026]  
Title: From Weights to Words: Expressing and Editing Preference Model Inferences in Natural Language  
Authors: Zachary Wojtowicz, Ayush Nayak, Jacob Andreas  

计算机科学 > 机器学习 arXiv:2607.16232 (cs) [提交于 2026年6月24日]  
标题：从权重到词汇：用自然语言表达和编辑偏好模型推理  
作者：Zachary Wojtowicz, Ayush Nayak, Jacob Andreas  

The growing use of statistical learning algorithms to infer human preferences from high-dimensional choice data runs up against a fundamental challenge: choice alternatives typically differ in many ways simultaneously, so it is generally unclear which factors actually drove an observed decision and should be credited as preferences.  
随着统计学习算法从高维选择数据中推断人类偏好的应用日益增多，一个根本性挑战随之浮现：备选方案通常同时在多方面存在差异，因此通常难以确定哪些因素实际驱动了观察到的决策，并应被视为偏好。  

Compounding this problem, the opacity of these methods leaves human operators unable to inspect, contest, or correct models when they err.  
更复杂的是，这些方法的不透明性使人类操作员在模型出错时无法检查、质疑或纠正它们。  

We introduce \emph{weights to words}, a method that takes a dataset of choice problems as input and automatically discovers a collection of domain-relevant preference dimensions, each described in natural language and paired with a vector in the model's representational space.  
我们引入了\emph{从权重到词汇}（weights to words）方法，该方法以一组选择问题数据集为输入，自动发现一系列与领域相关的偏好维度，每个维度用自然语言描述，并与模型表示空间中的一个向量配对。  

These dimensions address both under-determination and opacity: they can be applied to concentrate attribution on a small set of meaningful factors, and they can externalize the model's inferences in natural language so that users can inspect and edit them in real time.  
这些维度解决了欠确定性和不透明性问题：它们可用于将归因集中于一小部分有意义的因素，并能将模型的推理外化为自然语言，使用户能够实时检查和编辑。  

We first qualitatively illustrate the method's versatility on four diverse domains: moral dilemmas, movies, wines, and free-form LLM responses.  
我们首先在四个不同领域定性展示了该方法的通用性：道德困境、电影、葡萄酒和自由形式的大语言模型响应。  

We then report two pre-registered human-subjects experiments, on moral dilemmas ($N=450$) and movie selection ($N=449$), that demonstrate its benefits for learning preference models: (1) regularizing a preference model toward the learned basis increases prediction accuracy on held-out choices, and (2) incorporating participants' structured edits further improves accuracy.  
然后，我们报告了两项预注册的人类受试者实验，分别涉及道德困境（$N=450$）和电影选择（$N=449$），证明了该方法在学习偏好模型方面的益处：(1) 将偏好模型向学习到的基进行正则化，可提高对保留选择的预测准确性；(2) 纳入参与者的结构化编辑可进一步提升准确性。  

In head-to-head comparisons, participants prefer the method's inferred preference profiles and endorse its predictions as more accurate.  
在直接对比中，参与者更青睐该方法推断的偏好配置文件，并认为其预测更准确。  

Comments: Subjects: Machine Learning (cs.LG); Artificial Intelligence (cs.AI); Computation and Language (cs.CL); Human-Computer Interaction (cs.HC)  
评论：主题：机器学习 (cs.LG)；人工智能 (cs.AI)；计算与语言 (cs.CL)；人机交互 (cs.HC)  

Cite as: arXiv:2607.16232 [cs.LG] (or arXiv:2607.16232v1 [cs.LG] for this version)  
引用为：arXiv:2607.16232 [cs.LG]（或本文版本使用 arXiv:2607.16232v1 [cs.LG]）  

https://doi.org/10.48550/arXiv.2607.16232  
https://doi.org/10.48550/arXiv.2607.16232