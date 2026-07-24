---
title: "CruiseBench: A Real-Flight-Aligned N-CMAPSS Benchmark for Engine RUL Prediction"
originalUrl: "https://arxiv.org/abs/2607.19380"
date: "2026-07-24T00:08:51.308Z"
---

# CruiseBench: A Real-Flight-Aligned N-CMAPSS Benchmark for Engine RUL Prediction  
CruiseBench：一种与真实飞行对齐的N-CMAPSS发动机剩余使用寿命预测基准

**Authors:** Pu Cheng, Qiang Miao  
**作者：** 程朴， 苗强

Remaining useful life (RUL) prediction estimates how long an engine can continue safe operation and is central to maintenance planning. N-CMAPSS extends C-MAPSS by simulating run-to-failure aero-engine trajectories using recorded real-flight profiles and retaining complete within-flight time series rather than cycle-level snapshots.  
剩余使用寿命（RUL）预测估计发动机能够继续安全运行的时间，是维护规划的核心。N-CMAPSS通过使用记录的真实飞行剖面模拟失效前航空发动机轨迹，并保留完整的飞行内时间序列而非循环级快照，扩展了C-MAPSS。

However, this added realism reduces evaluation control because full-flight records increase data volume and entangle degradation cues with operating-regime variation, complicating preprocessing choices and direct comparisons of RUL modeling performance.  
然而，这种增加的现实性降低了评估控制，因为完整飞行记录增加了数据量，并将退化信号与运行状态变化交织在一起，使预处理选择和RUL建模性能的直接比较变得复杂。

To mitigate this issue, this paper proposes CruiseBench, a cruise-stage RUL benchmark derived from N-CMAPSS. It introduces CPM-N-CMAPSS (Cruising-Period Mask for N-CMAPSS), a mask artifact that stores cycle-local cruising intervals identified by the common-altitude method for the nine accessible subdatasets.  
为缓解此问题，本文提出了CruiseBench，一个源自N-CMAPSS的巡航阶段RUL基准。它引入了CPM-N-CMAPSS（N-CMAPSS的巡航期掩码），一种存储通过共同高度方法在九个可访问子数据集中识别的循环本地巡航间隔的掩码工件。

CruiseBench applies a fixed protocol to the masked rows, using scenario descriptors and measured sensors as inputs while excluding virtual sensors, health parameters, and auxiliary metadata from the feature tensor, preserving native-resolution windows, and applying dataset-wise RUL caps.  
CruiseBench对掩码行应用固定协议，使用场景描述符和测量传感器作为输入，同时从特征张量中排除虚拟传感器、健康参数和辅助元数据，保留原生分辨率窗口，并应用数据集范围的RUL上限。

Experiments with LSTM, GRU, TCN, and TSMixer provide baseline results for this setting. Under CruiseBench-eta5-W256-S10, TSMixer obtains the lowest average RMSE, $3.4\pm1.71$, and Saxena score, $(2.50\pm2.99)\times 10^{4}$. Ablation studies show that flight-stage selection, temporal downscaling method, and RUL-cap threshold affect reported results.  
使用LSTM、GRU、TCN和TSMixer的实验为该设置提供了基线结果。在CruiseBench-eta5-W256-S10下，TSMixer获得了最低的平均RMSE，$3.4\pm1.71$，和Saxena分数，$(2.50\pm2.99)\times 10^{4}$。消融研究表明，飞行阶段选择、时间降尺度方法和RUL上限阈值会影响报告的结果。

With its fixed cruise-stage protocol, CruiseBench provides a reproducible sub-benchmark for controlled RUL model comparison and CPM-N-CMAPSS provides a stage-specific data foundation for future transfer-learning and domain-adaptation studies.  
凭借其固定的巡航阶段协议，CruiseBench为受控RUL模型比较提供了可重复的子基准，而CPM-N-CMAPSS为未来的迁移学习和域适应研究提供了阶段特定的数据基础。