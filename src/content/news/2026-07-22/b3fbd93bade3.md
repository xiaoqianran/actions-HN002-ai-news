---
title: "Human mathematicians are being outcounterexampled"
originalUrl: "https://xenaproject.wordpress.com/2026/07/20/human-mathematicians-are-being-outcounterexampled/"
date: "2026-07-21T23:00:37.609Z"
---

# Human mathematicians are being outcounterexampled  
# 人类数学家正被反例超越  

Xena Mathematicians learning Lean by doing. Skip to content Home About Xena Student projects Installing Lean and mathlib Bluesky Useful links. ← Formalizing Fermat workshop  
（忽略导航文本）  

It’s been an interesting few weeks for counterexamples. This post is basically my perspective of what has been going on in the world of formalization, AI tools and, in particular, counterexamples.  
反例领域最近几周颇为有趣。本文 basically 是我对形式化、AI 工具，尤其是反例领域动态的视角。  

Unit distance  
单位距离问题  

Two months ago today (20th May 2026), ChatGPT disproved Erdős’ Unit Distance conjecture in discrete geometry. This is now old news but I had to start somewhere. The announcement was accompanied with testimonies by human mathematicians, many of whom I knew and a few of whom I trusted, saying that they believed the argument (they had been given early access to it and had checked it).  
两个月前的今天（2026年5月20日），ChatGPT 推翻了离散几何中 Erdős 的单位距离猜想。这已是旧闻，但我总得有个开头。该声明附有人类数学家的证言——其中许多我认识，少数我信任——他们表示相信该论证（他们曾提前获准访问并进行了核查）。  

The basic structure of the proof is that a profound theorem in number theory due to Golod and Shafarevich from the 1960s could be used to construct a counterexample to the conjecture.  
证明的基本结构是：1960年代 Golod 与 Shafarevich 的数论深定理可用于构造该猜想的反例。  

It is now 9 years since I had a mid-life crisis, realised I no longer trusted many human mathematicians when it comes to technical details, discovered Lean, and started to argue that interactive theorem provers should play an important role in the future of mathematics.  
九年了，自从中年危机让我意识到不再信任许多人类数学家的技术细节，发现 Lean，并开始主张交互式定理证明器应在数学未来中扮演重要角色。  

So of course my first question was “is the counterexample formalized in Lean”. The answer was “no”.  
所以我的第一反应自然是“这个反例是否在 Lean 中形式化了？”答案是“否”。  

But under a week later (26th May 2026), I got an email from Fields Medallist Mike Freedman. Mike is now the Chief Science Officer for Logical Intelligence, a company cofounded by Turing Award winner and “godfather of AI” Yan LeCun. Mike informed me that their system had autoformalized the entire ChatGPT-generated paper in Lean and could I take a look.  
但不到一周后（2026年5月26日），我收到了菲尔兹奖得主 Mike Freedman 的邮件。Mike 现为 Logical Intelligence 的首席科学官，该公司由图灵奖得主、“AI 教父” Yan LeCun 联合创立。Mike 告知我，他们的系统已将整篇 ChatGPT 生成的论文自动形式化为 Lean 代码，问我能否一观。  

I looked, and my post-doc Thomas Browning looked too. And indeed this was what Logical Intelligence had done: they had formalized precisely the statement that the profound theorem of number theory implied the Erdős counterexample.  
我看了，我的博士后 Thomas Browning 也看了。确实如此：Logical Intelligence 精确形式化了“该数论深定理蕴含 Erdős 反例”这一陈述。  

Breakthrough LLM-generated mathematics being formalized in real time. Interesting data point.  
LLM 生成的突破性数学成果正被实时形式化。有趣的数据点。  

Of course there is an elephant in the room here though, the profound theorem of number theory which takes 100+ pages to prove (it needs huge chunks of global class field theory, a theory developed at the beginning of the 20th century and for which there are still no short proofs; it is proving difficult to compress).  
但房间里显然有大象：那个需要 100 多页证明的数论深定理（它依赖大量全局类域论——20世纪初发展的理论，至今仍无简短证明；压缩极为困难）。  

In 2025 I had run a Clay Summer School with Richard Hill on the formalization of class field theory, and one year later we have nearly done the local case (it is the current PhD project of my student Edison Xie); the global case remained open, and indeed in 2025 formalizing global class field theory seemed like a fantasy.  
2025年，我与 Richard Hill 合办了关于类域论形式化的 Clay 暑期学校；一年后，我们几乎完成了局部情形（这是我学生 Edison Xie 的博士课题）；全局情形仍悬而未决，事实上在 2025 年，形式化全局类域论还像是幻想。  

One month later, on June 26th 2026, my perception of what was possible again changed. Boris Alexeev announced on the Lean Zulip that he had steered ChatGPT to a complete formalization of the Erdős counterexample, assuming nothing beyond the axioms of mathematics. Boris works at OpenAI and had used their new model Sol to do the autoformalization.  
一个月后，2026年6月26日，我对可能性的认知再次改变。Boris Alexeev 在 Lean Zulip 上宣布，他引导 ChatGPT 完成了 Erdős 反例的完整形式化，仅依赖数学公理。Boris 在 OpenAI 工作，使用了他们的新模型 Sol 进行自动形式化。  

Boris made the code public and it did not take long for me to realise that somewhere within all this AI-generated (and sometimes horrible, although sometimes decent) code was indeed a proof of some really hard theorems in global class field theory.  
Boris 公开了代码，我很快意识到，在这些 AI 生成的（有时糟糕，有时尚可）代码深处，确实包含了全局类域论中一些真正困难定理的证明。  

Also of interest to me was that Sol had generated 1.2 million lines of Lean code in the three weeks that it had worked on the project. Lean’s fantastic (declaration of conflict of interest: I am a maintainer) mathematics library mathlib is only 2.3 million lines of code, and took nine years to write.  
同样令我感兴趣的是，Sol 在项目工作的三周内生成了 120 万行 Lean 代码。Lean 出色的数学库 mathlib（利益冲突声明：我是维护者）也仅有 230 万行代码，且花了九年时间编写。  

Perhaps it was at this point that the penny really dropped for me — large AI-generated developments of mathematics are inevitable.  
或许正是在这点上，我真正恍然大悟——大规模 AI 生成的数学发展已不可避免。  

One cannot trust AI-generated code so I ran it in a sandbox on my machine (malicious Lean code can run arbitrary commands on your computer — Lean is a programming language, after all). Indeed, it was proving nontrivial theorems about the cohomology of number fields. Wow.  
不能信任 AI 生成的代码，所以我将其在沙箱中运行（恶意 Lean 代码可在你的电脑上执行任意命令——Lean 毕竟是一种编程语言）。确实，它在证明关于数域上同调的非平凡定理。哇。  

Group schemes of order n  
n 阶群概形  

A week after Boris’ revelation, in early July, I was thinking hard about how to run my Formalizing Fermat workshop. This workshop was sponsored by Logos Research, who, like Logical Intelligence (and Harmonic and Axiom AI and Moonshot AI and…) have a tool which can autoformalize mathematics — translating it from human language into Lean — building on mathlib.  
Boris 的发现一周后，七月初，我正苦苦思索如何举办我的“形式化费马大定理”研讨会。该研讨会由 Logos Research 赞助，他们与 Logical Intelligence（以及 Harmonic、Axiom AI、Moonshot AI 等）一样，拥有可自动形式化数学的工具——将人类语言翻译为 Lean 代码——并基于 mathlib 构建。  

Logos told me that they were only going to allow 5 people at a time to use their system during the workshop, and there were 25 attendees, so I told all attendees that I would buy them a Claude Max subscription for a month, so they had something to experiment with when it wasn’t their turn for Logos’ tool.  
Logos 告知我，研讨会期间他们一次只允许 5 人使用其系统，而共有 25 名参会者，因此我告诉所有参会者，我将为他们购买一个月的 Claude Max 订阅，以便在轮不到使用 Logos 工具时有所实验。  

The workshop was 6th to 10th July, and the Claude Max subscription would give attendees access to Claude Fable, at least until Tuesday 7th, when it was being switched off.  
研讨会是 7 月 6 日至 10 日，Claude Max 订阅将使参会者能使用 Claude Fable，至少到 7 日周二，届时它将被关闭。  

When OpenAI got wind of what I was doing, they also offered all attendees free ChatGPT Pro access for a month; this was a big deal because ChatGPT Sol was coming out on the 9th. So basically all attendees would have access to Sol and Fable for 4 out of the 5 days of the workshop, and Logos’ tool for the entire week.  
当 OpenAI 得知我的计划，他们也向所有参会者提供一个月免费的 ChatGPT Pro 访问权限；这很重要，因为 ChatGPT Sol 将在 9 日发布。所以基本上所有参会者在 5 天研讨会中的 4 天能使用 Sol 和 Fable，并全程使用 Logos 的工具。  

In fact Fable access was not removed on the 7th so we were in even better shape.  
事实上 Fable 的访问权限在 7 日并未被移除，所以我们情况更佳。  

I was not sure how good Logos’ tool was going to be, but I wanted a development of the theory of finite flat group schemes in Lean for my ongoing proof of Fermat’s Last Theorem, so I put uploaded some classic papers in the area to Fable and ChatGPT, and got them together to write down an exposition of the theory in natural language.  
我不确定 Logos 工具效果如何，但我需要关于有限平坦群概形的理论发展来推进我的费马大定理证明，因此我将该领域的一些经典论文上传至 Fable 和 ChatGPT，让它们共同用自然语言写下该理论的阐述。  

I passed this pdf document over to Logos the day before the workshop, and on the first day of the workshop they said that one of the claims in the pdf was false and they had found an explicit counterexample. Another counterexample!  
我在研讨会前一天将这个 PDF 文档传给 Logos，研讨会第一天他们就说 PDF 中的一个主张是错的，且他们找到了一个显式反例。又一个反例！  

I took a look and indeed the LLM-generated pdf was simply wrong at some point when describing a standard construction; false alarm.  
我看了看，确实这个 LLM 生成的 PDF 在描述某个标准构造时错了；虚惊一场。