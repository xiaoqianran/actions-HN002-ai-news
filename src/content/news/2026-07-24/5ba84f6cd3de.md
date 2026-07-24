---
title: "Synthetic and Derived Training Images for Campus Waste Detection: A Multi-Seed Evaluation with YOLOv8n"
originalUrl: "https://arxiv.org/abs/2607.19535"
date: "2026-07-24T00:14:00.240Z"
---

Title: Synthetic and Derived Training Images for Campus Waste Detection: A Multi-Seed Evaluation with YOLOv8n  
标题：用于校园垃圾检测的合成与衍生训练图像：基于YOLOv8n的多种子评估

Authors: Ali Behbahani, Newsha Javanmardi, Shahriar Ahmed, Ling Chen, Phouvadeth Vathana  
作者：阿里·贝赫巴尼（Ali Behbahani）、纽莎·贾万马尔迪（Newsha Javanmardi）、沙赫里亚尔·艾哈迈德（Shahriar Ahmed）、陈凌（Ling Chen）、帕乌瓦德·瓦塔纳（Phouvadeth Vathana）

Abstract: Incorrect disposal can contaminate campus recycling streams, and a bin-mounted camera could provide feedback as an item is discarded. We evaluated whether synthetic and derived images improve a YOLOv8n detector for this view. The real dataset contained 148 campus photographs: 86 for training, 31 for validation, and 31 for testing. Twelve joint-training configurations varied the amount and source of added images. We repeated seven principal settings with four matched seeds and computed bootstrap percentile intervals over those seeds. The real-only model reached a mean mAP@0.5 of 0.691 [0.665, 0.722]. Background replacement reduced the mean to 0.560 [0.499, 0.619], isolated-object images gave 0.680 [0.644, 0.724], and the full augmentation pool gave 0.487 [0.438, 0.537]. We also tested hand-and-forearm composites because every real photo showed a held object. Two cutouts in the initial composite set came from test photographs, so we discarded that experiment, rebuilt the set with training-split cutouts, and reran all four seeds. The corrected paired difference was +0.034 [-0.063, 0.199], which does not support a reliable hand-composite effect. Single-seed transfer experiments produced source-dependent rankings between joint mixing and sequential pretraining. None of the evaluated configurations exceeded the real-only baseline. The reported intervals quantify seed variation; the 31-photo test set remains too small for strong class-specific conclusions.  
摘要：不当处理可能会污染校园回收流，而安装在垃圾桶上的摄像头可以在丢弃物品时提供反馈。我们评估了合成和衍生图像是否改善了该视角下的YOLOv8n检测器。真实数据集包含148张校园照片：86张用于训练，31张用于验证，31张用于测试。十二种联合训练配置改变了添加图像的数量和来源。我们使用四个匹配的种子重复了七种主要设置，并计算了这些种子的引导百分位区间。仅使用真实数据的模型达到了0.691 [0.665, 0.722]的平均mAP@0.5。背景替换将平均值降至0.560 [0.499, 0.619]，孤立对象图像给出0.680 [0.644, 0.724]，而完整增强池给出0.487 [0.438, 0.537]。我们还测试了手和前臂合成图，因为每张真实照片都显示了一个手持物体。初始合成集中的两个剪切图来自测试照片，因此我们丢弃了该实验，使用训练集分割的剪切图重建了集合，并重新运行了所有四个种子。校正后的配对差异为+0.034 [-0.063, 0.199]，这并不支持可靠的手部合成效果。单种子迁移实验产生了联合混合和顺序预训练之间依赖于来源的排名。没有任何评估的配置超过了仅使用真实数据的基线。报告的区间量化了种子变异；31张照片的测试集对于强烈的类特定结论来说仍然太小。