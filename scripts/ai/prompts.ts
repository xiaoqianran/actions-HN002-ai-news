import type { Article } from '../fetch/types.js';

export function buildDailyPrompt(groupedArticles: Record<string, Article[]>, date: string): string {
  let articleList = '';

  for (const [source, articles] of Object.entries(groupedArticles)) {
    articleList += `\n## Source: ${source}\n`;
    for (const article of articles) {
      articleList += `- Title: ${article.title}\n`;
      articleList += `  URL: ${article.url}\n`;
      articleList += `  Content: ${article.content.slice(0, 13000)}\n`;
      if (article.author) articleList += `  Author: ${article.author}\n`;
      articleList += '\n';
    }
  }

  return `You are a professional tech news editor. Generate a Chinese daily news digest for ${date}.

Here are today's articles from various sources:

${articleList}

Please generate a well-structured Markdown news digest following these rules:

1. Group articles by source
2. For each article, provide:
   - The original English title
   - A Chinese translation of the title (Skip this line if the translation is identical to the English title, such as code repository names)
   - A comprehensive Chinese summary (1-2 substantial paragraphs, detailing the core features, facts, and context naturally for Chinese readers)
   - The original article link
3. Summarize ALL provided articles (skip only exact duplicates). Even if an article only has a title and a score (like Hacker News), you MUST include it and write a brief summary based on its title. Do not aggressively filter them out.
4. Add a brief "今日要点" (Today's Highlights) section at the top with 3-5 key takeaways in Chinese only.

Output format (Markdown only, no code fences):

## 今日要点

- [要点 1]
- [要点 2]
- [要点 3]

---

## Source Name

### Article Title
### 中文标题 (Omit this line entirely if identical to the Article Title)

中文详细摘要段落。

[Read more →](url)

---

(repeat for each article)`;
}
