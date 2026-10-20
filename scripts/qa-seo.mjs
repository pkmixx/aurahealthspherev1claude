// SEO/AEO QA for the prerendered build: each route's raw HTML (what crawlers see before
// JavaScript) must carry its own title, description, canonical, JSON-LD and h1, and
// hydration must not log errors. FAQ pages must show every FAQPage question in the
// HTML, and /llms.txt and robots.txt must be served.
// Usage: npm run build && npx vite preview --port 4173 & node scripts/qa-seo.mjs
import { chromium } from 'playwright'

const BASE = process.env.QA_BASE || 'http://localhost:4173'
const SITE = 'https://aurasphere.co.in'
const PAGES = ['/', '/healthcare', '/wellness', '/corporate-wellness', '/experts', '/about', '/contact', '/disclaimer']
const FAQ_PAGES = ['/', '/healthcare', '/wellness', '/corporate-wellness', '/experts', '/contact']
const unescape = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const problems = []
const titles = new Set()

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage()
const logs = []
page.on('console', (m) => ['error', 'warning'].includes(m.type()) && logs.push(m.text().slice(0, 300)))
page.on('pageerror', (e) => logs.push('pageerror: ' + e))
// Tag the prerendered h1 before the app boots; if hydration fails React rebuilds the DOM and the tag is lost.
await page.addInitScript(() =>
  document.addEventListener('DOMContentLoaded', () => document.querySelector('h1')?.setAttribute('data-qa-ssr', '')),
)

for (const p of PAGES) {
  const raw = await (await fetch(BASE + p)).text()
  const title = raw.match(/<title>(.*?)<\/title>/)?.[1]
  const desc = raw.match(/<meta name="description" content="([^"]*)"/)?.[1]
  const canonical = raw.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
  const expected = p === '/' ? `${SITE}/` : SITE + p
  if (!title) problems.push(`${p} no <title>`)
  else if (titles.has(title)) problems.push(`${p} duplicate title "${title}"`)
  titles.add(title)
  if (!desc || desc.length < 70 || desc.length > 170) problems.push(`${p} description length ${desc?.length ?? 0}`)
  if (canonical !== expected) problems.push(`${p} canonical ${canonical} ≠ ${expected}`)
  if ((raw.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${p} raw HTML h1 count ≠ 1`)
  const ld = raw.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1]
  let graph = []
  try {
    graph = JSON.parse(ld)['@graph']
  } catch {
    problems.push(`${p} missing/invalid JSON-LD`)
  }
  const faq = graph.find((n) => n['@type'] === 'FAQPage')
  if (FAQ_PAGES.includes(p) !== !!faq) problems.push(`${p} FAQPage ${faq ? 'unexpected' : 'missing'}`)
  const text = unescape(raw)
  for (const q of faq?.mainEntity ?? []) {
    if (!text.includes(q.name)) problems.push(`${p} FAQ question not in HTML: "${q.name}"`)
    if (!text.includes(q.acceptedAnswer.text)) problems.push(`${p} FAQ answer not in HTML: "${q.name}"`)
  }

  logs.length = 0
  await page.goto(BASE + p, { waitUntil: 'networkidle' })
  const [live, kept] = await page.evaluate(() => [document.title, !!document.querySelector('h1[data-qa-ssr]')])
  if (!kept) problems.push(`${p} prerendered DOM was replaced (hydration mismatch)`)
  if (live !== title?.replace(/&amp;/g, '&')) problems.push(`${p} title after hydration "${live}"`)
  if (logs.length) problems.push(`${p} console: ${logs.join(' | ')}`)
  console.log(`${p.padEnd(20)} ${title}`)
}

const llms = await fetch(BASE + '/llms.txt')
const llmsText = await llms.text()
if (!llms.ok || !llmsText.startsWith('# ') || !llmsText.includes(SITE)) problems.push('/llms.txt missing or malformed')
const robots = await (await fetch(BASE + '/robots.txt')).text()
for (const bot of ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']) {
  if (!robots.includes(`User-agent: ${bot}`)) problems.push(`robots.txt does not name ${bot}`)
}
if (/^Disallow:\s*\/\s*$/m.test(robots)) problems.push('robots.txt disallows the whole site')

const notFound = await (await fetch(BASE + '/404.html')).text()
if (!notFound.includes('noindex')) problems.push('404.html is missing noindex')

await browser.close()
console.log(problems.length ? `\n${problems.length} problem(s):\n- ${problems.join('\n- ')}` : '\nSEO QA: no problems')
process.exit(problems.length ? 1 : 0)
