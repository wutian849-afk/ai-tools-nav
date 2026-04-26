const fs = require('fs');

// ===== 100篇文章配置 =====
const articles = [];

const tools = [
  "ChatGPT", "Claude", "Gemini", "DeepSeek", "Notion AI", "Gamma",
  "Midjourney", "Stable Diffusion", "DALL·E 3", "Leonardo AI", "ComfyUI", "Ideogram", "Magnific AI",
  "可灵 Kling", "Sora", "Runway Gen-3", "Pika", "剪映", "Descript", "HeyGen",
  "Cursor", "GitHub Copilot", "Windsurf", "Claude Code", "Replit", "Bolt", "V0",
  "Suno", "Udio", "AIVA",
  "Figma AI", "Canva AI", "Relay", "Krea AI", "Phot.ai",
  "Luma AI", "Meshy",
  "ElevenLabs", "Whisper", "Fish Audio",
  "NotebookLM", "Otter.ai", "Motion", "Tome",
  "Perplexity", "Jasper", "Typeface", "Grammarly",
];

const categories = [
  "AI Writing", "AI Image", "AI Video", "AI Coding", "AI Music",
  "AI Design", "AI 3D", "AI Voice", "AI Productivity", "AI Marketing"
];

const template = (title, h1, content, keywords) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${content.slice(0, 155)}...">
<meta name="keywords" content="${keywords}">
<link rel="canonical" href="https://wutian849-afk.github.io/ai-tools-nav/articles/${encodeURIComponent(h1.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g,'-'))}.html">
<!-- Open Graph -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${content.slice(0, 155)}...">
<meta property="og:type" content="article">
<meta property="og:url" content="https://wutian849-afk.github.io/ai-tools-nav/articles/${encodeURIComponent(h1.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g,'-'))}.html">
<!-- Schema Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title}",
  "description": "${content.slice(0, 155)}...",
  "datePublished": "2026-04-26",
  "author": {"@type": "Person", "name": "AI导航编辑部"}
}
</script>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#e0e0e0;line-height:1.8;max-width:800px;margin:0 auto;padding:40px 24px}
h1{font-size:32px;margin-bottom:8px;background:linear-gradient(135deg,#8b8bff,#ff6b9d);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.meta{color:#666;font-size:14px;margin-bottom:32px}
h2{font-size:22px;margin:32px 0 16px;color:#fff;border-left:4px solid #8b8bff;padding-left:16px}
h3{font-size:18px;margin:24px 0 12px;color:#ccc}
p{margin:0 0 16px;color:#bbb}
a{color:#8b8bff}
ul{color:#bbb;padding-left:24px;margin-bottom:16px}
li{margin-bottom:8px}
.back{display:inline-block;margin-bottom:24px;color:#888;text-decoration:none;font-size:14px}
.back:hover{color:#8b8bff}
.keyword{display:inline-block;background:rgba(139,139,255,.1);border:1px solid rgba(139,139,255,.2);padding:2px 10px;border-radius:4px;font-size:12px;color:#8b8bff;margin:2px}
.footer{text-align:center;margin-top:60px;padding-top:24px;border-top:1px solid #1a1a2e;color:#555;font-size:13px}
</style>
</head>
<body>
<a class="back" href="/">← 返回AI工具导航</a>
<h1>${h1}</h1>
<div class="meta">📅 2026-04-26 · 📂 ${keywords.split(',')[0]} · ☕ 约${Math.ceil(content.length/400)}分钟阅读</div>
${content.split('\n').filter(Boolean).map(p => `<p>${p.trim()}</p>`).join('')}
<div style="margin-top:40px;padding:24px;background:#111120;border-radius:12px;border:1px solid #1a1a2e">
<p style="margin:0;color:#888;font-size:14px;text-align:center">🌟 发现更多AI工具 → <a href="/">AI工具导航站</a></p>
</div>
<div class="footer">
<p>© 2026 AI导航 — 发现最好的AI工具 | <a href="/">首页</a></p>
</div>
</body>
</html>`;

// Generate 100 articles
for (let i = 0; i < 100; i++) {
  const tool = tools[i % tools.length];
  const cat = categories[i % categories.length];
  const n = Math.floor(i/5) + 1;

  const titles = [
    `${tool} vs ChatGPT: Which ${cat} Tool Wins in 2026? `,
    `How to Use ${tool} as a Pro: Complete ${cat} Guide `,
    `Top ${n} ${cat} Tools You Must Try in 2026 `,
    `${tool} Review: Is This the Best ${cat} Tool? `,
    `${tool} vs Competitors: ${cat} Comparison & Pricing `,
    `Free ${cat} Tools: ${tool} and Beyond `,
    `${tool} Tutorial: Step-by-Step ${cat} Guide for Beginners `,
    `Best ${cat} Tools Like ${tool} in 2026 `,
    `${tool} vs Open Source: Which ${cat} Tool Should You Choose? `,
    `Why ${tool} Is Changing the ${cat} Landscape `,
    `10 Tips to Master ${tool} for ${cat} `,
    `${tool} vs Alternative: ${cat} Tool Comparison `,
    `How ${tool} Transforms Your ${cat} Workflow `,
    `Ultimate ${tool} Guide: Features, Pricing & Tips `,
    `${n} Reasons Why ${tool} Is the Best ${cat} Tool `,
    `${tool} for Beginners: Getting Started with ${cat} `,
    `AutoGPT vs ${tool}: Which ${cat} AI Tool Performs Better? `,
    `The Rise of ${tool} in ${cat}: What You Need to Know `,
    `Best ${cat} Tools: ${tool} + 5 More You Should Try `,
    `How to Make Money with ${tool} and Other ${cat} Tools `,
  ];

  const keywords = `${cat}, ${tool}, AI tools, ${cat.replace(/ /g,'')}tools, best AI tools 2026`;
  const h1 = titles[i % titles.length];

  // Generate ~800 word content
  const paras = [];
  paras.push(`The ${cat} landscape has been transformed by artificial intelligence, with ${tool} leading the charge in 2026. Whether you are a seasoned professional or just starting out, understanding how to leverage ${tool} can dramatically improve your productivity and output quality. In this comprehensive guide, we explore everything you need to know about ${tool}, including its features, pricing, use cases, and how it compares to other top ${cat} tools on the market.`);
  paras.push(`What Makes ${tool} Stand Out in the Crowded ${cat} Market? The AI tools ecosystem has exploded in recent years, with dozens of platforms vying for attention. ${tool} distinguishes itself through a combination of advanced machine learning algorithms, intuitive user interface, and affordable pricing tiers. Unlike many competitors, ${tool} offers both free and premium options, making it accessible to users at every budget level. Its ability to handle complex ${cat} tasks with minimal input has made it a favorite among content creators, marketers, and developers alike.`);
  paras.push(`Key Features of ${tool} That Users Love. When evaluating the best ${cat} tools, several features set ${tool} apart from alternatives like ChatGPT, Claude, and Gemini. First, its processing speed - ${tool} delivers results in seconds rather than minutes. Second, the quality of output consistently exceeds industry benchmarks. Third, ${tool} supports multiple languages and formats, making it truly versatile for global users. Fourth, the platform regularly updates its algorithms based on user feedback, ensuring it stays ahead of the curve. Fifth, ${tool} offers seamless integration with popular productivity suites, cloud storage platforms, and API access for developers.`);
  paras.push(`How Does ${tool} Compare to ChatGPT, Claude, and Other ${cat} Tools? In head-to-head comparisons, ${tool} often outperforms general-purpose AI assistants like ChatGPT when it comes to specialized ${cat} tasks. While ChatGPT excels at conversation and broad knowledge tasks, ${tool} has been fine-tuned specifically for ${cat} workflows. Claude offers strong analytical capabilities but lags behind ${tool} in terms of speed and ease of use. Gemini provides multimodal support but lacks the depth of ${tool}'s specialized ${cat} features. For users seeking the best ${cat} tools in 2026, ${tool} represents the optimal balance of performance, price, and user experience.`);
  paras.push(`Pricing and Value: Is ${tool} Worth the Investment? ${tool} offers a tiered pricing structure designed to accommodate different user needs. The free tier provides access to core features with reasonable usage limits - perfect for casual users and those exploring ${cat} AI tools for the first time. The pro tier, priced competitively against ChatGPT Plus and Claude Pro, unlocks advanced features, higher limits, and priority support. For power users and enterprises, ${tool} offers custom plans with dedicated infrastructure, team collaboration features, and API access. When compared to other ${cat} tools like Midjourney, Runway Gen-3, or Cursor, ${tool} delivers exceptional value at each price point.`);
  paras.push(`Real-World Applications of ${tool} in ${cat}. Users across industries are finding creative ways to incorporate ${tool} into their workflows. Content creators use it to generate ideas, draft copy, and edit content 10x faster. Developers integrate ${tool}'s API into their applications to add intelligent ${cat} capabilities. Marketers leverage ${tool} to create campaign assets, analyze performance, and optimize content for SEO. Educators use it to develop learning materials and provide personalized feedback to students. These diverse use cases demonstrate why ${tool} has become an essential tool in the modern ${cat} toolkit.`);
  paras.push(`Tips for Getting the Most Out of ${tool}. To maximize your experience with ${tool}, start by exploring its default settings and gradually customize them to match your specific ${cat} requirements. Pay attention to the prompts you use - well-crafted inputs produce significantly better outputs. Take advantage of ${tool}'s template library to jumpstart common ${cat} tasks. Join the ${tool} community forums to learn from power users and stay updated on new features. And finally, combine ${tool} with other AI tools like Stable Diffusion for image generation or Suno for music creation to create comprehensive multimedia workflows.`);
  paras.push(`The Future of ${cat} and ${tool}. As artificial intelligence continues to evolve at breakneck speed, ${tool} is positioned at the forefront of ${cat} innovation. Upcoming features include enhanced multimodal capabilities, real-time collaboration tools, and deeper integration with existing software ecosystems. The team behind ${tool} has announced plans to incorporate advanced reasoning capabilities inspired by models like DeepSeek and o1, promising even more powerful ${cat} functionality. For anyone serious about staying competitive in the AI-driven landscape, mastering tools like ${tool} is not just an option - it is a necessity.`);
  paras.push(`Conclusion: Is ${tool} Right for Your ${cat} Needs? After thorough analysis, it is clear that ${tool} ranks among the best AI tools available in 2026 for ${cat} applications. Its combination of powerful features, reasonable pricing, and excellent user experience makes it suitable for beginners and professionals alike. While no single tool can address every need, ${tool} covers an impressive range of ${cat} use cases with reliability and consistency. We recommend trying the free tier first to experience its capabilities firsthand, then upgrading to a paid plan as your needs grow. The ${cat} tools landscape continues to evolve rapidly, but ${tool} has earned its place as a top contender.`);

  const content = paras.map(p => `<p>${p}</p>`).join('\n');

  // Create filename
  const slug = h1.replace(/[^a-zA-Z0-9\u4e00-\u9fa5-\s]/g,'').replace(/\s+/g,'-').toLowerCase();
  const html = template(`${h1}| AI导航`, h1, paras.join(' '), keywords).trim();

  articles.push({ slug, html, title: h1, cat });
}

// Write all files
const dir = '/mnt/c/Users/Aming/Desktop/articles';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

let indexContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI工具文章库 - ${articles.length}篇SEO优化文章</title>
<meta name="description" content="${articles.length}篇AI工具深度评测、对比、教程文章，覆盖ChatGPT、Claude、Midjourney、Cursor等热门AI工具，SEO优化，快速被谷歌收录">
<meta name="keywords" content="AI工具, ChatGPT, Claude, Midjourney, AI写作, AI绘画, AI编程">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#e0e0e0;max-width:900px;margin:0 auto;padding:40px 24px;line-height:1.6}
h1{font-size:28px;margin-bottom:8px;background:linear-gradient(135deg,#8b8bff,#ff6b9d);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sub{color:#888;margin-bottom:32px;font-size:14px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.card{background:#111120;border:1px solid #1a1a2e;border-radius:12px;padding:16px;transition:all .2s}
.card:hover{border-color:#8b8bff;transform:translateY(-2px)}
.card a{color:#ddd;text-decoration:none;font-size:14px;line-height:1.4;display:block}
.card a:hover{color:#8b8bff}
.card .cat{font-size:11px;color:#666;margin-top:6px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.header a{color:#8b8bff;font-size:14px;text-decoration:none}
.footer{text-align:center;margin-top:60px;padding-top:24px;border-top:1px solid #1a1a2e;color:#555;font-size:13px}
.stats{display:flex;gap:24px;margin-bottom:32px;flex-wrap:wrap}
.stat{background:#111120;border:1px solid #1a1a2e;border-radius:8px;padding:12px 20px;text-align:center}
.stat .num{font-size:24px;font-weight:700;background:linear-gradient(135deg,#8b8bff,#ff6b9d);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat .label{font-size:12px;color:#666;margin-top:4px}
</style>
</head>
<body>
<div class="header">
<h1>📚 AI工具文章库</h1>
<a href="/">← 返回导航首页</a>
</div>
<p class="sub">${articles.length}篇SEO优化文章 | 覆盖AI写作/绘画/视频/编程/设计 | 谷歌SEO友好</p>
<div class="stats">
<div class="stat"><div class="num">${articles.length}</div><div class="label">文章总数</div></div>
<div class="stat"><div class="num">${new Set(articles.map(a=>a.cat)).size}</div><div class="label">覆盖分类</div></div>
<div class="stat"><div class="num">~80,000</div><div class="label">总字数</div></div>
</div>
<div class="grid">`;

articles.forEach((a, i) => {
  indexContent += `
<div class="card">
  <a href="articles/${a.slug}.html">${i+1}. ${a.title}</a>
  <div class="cat">📂 ${a.cat}</div>
</div>`;
});

indexContent += `
</div>
<div class="footer">
<p>© 2026 AI导航 — 发现最好的AI工具 | <a href="/">首页</a></p>
</div>
</body>
</html>`;

// Write index
fs.writeFileSync('/mnt/c/Users/Aming/Desktop/articles/index.html', indexContent);

// Write all articles
let count = 0;
articles.forEach(a => {
  fs.writeFileSync(`${dir}/${a.slug}.html`, a.html);
  count++;
});

console.log(`✅ 生成完成！`);
console.log(`   - 文章: ${count} 篇`);
console.log(`   - 目录: ${dir}`);
console.log(`   - 索引页: /mnt/c/Users/Aming/Desktop/articles/index.html`);
console.log(`   - 覆盖分类: ${[...new Set(articles.map(a=>a.cat))].join(', ')}`);
