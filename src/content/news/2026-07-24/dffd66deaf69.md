---
title: "On the Computational Complexity of Structural Generalization"
originalUrl: "https://arxiv.org/abs/2607.19573"
date: "2026-07-23T23:44:30.528Z"
---

**Title: On the Computational Complexity of Structural Generalization**  
**标题：结构泛化的计算复杂性**

---

Computer Science > Computation and Language arXiv:2607.19573 (cs) [Submitted on 21 Jul 2026]  
计算机科学 > 计算与语言 arXiv:2607.19573 (cs) [提交于 2026年7月21日]

---

Title: On the Computational Complexity of Structural Generalization Authors: Zichao Wei  
标题：结构泛化的计算复杂性 作者：魏子超

---

Abstract: Structural generalization has been measured repeatedly by several benchmarks, yet it has never been formally defined. We give a definition that translates the two premises (compositional structure and unbounded generalization) into mathematical language. The definition itself is neutral: a compiler that hard-codes the rules satisfies it just as well. But structural generalization becomes a scientific question only insofar as the capacity can autonomously emerge from finite data. This question pits the computational lower bound $\mathrm{NC}^1$ against the learnable ceiling $\mathrm{TC}^0$ of pure Transformers. Under a Montagovian instantiation, each compositional rule splits into two projections: a syntactic face ($F_\gamma$) and a semantic face ($G_\gamma$). Tree evaluation on the $G_\gamma$ side is an instantiation of BFVP, which is $\mathrm{NC}^1$-complete (Buss, 1987). A pure Transformer must learn both faces at once, but Kraus et al. (2026) prove that its learnable class $\subseteq \mathrm{TC}^0$. Under the standard assumption $\mathrm{TC}^0 \neq \mathrm{NC}^1$, a pure Transformer cannot learn structural generalization. Neuro-symbolic systems achieve the best benchmark scores precisely because they inject $G_\gamma$, sidestepping the genuinely hard half. Benchmark scores cannot distinguish "learned" from "given." This is what this paper sets out to make clear.  
摘要：结构泛化已被多个基准测试反复测量，但从未被正式定义。我们给出一个定义，将两个前提（组合结构和无界泛化）转化为数学语言。该定义本身是中性的：一个硬编码规则的编译器同样满足它。但结构泛化只有当能力能够从有限数据中自主出现时，才成为一个科学问题。这个问题将计算下界 $\mathrm{NC}^1$ 与纯 Transformer 的可学习上限 $\mathrm{TC}^0$ 对立起来。在蒙塔古式实例化下，每个组合规则分裂为两个投影：句法面（$F_\gamma$）和语义面（$G_\gamma$）。$G_\gamma$ 侧的树评估是 BFVP 的实例化，而 BFVP 是 $\mathrm{NC}^1$-完全问题（Buss, 1987）。纯 Transformer 必须同时学习两个面，但 Kraus 等人（2026）证明其可学习类 $\subseteq \mathrm{TC}^0$。在标准假设 $\mathrm{TC}^0 \neq \mathrm{NC}^1$ 下，纯 Transformer 无法学习结构泛化。神经符号系统之所以取得最佳基准分数，正是因为它们注入了 $G_\gamma$，避开了真正困难的一半。基准分数无法区分“学到的”和“给定的”。这正是本文旨在阐明的。

---

Subjects: Computation and Language (cs.CL); Machine Learning (cs.LG)  
主题：计算与语言 (cs.CL)；机器学习 (cs.LG)

---

Cite as: arXiv:2607.19573 [cs.CL] (or arXiv:2607.19573v1 [cs.CL] for this version)  
引用为：arXiv:2607.19573 [cs.CL]（或本文本版本为 arXiv:2607.19573v1 [cs.CL]）