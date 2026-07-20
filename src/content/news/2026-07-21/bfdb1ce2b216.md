---
title: "Unsupervised Keypoints for Real-Time Fall Detection: Comparative Analysis Under Real-world Conditions with Predictive Bandwidth Reduction"
originalUrl: "https://arxiv.org/abs/2607.15400"
date: "2026-07-20T23:24:26.865Z"
---

# Unsupervised Keypoints for Real-Time Fall Detection: Comparative Analysis Under Real-world Conditions with Predictive Bandwidth Reduction  
# 无监督关键点实现实时跌倒检测：在真实条件下结合预测带宽缩减的对比分析

**Authors:** Tasmiah Haque, Jacob Kosinski, Sumit Mohan, Srinjoy Das, Mohammad Abdullah Al-Mamun  
**作者：** 塔斯米亚·哈克、雅各布·科辛斯基、苏米特·莫汉、斯里尼乔伊·达斯、穆罕默德·阿卜杜拉·阿尔-马蒙

**Abstract:**  
**摘要：**

Falls among older adults are a major safety challenge, but continuous monitoring is difficult to sustain. Video captures fall-related posture and motion, yet deployment is limited by privacy, computation, and bandwidth.  
老年人跌倒是一项重大安全挑战，但持续监控难以维持。视频能捕捉跌倒相关的姿态和运动，但其部署受隐私、计算和带宽限制。

Supervised pose estimation is anatomically interpretable but vulnerable to occlusion and partial body visibility.  
有监督姿态估计具有解剖学可解释性，但易受遮挡和身体部分不可见的影响。

We propose a privacy-preserving framework that replaces RGB transmission with compact motion representations based on unsupervised keypoints and predictive temporal modeling.  
我们提出一个隐私保护框架，用基于无监督关键点和预测时序建模的紧凑运动表示替代RGB传输。

Local processing performs segmentation and keypoint extraction; variational recurrent prediction and sequence classification then detect falls from observed and forecasted motion.  
本地处理执行分割和关键点提取；随后通过变分循环预测和序列分类，从观测和预测的运动中检测跌倒。

We evaluate the framework on the UR Fall Detection and Human Fall datasets using random, subject-disjoint, and occlusion-based splits.  
我们在UR跌倒检测和Human Fall数据集上，使用随机划分、受试者独立划分和基于遮挡的划分对该框架进行评估。

Under random splits, neither representation consistently dominates, suggesting that standard protocols may hide meaningful differences.  
在随机划分下，两种表示均未持续占优，表明标准协议可能掩盖了有意义的差异。

Under subject-disjoint evaluation, supervised keypoints show a statistically significant advantage, but performance varies by subject: they perform better when anatomical landmarks are visible, whereas unsupervised keypoints are more robust to occlusion and partial visibility, though they produce more false positives for复杂活动。  
在受试者独立评估中，有监督关键点显示出统计显著优势，但性能因受试者而异：当解剖标志可见时表现更好，而无监督关键点对遮挡和部分可见性更鲁棒，尽管它们对复杂活动会产生更多误报。

Under occlusion-based evaluation, supervised keypoints miss nearly half of all falls, while unsupervised keypoints retain strong sensitivity and substantially outperform them.  
在基于遮挡的评估中，有监督关键点错过了近一半的跌倒，而无监督关键点保持了高灵敏度并显著优于它们。

Their anatomical independence allows spatial anchors to adapt to visible body structure rather than fail on absent landmarks.  
其解剖学独立性使空间锚点能适应可见的身体结构，而非因缺失标志点而失效。

The gap widens under bandwidth constraints, where supervised localization errors compound through the temporal model.  
在带宽限制下，差距进一步扩大，因为有监督定位误差在时序模型中会累积。

These findings show that representation choice should reflect expected visual conditions and that unsupervised keypoints offer an advantage when body visibility is compromised.  
这些发现表明，表示方法的选择应反映预期的视觉条件，且当身体可见性受损时，无监督关键点具有优势。

**Subjects:** Computer Vision and Pattern Recognition (cs.CV); Machine Learning (cs.LG)  
**主题：** 计算机视觉与模式识别 (cs.CV)；机器学习 (cs.LG)

**Cite as:** arXiv:2607.15400 [cs.CV] (or arXiv:2607.15400v1 [cs.CV] for this version)  
**引用为：** arXiv:2607.15400 [cs.CV]（或本文版本使用 arXiv:2607.15400v1 [cs.CV]）