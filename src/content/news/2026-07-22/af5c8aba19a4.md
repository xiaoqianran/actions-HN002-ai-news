---
title: "AI Didn't Kill Software Engineering. It Made It More Valuable Than Ever."
originalUrl: "https://dev.to/jlio_csarkdel_6c306c2/ai-didnt-kill-software-engineering-it-made-it-more-valuable-than-ever-4o9n"
date: "2026-07-21T23:04:47.301Z"
---

**Title: AI Didn't Kill Software Engineering. It Made It More Valuable Than Ever.**  
**标题：AI没有杀死软件工程，反而让它变得比以往更有价值。**

---

We've Been Asking the Wrong Question For years the industry asked: "Will AI replace software developers?" Now we know that isn't the right question. The better question is: What becomes valuable when writing code is no longer expensive? That single shift changes software engineering. For decades every major methodology---from Waterfall to Agile, DDD and Clean Architecture---evolved in a world where writing software was expensive. Documentation aged quickly because updating it was costly. Specifications were abandoned because implementation consumed weeks. Generative AI changed that assumption. Writing code is now almost free. Value moved elsewhere.

多年来，行业一直在问一个错误的问题：“AI会取代软件开发者吗？”现在我们知道了，这不是正确的问题。更好的问题是：当编写代码不再昂贵时，什么变得有价值？这一转变改变了软件工程。几十年来，从瀑布模型到敏捷、领域驱动设计（DDD）和整洁架构，所有主要方法论都演进于一个编写软件成本高昂的世界。文档很快过时，因为更新成本太高；需求规格被放弃，因为实现需要数周时间。生成式AI改变了这一假设。编写代码现在几乎免费。价值转移到了别处。

---

Code Is Cheap. Judgment Isn't. Modern LLMs generate hundreds of lines of code in seconds. They do not decide: what should be built; which business rules matter; which edge cases deserve attention; what architectural trade-offs should survive for years. Those remain engineering decisions.

代码很便宜。判断力不是。现代大语言模型能在几秒内生成数百行代码。但它们无法决定：应该构建什么；哪些业务规则重要；哪些边缘情况值得关注；哪些架构权衡应该保留多年。这些仍然是工程决策。

---

The Bottleneck Has Moved Typing is no longer the bottleneck. Thinking is. Specifications. Architecture. Acceptance criteria. Code review. Engineering has become less about producing code and more about producing clarity.

瓶颈已经转移打字不再是瓶颈。思考才是。需求规格。架构。验收标准。代码审查。工程不再关乎产出代码，而在于产出清晰度。

---

Why Vibe Coding Doesn't Scale Chats are a poor long-term source of truth. Every prompt expands the context window. Every correction burns more tokens. Eventually the model reasons about the conversation rather than the software. That is the hidden cost of vibe coding.

为什么“氛围编码”无法扩展聊天是糟糕的长期真相来源。每个提示都会扩展上下文窗口。每次修正都会消耗更多令牌。最终，模型推理的是对话而非软件。这就是“氛围编码”的隐藏成本。

---

Specifications Become the Project Memory That realization led me to write Spec Driven Development. Instead of relying on conversations, every feature starts with a specification, evolves into a plan, becomes executable tasks and only then turns into code. The outcome is straightforward: fewer ambiguities; fewer tokens; less rework; more predictable software.

需求规格成为项目记忆这一认识促使我撰写了《需求驱动开发》。不再依赖对话，每个功能都始于一份需求规格，演变为计划，变为可执行任务，然后才转化为代码。结果很直接：更少的歧义；更少的令牌消耗；更少的返工；更可预测的软件。

---

But Specifications Need Architecture Great specifications cannot rescue a chaotic codebase. Architecture exists to answer one question: Where does this belong? That question inspired FOCUS Architecture. Rather than multiplying layers, it organizes software around four responsibilities: View Orchestrator Use Cases Repository Its purpose isn't novelty. Its purpose is lowering the cost of change. In the AI era that also means smaller context windows, fewer tokens and fewer unintended modifications.

但需求规格需要架构优秀的需求规格无法拯救混乱的代码库。架构的存在是为了回答一个问题：它属于哪里？这个问题催生了FOCUS架构。它不是增加层级，而是围绕四种职责组织软件：视图、协调器、用例、存储库。它的目的不是新奇，而是降低变更成本。在AI时代，这也意味着更小的上下文窗口、更少的令牌和更少的意外修改。

---

Standing on Giants Neither book claims to reinvent software engineering. Both synthesize decades of work from Martin Fowler, Kent Beck, Eric Evans, Bertrand Meyer, Robert C. Martin, Andrew Hunt, David Thomas and many others, reinterpreting timeless ideas for AI-assisted development.

站在巨人肩上两本书都没有声称要重塑软件工程。两者都综合了Martin Fowler、Kent Beck、Eric Evans、Bertrand Meyer、Robert C. Martin、Andrew Hunt、David Thomas等人数十年的工作，为AI辅助开发重新诠释永恒的理念。

---

Two Books. One Goal. Spec Driven Development structures engineering thinking. FOCUS Architecture structures engineering systems. One answers what should be built. The other answers where it belongs. Together they help human engineers and AI agents build software that remains understandable years after it ships.

两本书。一个目标。《需求驱动开发》构建工程思维。FOCUS架构构建工程系统。一个回答应该构建什么。另一个回答它属于哪里。两者共同帮助人类工程师和AI智能体构建在发布多年后仍可理解的软件。

---

Final Thoughts AI made code inexpensive. Engineering became even more valuable. The future won't belong to teams with the best AI. It will belong to teams with the best engineering discipline.

最终思考AI让代码变得廉价。工程变得更有价值。未来不属于拥有最佳AI的团队。而属于拥有最佳工程纪律的团队。