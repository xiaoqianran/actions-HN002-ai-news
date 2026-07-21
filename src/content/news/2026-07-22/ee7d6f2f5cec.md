---
title: "ayghri / i-have-adhd"
originalUrl: "https://github.com/ayghri/i-have-adhd"
date: "2026-07-21T22:38:44.725Z"
---

# ayghri / i-have-adhd

ADHD-friendly outputs. No ADHD diagnosis needed!  
为ADHD优化的输出。无需ADHD诊断即可使用！

Install Claude Code claude plugin marketplace add ayghri/i-have-adhd claude plugin install i-have-adhd@i-have-adhd Then type /i-have-adhd. No local clone needed — Claude Code fetches the repo and keeps it updated.  
安装Claude Code：在claude插件市场添加 ayghri/i-have-adhd，或运行 claude plugin install i-have-adhd@i-have-adhd，然后输入 /i-have-adhd。无需本地克隆——Claude Code会自动获取仓库并保持更新。

Codex codex plugin marketplace add ayghri/i-have-adhd --ref main codex plugin add i-have-adhd@i-have-adhd Then type $i-have-adhd to apply the output style explicitly. The skill can also be invoked implicitly when Codex sees a task that benefits from it.  
对于Codex：在codex插件市场添加 ayghri/i-have-adhd --ref main，或运行 codex plugin add i-have-adhd@i-have-adhd，然后输入 $i-have-adhd 以显式应用输出风格。当Codex识别到能从该技能受益的任务时，也会隐式调用它。

Install instructions for other coding agents live in INSTALL.md.  
其他编码助手的安装说明请见 INSTALL.md。

## What it does
A skill for your coding assistant that stops it from burying the answer. Action first. Steps numbered. No "Hope this helps!"  
为你的编码助手设计的技能，防止它埋没关键答案。行动优先。步骤编号。不说“希望这有帮助！”

## What changes
### Before
Great question! Let me think about this. Your auth flow has a few moving pieces: the middleware, the token verification, and the cookie handling. Looking at src/auth.ts, the verifyToken function (around lines 42-58) seems to be using an older jsonwebtoken API. One approach would be to update the package and rewrite that function. After making the change, you'd want to run the auth tests to confirm nothing breaks. By the way, you might also want to look at your dependency versions overall. Hope this helps! Let me know if you want to dig deeper.  
好问题！让我想想。你的认证流程有几个移动部件：中间件、令牌验证和cookie处理。查看 src/auth.ts，verifyToken 函数（大约第42-58行）似乎使用了较旧的 jsonwebtoken API。一种方法是更新包并重写该函数。更改后，你应该运行认证测试以确认没有破坏任何东西。顺便说一句，你可能还想整体查看依赖版本。希望这有帮助！如果你想深入探讨，请告诉我。

### After
Run npm install jsonwebtoken@latest, then edit src/auth.ts:42.  
运行 npm install jsonwebtoken@latest，然后编辑 src/auth.ts:42。

Open src/auth.ts  
打开 src/auth.ts

Replace verifyToken (lines 42–58) with the snippet below  
将 verifyToken（第42-58行）替换为以下代码片段

Run npm test -- auth.spec.ts  
运行 npm test -- auth.spec.ts

Next: paste the first failing line if any test fails.  
下一步：如果测试失败，请粘贴第一个失败的行。

## The rules
10 rules. Full text in SKILL.md.  
10条规则。全文见 SKILL.md。

- Lead with the next action.  
  以下一步行动开头。
- Number multi-step tasks.  
  多步骤任务需编号。
- End with one concrete next step.  
  以一个具体的下一步结束。
- Suppress tangents.  
  抑制离题内容。
- Restate state every turn.  
  每轮重述当前状态。
- Specific time estimates (minutes, not "a bit").  
  具体时间估算（用分钟，不用“一会儿”）。
- Make wins visible.  
  让成果可见。
- Matter-of-fact errors.  
  客观陈述错误。
- Cap lists at 5 items.  
  列表不超过5项。
- No preamble.  
  无开场白。
- No recap.  
  无回顾。
- No closers.  
  无结束语。

## Tune it
Fork, edit skills/i-have-adhd/SKILL.md, install your fork: claude plugin marketplace add <your-username>/i-have-adhd. Re-invoke /i-have-adhd.  
Fork本仓库，编辑 skills/i-have-adhd/SKILL.md，安装你的fork版本：claude plugin marketplace add <your-username>/i-have-adhd。重新调用 /i-have-adhd。

## Credits
Loosely based on The Adult ADHD Tool Kit by J. Russell Ramsay and Anthony L. Rostain. Adapted for how an LLM should respond, not how a human should organize their day.  
 loosely 基于 J. Russell Ramsay 和 Anthony L. Rostain 的《成人ADHD工具包》。针对LLM应如何回应进行改编，而非针对人类如何安排日程。

## License
MIT. Star ⭐ if it saved you one scroll past one "Great question!"  
MIT协议。如果它帮你少滑过一次“好问题！”，请给个星标 ⭐。