---
title: "citrolabs / ego-lite"
originalUrl: "https://github.com/citrolabs/ego-lite"
date: "2026-07-23T23:36:10.003Z"
---

# citrolabs / ego-lite

The best browser for both you and your AI agents work in parallel. ego (lite) is a browser where you and your AI agents work in parallel. Your agents run multiple browser tasks in their own Spaces while your tabs stay yours, and tasks complete faster on fewer tokens. Existing tools like browser-use and agent-browser are browser automation frameworks: they need a separate browser to drive, logins never carry cleanly, and you and the agent end up fighting for the same tabs. ego lite is one browser designed from the start for the two of you to share. No extra setup, and the agent can always reach your real logins and tabs through ego-browser.

专为您和您的 AI 智能体并行工作而设计的最佳浏览器。ego (lite) 是一个让您和 AI 智能体并行协作的浏览器。您的智能体在各自的“空间”中运行多个浏览器任务，而您的标签页保持独立，任务能用更少的 token 更快完成。现有的工具（如 browser-use 和 agent-browser）是浏览器自动化框架：它们需要额外的浏览器来驱动，登录状态无法干净地传递，您和智能体最终会争夺相同的标签页。ego lite 从一开始就为你们两者共享而设计。无需额外设置，智能体总能通过 ego-browser 访问您的真实登录状态和标签页。

---

Demo 01_codex_x_scape_1080p_265.mp4 Quick Start ego lite runs on macOS today. Windows and Linux are on the roadmap. 1. Install Pick whichever fits your flow. 1.1 Download the macOS app Click to download, then open it to install. Either way, ego lite adds the ego-browser skill to every agent's skills directory on your machine. 1.2 Add the skill with npx Install just the ego-browser skill: npx skills add citrolabs/ego-lite The first time your agent runs a browser task, it walks you through installing the ego lite app. 1.3 Let your agent set it up Paste this into your agent: Set up ego lite for me: https://github.com/citrolabs/ego-lite Read `skills/ego-browser/references/install.md` and follow the steps to install ego lite. On first launch, ego lite asks one question, whether to migrate your Chrome data. Say yes and your agent inherits your existing logins, cookies, extensions, and bookmarks.

演示视频 01_codex_x_scape_1080p_265.mp4 快速入门：ego lite 目前支持 macOS。Windows 和 Linux 已列入路线图。1. 安装 选择适合您工作流的方式。1.1 下载 macOS 应用 点击下载，然后打开安装。无论如何，ego lite 都会将 ego-browser 技能添加到您机器上每个智能体的技能目录中。1.2 使用 npx 添加技能 仅安装 ego-browser 技能：`npx skills add citrolabs/ego-lite` 当您的智能体首次运行浏览器任务时，它会引导您安装 ego lite 应用。1.3 让您的智能体完成设置 将以下内容粘贴到您的智能体中：“为我设置 ego lite：https://github.com/citrolabs/ego-lite 阅读 `skills/ego-browser/references/install.md` 并按照步骤安装 ego lite。” 首次启动时，ego lite 会询问是否迁移您的 Chrome 数据。选择“是”，您的智能体将继承您现有的登录状态、Cookie、扩展程序和书签。

---

2. Run your first task In your agent CLI, type `/ego-browser` followed by a space, then describe what you want in plain language: `ego-browser follow @ego_agent on x.com for me` The agent picks up the ego-browser skill, opens the page in its own Space, reads a Snapshot, acts on the page, and reports back, all while your own tabs stay untouched. Your browsing data stays on your device. ego lite only records whether you opted into Chrome migration during setup.

2. 运行您的第一个任务 在智能体 CLI 中，输入 `/ego-browser` 后加空格，然后用自然语言描述您的需求：`ego-browser follow @ego_agent on x.com for me` 智能体会获取 ego-browser 技能，在其专属空间中打开页面，读取快照，在页面上操作，并返回结果，而您自己的标签页完全不受影响。您的浏览数据保留在您的设备上。ego lite 仅记录您在设置时是否选择了 Chrome 数据迁移。

---

### Highlight of ego lite

#### Feature | What it does
--- | ---
**Code base, not CLI base, for faster runs with fewer tokens on complex tasks** | The capabilities ego lite exposes to the agent are wrapped as JavaScript functions the agent calls directly. The agent gets to do what it does best: write code, composing a multi-step task into a single output instead of getting stuck in a "call two commands, look at the result, call two more commands" loop. Compared to the conventional CLI approach, complex workflows finish up to 2.5× faster with higher task success rates and far fewer tool calls per task.
**A dedicated Space for every agent** | ego lite gives each agent its own fully isolated Space. You browse up front, your agent works in the background, and they don't get in each other's way. You can see which Space has an agent running at any moment, and take it over or stop it whenever you want.
**Your agents multitask in Spaces, parallel workspaces inside the same browser** | Each Space gets its own AI agent or its own task, all running at the same time. Claude Code enriching 10 leads in 10 parallel Spaces. Codex scraping 5 competitor sites in 5 more. They don't collide or steal your tabs. Your mouse stays where you left it.
**The strongest page Snapshot on the market** | Thanks to kernel-level customization, ego lite produces the highest-quality page snapshots, the view text models rely on to "see" and act on a webpage. It reliably handles tough cases like deeply nested iframes, exactly where other approaches consistently break down.
**Any agent can drive it through ego-browser** | ego-browser is the connection layer between any agent CLI (Claude Code, Codex, Cursor, or a custom one) and ego lite. It exposes the browser as a set of in-page JavaScript tools: snapshot, fill, click, wait, navigate, capture. The agent writes a JavaScript snippet calling those tools, and ego-browser runs it on the page in one pass.
**Experience accumulation that makes your agent faster the more you use it (coming soon)** | Most of an agent's time on browser tasks goes to trial and error. ego lite's official Skill distills every successful action into reusable tools and workflows, so similar tasks down the line run up to 5x faster.

---

### ego lite vs existing products

Most tools can automate a browser. The real questions are what browser the agent gets, whether you can keep working at the same time, and whether the tool is built for the agent you already use or a built-in one.

| Capability | ego lite | Browser-Use | agent-browser (Vercel) | ChatGPT Atlas | Perplexity Comet |
--- | --- | --- | --- | --- | --- |
| Multitask in parallel | ✓ | — | — | — | — |
| Reusable skills | ✓ | — | — | — | — |
| Inherits Chrome's data | ✓ | — | — | ✓ | ✓ |
| Same browser, separate workspace | ✓ | — | — | — | — |
| Compressed semantic input | ✓ | — | ✓ | — | — |
| Controllable by external agents | ✓ | ✓ | ✓ | — | — |
| Data stored locally | ✓ | ✓ | ✓ | — | — |
| No login friction | ✓ | — | — | ✓ | ✓ |
| Daily-use browser | ✓ | — | — | ✓ | ✓ |
| Free | ✓ | ✓ | ✓ | — | — |

Two other categories try to solve the same problem. Browser automation frameworks like Browser-Use and Vercel's agent-browser are libraries the agent calls; they ship no browser of their own, so they need a separate one to drive and your logins rarely carry cleanly. AI browsers like ChatGPT Atlas and Perplexity Comet ship a built-in agent, and only that agent can drive the browser. ego lite is one browser, designed from the start for you and any agent you bring to share.

---

### Benchmarks

We benchmarked ego lite against Vercel's agent-browser on four complex browser automation tasks. ego lite finished each task up to 2.5× faster, with substantially fewer tokens. The harder the task, the bigger the gap. [Check the comparison.](https://github.com/citrolabs/ego-lite?tab=readme-ov-file#benchmarks)

---

### Docs

Tutorials, the full tool reference, and integration guides live at [lite.ego.app/document/](https://lite.ego.app/document/).

### Community

- **Discord**, questions, setup help, and skill sharing
- **GitHub Discussions**, ideas and longer threads
- **X/Twitter**, updates and releases

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=citrolabs/ego-lite&type=Date)](https://star-history.com/#citrolabs/ego-lite&Date)

### License

The contents of this repository are released under the [MIT License](LICENSE). The ego lite browser is a separate, free download.