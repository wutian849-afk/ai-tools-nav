const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://wutian849-afk.github.io/ai-tools-nav';
const ARTICLE_DIR = '/mnt/c/Users/Aming/Desktop/articles';
const DOMAIN = 'wutian849-afk.github.io';

// ===================== 1. SITEMAP.XML =====================
const articleFiles = fs.readdirSync(ARTICLE_DIR)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .sort();

let urls = [];

// Main pages
urls.push({ loc: `${BASE_URL}/`, priority: 1.0, changefreq: 'weekly' });
urls.push({ loc: `${BASE_URL}/articles/`, priority: 0.9, changefreq: 'daily' });

// All articles
articleFiles.forEach((f, i) => {
  urls.push({
    loc: `${BASE_URL}/articles/${encodeURIComponent(f)}`,
    priority: (articleFiles.length - i > 10) ? '0.7' : '0.6',
    changefreq: 'monthly',
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('/mnt/c/Users/Aming/Desktop/sitemap.xml', sitemap);
console.log(`✅ Sitemap: ${urls.length} URLs`);

// ===================== 2. ROBOTS.TXT =====================
const robots = `# https://www.robotstxt.org/
User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync('/mnt/c/Users/Aming/Desktop/robots.txt', robots);
console.log('✅ Robots.txt created');

// ===================== 3. GOOGLE SEARCH CONSOLE VERIFICATION =====================
// Generate verification HTML file
const verifyHtml = `<!DOCTYPE html>
<html><head>
<meta name="google-site-verification" content="REPLACE_ME_WITH_YOUR_CODE" />
</head><body>
<p>Google Search Console verification file for ${DOMAIN}</p>
</body></html>`;

fs.writeFileSync('/mnt/c/Users/Aming/Desktop/googleXXXXXXX.html', verifyHtml);
console.log('✅ Google Search Console verification template created');

// ===================== 4. PUSH SCRIPTS =====================

// Bing Webmaster batch URL submission script
const pushBing = `#!/bin/bash
# Bing URL Submission
# Get your API key from: https://www.bing.com/webmaster/
API_KEY="REPLACE_ME"
BASE="${BASE_URL}"

echo "Submitting URLs to Bing..."
curl -s -X POST \\
  "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=\${API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "siteUrl": "${BASE_URL}/",
    "urlList": [
${urls.slice(0, 100).map(u => `      "${u.loc}"`).join(',\n')}
    ]
  }'

echo "Done!"
`;

// Google Indexing API submission (Node.js)
const pushGoogle = `// Google Indexing API submission
// Prerequisites:
// 1. Go to https://console.cloud.google.com/ -> Enable Indexing API
// 2. Create Service Account -> Download JSON key
// 3. Verify site ownership in Google Search Console
// 4. Add service account email as owner in Search Console

const fs = require('fs');
const { GoogleAuth } = require('google-auth-library');

const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing';

async function submitUrl(auth, url) {
  const res = await auth.request({
    method: 'POST',
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    data: { url, type: 'URL_UPDATED' },
  });
  return res.data;
}

async function main() {
  const auth = new GoogleAuth({
    keyFile: 'service-account.json',  // Download from GCP Console
    scopes: INDEXING_SCOPE,
  });
  const client = await auth.getClient();

  const urls = ${JSON.stringify(urls.map(u => u.loc), null, 2)};

  for (const url of urls) {
    try {
      const result = await submitUrl(client, url);
      console.log('✓', url, '->', result.urlNotificationMetadata?.latestUpdate?.type || 'OK');
    } catch (e) {
      if (e.response?.status === 429) {
        console.log('⏳ Rate limited, waiting 1s...');
        await new Promise(r => setTimeout(r, 1000));
      } else {
        console.error('✗', url, e.message);
      }
    }
    await new Promise(r => setTimeout(r, 200));  // 5 req/s rate limit
  }
}

main().catch(console.error);
`;

fs.writeFileSync('/mnt/c/Users/Aming/Desktop/push-to-bing.sh', pushBing);
fs.writeFileSync('/mnt/c/Users/Aming/Desktop/push-to-google.js', pushGoogle);
console.log('✅ Push scripts created');

// ===================== 5. CHECK FOR BAD FILENAMES =====================
const badFiles = articleFiles.filter(f => f.length > 100 || f.includes('..') || f.includes('//'));
if (badFiles.length) {
  console.log(`⚠️  ${badFiles.length} files with potentially problematic names:`);
  badFiles.forEach(f => console.log(`   ${f}`));
} else {
  console.log('✅ All filenames look clean');
}

console.log('\n📋 下一步操作:');
console.log('   1. 把 sitemap.xml 和 robots.txt 放到网站根目录');
console.log('   2. 打开 https://search.google.com/search-console');
console.log('   3. 添加你的网站: https://wutian849-afk.github.io/ai-tools-nav/');
console.log('   4. 验证所有权 -> 上传 googleXXXXXXX.html');
console.log('   5. 提交 sitemap.xml');
console.log('\n🐦 或者我一步到位全部搞定？只需要你回答一个问题:');
console.log('   "要不要我帮你注册/登录 Google Search Console 并提交收录？"');
