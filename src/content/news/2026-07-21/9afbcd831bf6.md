---
title: "AI’s most important protocol is getting a little bit easier to use"
originalUrl: "https://techcrunch.com/2026/07/20/ais-most-important-protocol-is-getting-a-little-bit-easier-to-use/"
date: "2026-07-20T22:35:49.316Z"
---

# AI’s most important protocol is getting a little bit easier to use  
# AI 最重要的协议正变得稍微容易使用一些

The Model Context Protocol (MCP) is one of the basic building blocks of AI interoperability, giving AI models a secure way to access external data sources and services. It’s the plumbing that lets a chatbot reach into your calendar, your database, or your internal tools, instead of engineers building custom pipes for every connection.  
模型上下文协议（MCP）是 AI 互操作性的基本构建模块之一，它为 AI 模型提供了一种访问外部数据源和服务的安全方式。它是让聊天机器人能够接入你的日历、数据库或内部工具的基础设施，而无需工程师为每个连接构建自定义管道。

Next week, that protocol is getting a significant update, and while it might not be noticeable to end users, it could make a big difference in how the ecosystem develops. The official spec for the new version has been public since May, but we got an unusually clear explanation of the changes Monday morning from the folks at Arcade — a two-year-old startup that’s built its entire business around the work of getting AI agents to actually function inside real companies, letting them securely connect to and act on tools like Gmail, Slack, and Salesforce.  
下周，该协议将迎来一次重大更新。尽管最终用户可能察觉不到，但它可能对生态系统的发展产生重大影响。新版本的官方规范自 5 月起就已公开，但周一早上，Arcade 的团队为我们提供了一次异常清晰的变更说明——这是一家成立两年的初创公司，其整个业务都围绕让 AI 代理在真实公司中实际运行而构建，使它们能够安全连接并操作 Gmail、Slack 和 Salesforce 等工具。

Arcade raised $60 million in June on the idea that most AI agents don’t fail because the underlying models are weak but because the infrastructure around them isn’t ready yet, and that’s what this update is trying to address.  
Arcade 在 6 月筹集了 6000 万美元，其核心理念是：大多数 AI 代理失败不是因为底层模型薄弱，而是因为它们周围的基础设施尚未就绪，而此次更新正是试图解决这个问题。

Essentially, MCP is changing the way it handles session IDs — the little tokens that servers use to remember “ah, this is the same conversation as five seconds ago” — so servers can operate more easily at a larger scale.  
本质上，MCP 正在改变其处理会话 ID 的方式——这些是服务器用来记住“哦，这是五秒前的同一对话”的小令牌——以便服务器能更轻松地进行大规模运营。

As Arcade founder Nate Barbettini puts it: [Under the current system] The first time an MCP client like Claude connects to a server, it sends a “hello”: I’m Claude, here’s my version, here are my capabilities. The server replies with its own capabilities and hands back a session ID… From then on, the client sends that session ID on every request so the server knows it’s the same conversation. Sometimes the ID expires, so the client has to notice, request a new one, and carry on….  
正如 Arcade 创始人 Nate Barbettini 所说：[在当前系统下] 当像 Claude 这样的 MCP 客户端首次连接到服务器时，它会发送一个“你好”：我是 Claude，这是我的版本，这是我的能力。服务器会回复其自身能力并返回一个会话 ID……此后，客户端会在每次请求中发送该会话 ID，以便服务器知道这是同一对话。有时 ID 会过期，因此客户端必须注意到这一点，请求一个新的，然后继续……

Picture a real deployment. You’re running a server for millions of users, behind a load balancer whose entire job is to route each request to whatever server in the farm is free, sometimes in a different region. Now every one of those machines has to know about a session ID that some other machine handed out. It’s not impossible, but it’s a serious pain, and it fights the load balancer instead of working with it.  
想象一个真实部署场景。你正在为数百万用户运行一个服务器，它位于负载均衡器之后，负载均衡器的全部工作是将每个请求路由到服务器集群中任何可用的机器，有时甚至在不同区域。现在，这些机器中的每一个都必须知道由另一台机器分发的会话 ID。这并非不可能，但这是一个严重的痛点，并且它与负载均衡器对抗，而不是协同工作。

In other words, the current setup assumes one server remembers you, but real companies spread traffic across dozens of servers that don’t talk to each other by default, so today’s MCP servers have to do extra work just to keep track of who’s who. That’s been a significant headache for anyone running an MCP server at scale, and part of the reason we haven’t seen more companies ship large-scale, first-party MCP integrations despite all the hype around agentic AI this year.  
换句话说，当前的设置假设一台服务器记住你，但真实公司会将流量分散到数十台默认不相互通信的服务器上，因此今天的 MCP 服务器必须做额外工作来追踪谁是谁。这对任何大规模运行 MCP 服务器的人来说都是一个巨大的头痛问题，也是尽管今年围绕代理 AI 有大量炒作，但我们仍未看到更多公司推出大规模、第一方 MCP 集成的原因之一。

Under the new system, the protocol will take a looser, “stateless” approach to session IDs on the server side, similar to how most ordinary websites already work, which should make the whole system a lot easier to maintain and, in theory, cheaper to run at scale.  
在新系统下，该协议将在服务器端对会话 ID 采取更宽松的“无状态”方法，类似于大多数普通网站已有的工作方式，这应该会使整个系统更易于维护，并且在理论上，大规模运行的代价更低。

That’s all pretty technical, but it’s an important reminder that not every part of AI development is moving at breakneck speeds. While model training races ahead, a lot of the technical infrastructure those models need is still subject to the slow log-rolling of standards-body consensus. It really is happening; it’s just a little slower!  
这一切都非常技术性，但这是一个重要的提醒：AI 发展的并非所有部分都在飞速前进。虽然模型训练在疾驰，但这些模型所需的大量技术基础设施仍受标准机构共识缓慢推进的制约。它确实在发生，只是稍微慢一点！

---

**Author Bio / 作者简介**  
Russell Brandom has been covering the tech industry since 2012, with a focus on platform policy and emerging technologies. He previously worked at The Verge and Rest of World, and has written for Wired, The Awl and MIT’s Technology Review. He can be reached at russell.brandom@techcrunch.com or on Signal at 412-401-5489.  
Russell Brandom 自 2012 年起一直报道科技行业，重点关注平台政策和新兴技术。他曾在 The Verge 和 Rest of World 工作，并为 Wired、The Awl 和 MIT’s Technology Review 撰稿。可通过 russell.brandom@techcrunch.com 或 Signal（412-401-5489）联系他。