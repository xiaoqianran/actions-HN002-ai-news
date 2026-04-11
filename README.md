# AI News Daily

> Zero-cost AI-powered daily news aggregator. Fetches from 16+ sources, generates bilingual (EN/CN) summaries, and publishes automatically.

[中文文档](./README.zh-CN.md)

## Architecture

```
GitHub Actions (cron daily)
  → Fetch from 16 sources (RSS / API / Crawler)
  → Cross-source URL deduplication
  → AI summarize & translate (bilingual)
  → Generate Markdown
  → Git push
  → Cloudflare Pages auto-deploy
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Website | Astro (static site generation) |
| Hosting | Cloudflare Pages (free) |
| Scheduler | GitHub Actions cron |
| Fetching | Plugin-based (RSS, API, Crawler) with auto-retry |
| AI | Vercel AI SDK (OpenAI / Claude / Gemini / DeepSeek) |
| Language | TypeScript |

## Features

- **16 news sources** — Hacker News, TechCrunch, The Verge, Ars Technica, Product Hunt, MIT Tech Review, GitHub Trending, OpenAI Blog, Google AI Blog, Hugging Face, The Gradient, arXiv CS.AI/CL, WIRED, Lobsters, DEV Community
- **Dark / Light theme** — follows system preference, manual toggle (auto / light / dark)
- **Reading experience** — progress bar, back-to-top, source TOC navigation, prev/next day navigation
- **Mobile-first** — responsive typography, sticky horizontal-scroll TOC, touch-friendly targets
- **Smart fetching** — proxy support with auto-retry, cross-source URL deduplication, global token budget
- **Bilingual output** — AI-generated Chinese summaries with original English titles

## Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Install

```bash
pnpm install
```

### Configure AI Provider

Set environment variables for your preferred AI provider:

```bash
# Choose provider: openai | anthropic | google | deepseek
export AI_PROVIDER=openai
export AI_MODEL=gpt-4o

# Set the API key for your chosen provider
export OPENAI_API_KEY=sk-xxx
# or
export ANTHROPIC_API_KEY=sk-ant-xxx
# or
export GOOGLE_GENERATIVE_AI_API_KEY=xxx
# or
export DEEPSEEK_API_KEY=xxx
```

### Run Locally

```bash
# Fetch news and generate daily report
pnpm run generate

# Force regenerate (overwrite existing report)
FORCE_REGEN=1 pnpm run generate

# Preview website
pnpm run dev

# Build for production
pnpm run build
```

## Source Configuration

Edit `config/sources.json` to add/remove news sources:

```json
{
  "sources": [
    {
      "name": "Hacker News",
      "type": "api",
      "plugin": "hackernews",
      "maxItems": 15,
      "enabled": true
    },
    {
      "name": "TechCrunch",
      "type": "rss",
      "plugin": "rss",
      "url": "https://techcrunch.com/feed/",
      "maxItems": 10,
      "enabled": true
    }
  ]
}
```

### Built-in Sources (16)

| Source | Type | Plugin |
|--------|------|--------|
| Hacker News | API | `hackernews` |
| Product Hunt | API | `producthunt` |
| GitHub Trending | Crawler | `github-trending` |
| TechCrunch | RSS | `rss` |
| The Verge | RSS | `rss` |
| Ars Technica | RSS | `rss` |
| MIT Technology Review | RSS | `rss` |
| OpenAI Blog | RSS | `rss` |
| Google AI Blog | RSS | `rss` |
| Hugging Face Blog | RSS | `rss` |
| The Gradient | RSS | `rss` |
| arXiv CS.AI | RSS | `rss` |
| arXiv CS.CL | RSS | `rss` |
| WIRED | RSS | `rss` |
| Lobsters | RSS | `rss` |
| DEV Community | RSS | `rss` |

### Writing Custom Plugins

Create a new file in `scripts/fetch/plugins/` implementing the `SourcePlugin` interface:

```typescript
import type { SourcePlugin, SourceConfig, Article } from '../types.js';

const myPlugin: SourcePlugin = {
  name: 'my-plugin',
  type: 'api',
  async fetch(config: SourceConfig): Promise<Article[]> {
    // Your fetching logic here
    return articles;
  }
};

export default myPlugin;
```

Then register it in `scripts/fetch/index.ts`.

## GitHub Actions

The daily workflow runs at **08:00 UTC** every day:

1. Checks out the repo
2. Installs dependencies
3. Runs the fetch + AI generate pipeline
4. Commits and pushes the new daily markdown
5. Cloudflare Pages auto-deploys on push

### Required Secrets

Set these in your GitHub repo **Settings > Secrets**:

- `AI_PROVIDER` — AI provider name
- `AI_MODEL` — Model identifier
- `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY` / `DEEPSEEK_API_KEY` — API key for your chosen provider

### Optional Secrets

- `PRODUCTHUNT_CLIENT_ID` / `PRODUCTHUNT_CLIENT_SECRET` — Product Hunt API (falls back to RSS)
- `WEBHOOK_URL` — Notification webhook endpoint
- `WEBHOOK_TYPE` — One of: `wecom` | `dingtalk` | `feishu` | `slack` | `generic`

## Cloudflare Pages Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Pages
2. Create a project > Connect to your GitHub repo
3. Build settings:
   - **Build command**: `pnpm run build`
   - **Build output directory**: `dist`
4. Done! Every push triggers a new deployment.

## Project Structure

```
ai-news/
├── .github/workflows/daily.yml  # Scheduled pipeline
├── config/
│   └── sources.json             # News source configuration (16 sources)
├── scripts/
│   ├── fetch/
│   │   ├── types.ts             # Core type definitions
│   │   ├── registry.ts          # Plugin registry
│   │   ├── plugins/
│   │   │   ├── rss.ts           # RSS/Atom plugin
│   │   │   ├── api/
│   │   │   │   ├── hackernews.ts
│   │   │   │   └── producthunt.ts
│   │   │   └── crawler/
│   │   │       ├── web-generic.ts
│   │   │       └── github-trending.ts
│   │   └── index.ts             # Fetch orchestrator
│   ├── ai/
│   │   ├── provider.ts          # Multi-provider AI adapter
│   │   ├── prompts.ts           # Prompt templates (global token budget)
│   │   └── index.ts
│   ├── generate.ts              # Markdown generator (dedup + FORCE_REGEN)
│   ├── proxy.ts                 # Proxy + auto-retry
│   ├── notify.mjs               # Webhook notifications
│   └── main.ts                  # Entry point
├── src/                         # Astro website
│   ├── content/daily/           # Generated daily reports
│   ├── layouts/
│   │   └── Layout.astro         # Dark/light theme, progress bar, back-to-top
│   └── pages/
│       ├── index.astro          # Home page
│       └── daily/[...slug].astro # Detail page (TOC, prev/next nav)
├── astro.config.mjs
└── package.json
```

## Cost

- **GitHub Actions**: Free tier — 2,000 min/month (daily run uses ~5 min)
- **Cloudflare Pages**: Free tier — 500 builds/month
- **AI API**: Pay-per-use — typically $1-5/month for daily summaries

## License

MIT
