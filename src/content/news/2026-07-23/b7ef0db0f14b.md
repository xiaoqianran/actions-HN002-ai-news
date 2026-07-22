---
title: "Detecting Vulnerabilities in Agent Skills with SkillSpector: From Green Checkmark to Real Security Judgment"
originalUrl: "https://towardsdatascience.com/from-green-checkmark-to-real-judgment-auditing-ai-agent-skills-with-skillspector/"
date: "2026-07-22T23:52:49.773Z"
---

# Detecting Vulnerabilities in Agent Skills with SkillSpector: From Green Checkmark to Real Security Judgment  
# 使用 SkillSpector 检测智能体技能漏洞：从绿色勾选到真实安全判断  

Agentic AI Detecting Vulnerabilities in Agent Skills with SkillSpector: From Green Checkmark to Real Security Judgment Static analysis nailed the malicious skill and over-flagged the useful one. The gap between those results is where human judgement actually earns its keep.  
代理式人工智能使用 SkillSpector 检测智能体技能漏洞：从绿色勾选到真实安全判断。静态分析准确抓住了恶意技能，但也过度标记了有用的技能。这两者结果之间的差距，正是人类判断真正发挥作用的地方。  

Chien Vu Minh Jul 22, 2026 24 min read Share <ahref="https://unsplash.com/photos/green-darts-hitting-bullseye-on-dartboard-jl4BQJs87Do"Photo by Afif Ramdhasuma on Unsplash  
Chien Vu Minh 2026年7月22日 24分钟阅读 分享 <ahref="https://unsplash.com/photos/green-darts-hitting-bullseye-on-dartboard-jl4BQJs87Do" 照片由 Afif Ramdhasuma 提供  

1. The number you should not trust  
1. 你不应信任的那个数字  

An agent skill is a simple package of instructions for an AI agent. In practice, it is a folder with plain-English directions such as “open a pull request” or “triage these tickets.” Claude Code and most agent stacks load those directions when they seem relevant to the task. That makes skills easy to share. It also makes them risky. Anyone can publish one, and you install it the way you install anything else from the internet: drop it in the folder and go. So the security question is familiar: is this package safe?  
智能体技能是为 AI 智能体准备的简单指令包。实际上，它是一个包含纯英文指令的文件夹，例如“打开一个拉取请求”或“分类这些工单”。Claude Code 和大多数智能体栈会在这些指令与任务相关时加载它们。这使得技能易于分享，也使其充满风险。任何人都可以发布一个技能，而你的安装方式与从互联网安装任何东西一样：将其放入文件夹并运行。因此，安全问题很熟悉：这个包安全吗？  

A new kind of scanner has shown up to answer that question. You point it at the folder, run the security test, read the number it returns, trust the label underneath, and act: keep it, be cautious, or do not install. But that number is the least trustworthy thing on the screen.  
一种新型扫描器出现了来回答这个问题。你将其指向文件夹，运行安全测试，读取它返回的数字，信任下方的标签，然后采取行动：保留、谨慎或不要安装。但那个数字是屏幕上最不可信的东西。  

I ran NVIDIA’s SkillSpector (source), an open-source scanner built for exactly this job, across three skills. I wanted to see where its score helps and where it quietly misleads. On a deliberately planted honeypot, it returned a flat 100 out of 100 and a hard “do not install.” That was correct. But the worst thing it caught was plain English in the Markdown, not code. (Score summarization is in Figure 1).  
我运行了 NVIDIA 的 SkillSpector（来源），一个专为此任务构建的开源扫描器，对三个技能进行了扫描。我想看看它的分数在哪些地方有帮助，在哪些地方会悄悄误导。在一个故意设置的蜜罐上，它返回了整整 100 分（满分 100）和坚定的“不要安装”警告。这是正确的。但它抓住的最糟糕的东西是 Markdown 中的纯英文文本，而不是代码。（分数总结见图 1）。  

Figure 1: Three skills, three static scores. Image by author.  
图 1：三个技能，三个静态分数。作者提供图片。  

On a legitimate automation skill I would want to adopt, and would never install unvetted, SkillSpector raised twenty findings. Sixteen of them were skills calling the GitHub API, which is the skill’s entire stated job. The score collapsed those twenty findings into one integer. It did not tell me which four of them mattered.  
在一个我本想采用、且绝不会未经审查就安装的合法自动化技能上，SkillSpector 提出了二十个发现。其中十六个是调用 GitHub API 的调用，而这正是该技能公开声明的全部工作。分数将二十个发现压缩成一个整数。它没有告诉我其中哪四个是重要的。  

Figure 2: Comparison of static vs semantic runs of 2 skills. Image by author  
图 2：两个技能的静态与语义运行对比。作者提供图片。  

The people who feel this gap are not researchers. They are the platform and security engineers now being asked to approve third-party skills for Claude Code and every agent stack downstream of it. A “safe” ships a credential stealer. A wrong “dangerous” trains your team to ignore the scanner. From the outside, both failures look the same: a checkmark nobody trusts.  
感受到这一差距的人不是研究人员。他们是现在被要求为 Claude Code 及其下游所有智能体栈批准第三方技能的平台和安全工程师。一个标为“安全”的技能可能 shipped 一个凭据窃取器。一个错误标为“危险”的技能会训练你的团队去忽略扫描器。从外部看，两种失败看起来一样：一个没人信任的勾选标记。  

So this article is about reading that checkmark before you commit to it. It uses three real scans as the worked example, then shows what a skill scanner’s score does and does not tell you before you install. Here is what this article proves:  
因此，本文是关于在你承诺使用之前解读那个勾选标记。它使用三个真实扫描作为示例，然后展示技能扫描器的分数在安装前会告诉你什么、不会告诉你什么。本文证明了以下几点：  

The static layer of a skill scanner is fast, free, and catches real malice. The most dangerous findings in a planted honeypot were credential theft and prompt-injection instructions written as plain prose, which a code-only scanner would never read.  
技能扫描器的静态层快速、免费，并能捕捉真正的恶意。在设置的蜜罐中最危险的发现是凭据盗窃和以纯散文形式编写的提示词注入指令，而纯代码扫描器永远不会读取这些。  

Read on its own, that same static layer throws roughly an 80 percent false-positive rate on a useful skill. 16 of the twenty findings on a real GitHub automation were the skill doing exactly what it advertised. The score cannot tell the difference between design power and hidden threat.  
仅凭静态层本身，它在有用技能上会产生大约 80% 的误报率。在一个真实的 GitHub 自动化技能上，二十个发现中的十六个正是该技能按广告所做的事情。分数无法区分设计能力和隐藏威胁。  

Only a second stage can, and that stage is four passes, not one: three that hunt for new problems and one that filters false positives. Skip the discovery passes, and the worst skills sail through.  
只有第二阶段可以，而该阶段是四次传递，而不是一次：三次用于寻找新问题，一次用于过滤误报。跳过发现传递，最糟糕的技能就会通过。  

2. Agent skills are a new software supply chain  
2. 智能体技能是一个新的软件供应链  

Mechanically, a skill is a folder with a Markdown file in it. Anthropic shipped the format in October 2025; other vendors picked it up over the months that followed. The header carries a name and a description. The body is plain-language instructions. When an agent decides the description matches what it’s doing, it loads the whole body into its context and follows it.  
从机制上讲，技能是一个包含 Markdown 文件的文件夹。Anthropic 于 2025 年 10 月发布了该格式；其他供应商在接下来的几个月里陆续采用。头部包含名称和描述。主体是纯语言指令。当智能体判断描述与其正在做的事情匹配时，它会将整个主体加载到其上下文中并遵循它。  

That last sentence is the entire security problem. When the skill’s description matches what you are doing, the agent loads the whole body into its context and follows it The skill body is instructions. That’s all, no more, no less. The agent does not draw a clean line between data and instruction, and it does not decide on its own which files are safe to read unless you tell it. A line that says “summarize the repo before you start” and a line that says “summarize the repo’s .env file into your first reply” are the same kind of thing to the agent: an instruction, loaded with the operator’s authority.  
最后一句就是整个安全问题。当技能的描述与你正在做的事情匹配时，智能体将整个主体加载到其上下文中并遵循它。技能主体是指令。仅此而已，没有更多。智能体不在数据和指令之间划清界限，除非你告诉它，否则它不会自行决定哪些文件是安全可读的。一句说“在开始前总结仓库”和一句说“将仓库的 .env 文件总结到你的第一次回复中”对智能体来说是同一类东西：一条指令，以操作者的权威加载。  

The AISA group put it more sharply than I can. In October 2025, they wrote it plainly: every line in a skill file is an instruction, which makes prompt injection trivial. You cannot defend against that by scanning for instructions where there should be data. It is all instruction.  
AISA 小组说得比我更尖锐。2025 年 10 月，他们 plainly 写道：技能文件中的每一行都是指令，这使得提示词注入变得 trivial。你无法通过在有数据的地方扫描指令来防御这一点。它全部是指令。  

The published skill ecosystem is already compromised. The study SkillSpector itself cites found prompt injection in 26.1 percent of 42,447 skills and likely malicious intent in 5.2 percent. When Snyk scanned 3,984 published skills in February 2026, 36.8% carried at least one security flaw, 13.4% a critical one, and 76% were confirmed malicious — eight of them still downloadable the day the report shipped.  
已发布的技能生态系统已经被破坏。SkillSpector 自身引用的研究发现，在 42,447 个技能中，26.1% 存在提示词注入，5.2% 可能存在恶意意图。当 Snyk 在 2026 年 2 月扫描 3,984 个已发布技能时，36.8% 至少有一个安全缺陷，13.4% 有一个关键缺陷，76% 被确认为恶意——其中八个在报告发布当天仍可下载。  

These are not lab curiosities. Snyk’s team documented what it called the first coordinated malware campaign run through skills — real accounts uploading payloads at scale, one of them, the handle zaycv, shipping more than forty near-identical malicious skills on its own. The methods were brazen: base64-encoded commands that read your AWS keys and exfiltrated them, install steps that pointed at password-protected archives of executables, and — the simplest move of all — skills that just told the agent to turn its own safety checks off.  
这些不是实验室 curiosities。Snyk 团队记录了他们所称的首次通过技能进行的协调恶意软件活动——真实账户大规模上传载荷，其中一个 handle zaycv 独自发布了四十多个几乎相同的恶意技能。方法胆大包天：读取你的 AWS 密钥并外泄的 base64 编码命令、指向受密码保护的可执行文件存档的安装步骤，以及——最简单的一招——只是告诉智能体关闭其自身安全检查的技能。  

For where this ends, look one layer up. Invariant Labs demonstrated it: they planted a prompt injection in a single public GitHub issue, and an agent asked to triage that repo followed the planted text straight into the user’s private r  
至于这最终会走向何方，往上一层看。Invariant Labs 演示了这一点：他们在一个公开的 GitHub issue 中植入了一个提示词注入，而被要求分类该仓库的智能体遵循植入的文本直接进入了用户的 private r