import { defineConfig } from 'astro/config';

// GitHub Project Pages: https://<user>.github.io/<repo>/
// Override via env for custom domains (set BASE_PATH=/ and SITE_URL=https://example.com).
const repo = 'actions-HN002-ai-news';
const site = process.env.SITE_URL || 'https://xiaoqianran.github.io';
const base = process.env.BASE_PATH || `/${repo}`;

/** Prefix root-absolute href/src in Markdown so /news/... works under project Pages base. */
function rehypePrefixBase(basePath) {
  const prefix = basePath === '/' ? '' : basePath.replace(/\/$/, '');
  return () => (tree) => {
    const walk = (node) => {
      if (node?.type === 'element' && node.properties) {
        for (const key of ['href', 'src']) {
          const v = node.properties[key];
          if (
            typeof v === 'string' &&
            v.startsWith('/') &&
            !v.startsWith('//') &&
            (prefix === '' || !v.startsWith(prefix + '/'))
          ) {
            node.properties[key] = prefix + v;
          }
        }
      }
      if (Array.isArray(node?.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site,
  base,
  output: 'static',
  markdown: {
    rehypePlugins: [rehypePrefixBase(base)],
  },
});
