---
title: "Water Cooler Small Talk, Ep. 12: Byzantine Fault Tolerance"
originalUrl: "https://towardsdatascience.com/water-cooler-small-talk-ep-12-byzantine-fault-tolerance/"
date: "2026-07-20T23:28:32.920Z"
---

# Water Cooler Small Talk, Ep. 12: Byzantine Fault Tolerance

*区块链茶水间小话，第12集：拜占庭容错*

Blockchain Water Cooler Small Talk, Ep. 12: Byzantine Fault Tolerance How do you make decisions when you can't trust anyone in the room? Maria Mouschoutzi Jul 20, 2026 10 min read

区块链茶水间小话，第12集：拜占庭容错 当你无法信任房间里的任何人时，该如何做决策？ 玛丽亚·穆舒齐 2026年7月20日 10分钟阅读

Lately, I had a bit of a side quest and spent some time reading about blockchain, fortunately not from a crypto-bro perspective, but rather from genuine curiosity about how it actually works. And while I was going down that rabbit hole, I kept bumping into a concept I had never heard of before. That was Byzantine Fault Tolerance.

最近，我接了个支线任务，花了一些时间阅读关于区块链的内容——幸运的是，我不是从加密货币炒家的角度，而是出于对其实际工作原理的真正好奇。在我深入探究的过程中，不断遇到一个我从未听说过的概念：拜占庭容错（Byzantine Fault Tolerance）。

In a nutshell, Byzantine Fault Tolerance is a system property that allows a system to continue to operate properly, even when some malicious actors are included in the system. So this Water Cooler Small Talk is going to be about Byzantine Fault Tolerance: what it is, where it comes from, why it matters, and how blockchain ended up being one of the most elegant solutions to a very old problem. So, let’s take a look!

简而言之，拜占庭容错是一种系统特性，它允许系统在包含某些恶意行为者的情况下仍能正常运行。因此，本期茶水间小话将围绕拜占庭容错展开：它是什么、从何而来、为何重要，以及区块链如何最终成为一个非常古老问题的最优雅解决方案之一。让我们一起来看看吧！

from Byzantine generals to computers

从拜占庭将军到计算机

So, Byzantine Fault Tolerance is a system property that owes its name to the following game theory problem, namely the Byzantine Generals Problem: A group of Byzantine generals has surrounded a fortress. They must reach a collective decision to either attack or retreat. Both the decisions of retreating and attacking can work, but only if everyone acts in coordination. A coordinated attack succeeds. A coordinated retreat also succeeds. But if some generals attack while others retreat, the result is defeat.

因此，拜占庭容错这一系统特性得名于以下博弈论问题，即“拜占庭将军问题”：一群拜占庭将军围困了一座要塞。他们必须达成集体决策，要么进攻，要么撤退。无论是撤退还是进攻，只要所有人协调一致，两种决策都能成功。协调一致的进攻会获胜，协调一致的撤退也会成功。但如果一些将军进攻而另一些撤退，结果就是失败。

The communication between the generals is all-to-all and the generals can only communicate by sending messengers to each other. However, some of the generals may be traitors. In particular, a traitor does not only vote the wrong way, but also tries to deceive the other generals by sending conflicting messages to different generals. For example, a traitor may tell one general to attack and another to retreat, deliberately trying to create a split.

将军之间的通信是全互联的，他们只能通过互相派遣信使来沟通。然而，有些将军可能是叛徒。特别是，叛徒不仅会投反对票，还会通过向不同将军发送矛盾信息来欺骗其他将军。例如，一个叛徒可能告诉一位将军“进攻”，而告诉另一位“撤退”，蓄意制造分裂。

Meanwhile, the loyal generals have no way of knowing in advance who the traitors are. The problem is: is it possible, and if yes how and under which conditions, can such a setup of generals reach consensus? This problem was first formally described by computer scientists Leslie Lamport, Robert Shostak, and Marshall Pease in their 1982 paper.

与此同时，忠诚的将军们无法提前知道谁是叛徒。问题在于：在这种设定下，将军们是否可能达成共识？如果可能，如何达成，以及在什么条件下？这个问题最早由计算机科学家莱斯利·兰波特、罗伯特·肖斯塔克和马歇尔·皮斯在1982年的论文中正式提出。

And while the setting is medieval and military, the described problem is one of the most fundamental challenges in computer science. That is, how do you reach a reliable consensus in a distributed system when some of the participants might be sending false information?

虽然背景是中世纪军事，但所描述的问题是计算机科学中最根本的挑战之一：当分布式系统中的某些参与者可能发送虚假信息时，如何达成可靠的共识？

In a distributed computer system, instead of generals we have nodes: individual computers or servers, each holding a copy of some shared state (a database, a ledger, a record of transactions). All nodes of a distributed system need to agree on what that shared state of truth is. Like the generals, they communicate by sending messages to each other, and like the generals, some of those nodes might be faulty.

在分布式计算机系统中，我们不再有将军，而是有节点：独立的计算机或服务器，每个都持有共享状态（数据库、账本、交易记录）的副本。分布式系统的所有节点都需要就这个共享的真实状态达成一致。就像将军们一样，它们通过互相发送消息来通信；也像将军们一样，其中一些节点可能出现故障。

But why not just vote? Intuitively, one may assume that each general could just send their vote (attack or retreat) to all other generals, then count the votes, and do what the majority proposes. Attack if more than half say attack, retreat if more than half say retreat.

但为什么不直接投票呢？直觉上，人们可能认为每个将军只需将自己的投票（进攻或撤退）发送给所有其他将军，然后统计票数，执行多数票提议的方案——如果超过一半说进攻就进攻，超过一半说撤退就撤退。

The trouble is that this only works if each general (node) really trusts the messages that they receive. But in such a network, traitors may also be included, which may send different votes to different generals, with the goal of creating a split decision. General A might receive a message saying “I vote attack”, while General B receives a message from the same traitor saying “I vote retreat”. So, generals A and B may end up with different ideas on what the majority of the network decided to do.

问题在于，这只有在每位将军（节点）真正信任所接收消息时才有效。但在这样的网络中，可能包含叛徒，他们可能向不同将军发送不同投票，以制造分裂决策。将军A可能收到“我投票进攻”的消息，而将军B却从同一个叛徒那里收到“我投票撤退”的消息。因此，A和B最终可能对网络多数人的决定产生不同理解。

In other words, we can no longer just trust the majority vote because the majority for each node might be counting different messages. And this inability to reach consensus is a real issue for those hypothetical Byzantine generals, as much as for distributed computer networks. Essentially, this is the definition of what a Byzantine fault is.

换言之，我们不能仅仅信任多数投票，因为每个节点所统计的“多数”可能基于不同的消息。这种无法达成共识的情况，对于假设的拜占庭将军和分布式计算机网络来说都是真实存在的问题。本质上，这就是拜占庭故障的定义。

A Byzantine fault is a fault in a distributed system where a component does not simply fail, but instead behaves in an unpredictable way. This means sending conflicting information to different nodes, appearing to be functioning correctly to some nodes while malfunctioning for others, actively producing false outputs, and so on. Nonetheless, a Byzantine fault doesn’t necessarily originate from a malicious actor in the network, since it can also occur from electrical faults, software bugs, or hardware failures that cause a node to produce arbitrary outputs. A node with such behaviour is called a Byzantine node.

拜占庭故障是分布式系统中的一种故障，其中组件并非简单地失效，而是以不可预测的方式运行。这意味着向不同节点发送矛盾信息，对某些节点表现正常而对其他节点故障，主动产生错误输出等。然而，拜占庭故障不一定源于网络中的恶意行为者，因为它也可能由电气故障、软件缺陷或硬件故障导致节点产生任意输出。具有此类行为的节点被称为拜占庭节点。

What each general receives from every other general. Loyal generals send consistent votes; traitors send different votes to different recipients.

每位将军从其他每位将军那里收到什么。忠诚的将军发送一致的投票；叛徒向不同的接收者发送不同的投票。

In any case, in the original 1982 paper, the authors mathematically prove that for a system with n nodes to continue normal operation (that is, to tolerate) f Byzantine (traitor) nodes, at least n ≥ 3f + 1 total number of nodes is needed. In other words, if more than one-third of the nodes are Byzantine, it is mathematically impossible for such a system to reliably reach consensus, and there’s no algorithm to make such a system continue to operate. A system that has at least two-thirds of the total nodes uncorrupted and can also operate normally, reaching consensus, has the property of Byzantine Fault Tolerance, or is called a Byzantine Fault Tolerant system.

无论如何，在最初的1982年论文中，作者们数学证明：对于一个拥有n个节点的系统，要使其在存在f个拜占庭（叛徒）节点时仍能继续正常运行（即容忍故障），至少需要n ≥ 3f + 1个总节点数。换言之，如果超过三分之一的节点是拜占庭节点，那么该系统在数学上不可能可靠地达成共识，也没有算法能使这样的系统继续运行。一个拥有至少三分之二总节点未受损害且能正常运行、达成共识的系统，就具有拜占庭容错特性，或被称为拜占庭容错系统。

What about blockchain? For decades after the 1982 paper, Byzantine Fault Tolerance remained a theoretical problem with practical solutions only in tightly controlled environments like aerospace systems, nuclear power plants, or any other place where every node could be vetted in advance and guarantee that fewer than a third would go rogue. In other words, a certain trust was needed among the nodes comprising the network, so even if s

区块链呢？在1982年论文之后的几十年里，拜占庭容错一直是一个理论问题，其实际解决方案仅存在于严格受控的环境中，如航空航天系统、核电站或任何可以预先审查每个节点并保证少于三分之一会叛变的地方。换言之，组成网络的节点之间需要一定程度的信任，因此即使s（原文在此中断）