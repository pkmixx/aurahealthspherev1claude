// Automated QA: console errors, horizontal overflow, broken images, broken internal links,
// small touch targets, plus full-page screenshots per breakpoint.
// Usage: npm run build && npx vite preview --port 4173 & node scripts/qa.mjs [outDir]
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.QA_BASE || 'http://localhost:4173'
const OUT = process.argv[2] || 'screenshots'
const PAGES = ['/', '/healthcare', '/wellness', '/corporate-wellness', '/experts', '/about', '/contact', '/disclaimer', '/nope-404']
const WIDTHS = (process.env.QA_WIDTHS || '360,390,768,1024,1280,1440').split(',').map(Number)
const SHOTS = process.env.QA_SHOTS !== '0'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const problems = []
const links = new Set()

for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 800 : 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  const errs = []
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  page.on('pageerror', (e) => errs.push(String(e)))
  page.on('requestfailed', (r) => errs.push('REQUEST FAILED ' + r.url()))
  page.on('response', (r) => r.status() >= 400 && !r.url().includes('nope-404') && errs.push(`HTTP ${r.status()} ${r.url()}`))

  for (const p of PAGES) {
    errs.length = 0
    await page.goto(BASE + p, { waitUntil: 'networkidle' })
    // Scroll through to trigger lazy images/reveals
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)) }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(250)
    const r = await page.evaluate(() => {
      const sw = document.documentElement.scrollWidth, iw = window.innerWidth
      const wide = []
      if (sw > iw) for (const el of document.querySelectorAll('body *')) {
        const b = el.getBoundingClientRect()
        if (b.right > iw + 1 && b.width > 0 && getComputedStyle(el).position !== 'fixed') {
          let clipped = false, a = el.parentElement
          while (a) { const o = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { clipped = true; break } a = a.parentElement }
          if (!clipped) wide.push(el.tagName + '.' + String(el.className).slice(0, 60) + ' right=' + Math.round(b.right))
        }
      }
      const badImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').map((i) => i.src)
      const hrefs = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
      const small = [...document.querySelectorAll('a, button, input, select, textarea')].filter((el) => {
        const b = el.getBoundingClientRect(); const s = getComputedStyle(el)
        return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && (b.height < 40 || b.width < 40) && !el.closest('.sr-only') && !el.closest('p, li p')
      }).map((el) => (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 30) + ` ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`)
      const h1 = document.querySelectorAll('h1').length
      return { sw, iw, wide: wide.slice(0, 5), badImgs, hrefs, small: [...new Set(small)].slice(0, 8), h1, title: document.title }
    })
    r.hrefs.forEach((h) => links.add(h))
    const tag = `[${w}] ${p}`
    if (r.sw > r.iw) problems.push(`${tag} HORIZONTAL OVERFLOW ${r.sw}>${r.iw} ${r.wide.join(' | ')}`)
    if (r.badImgs.length) problems.push(`${tag} BROKEN IMG ${r.badImgs.join(', ')}`)
    if (r.h1 !== 1) problems.push(`${tag} h1 count = ${r.h1}`)
    if (errs.length) problems.push(`${tag} CONSOLE ${[...new Set(errs)].join(' || ')}`)
    if (w === 360 && r.small.length) problems.push(`${tag} small targets: ${r.small.join('; ')}`)
    if (SHOTS) await page.screenshot({ path: `${OUT}/${(p.slice(1) || 'home').replace(/\//g, '_')}-${w}.png`, fullPage: true })
  }
  await ctx.close()
}

// Broken internal links
const ctx = await browser.newContext()
const page = await ctx.newPage()
const internal = [...links].filter((h) => h && h.startsWith('/'))
for (const h of internal) {
  const [path, hash] = h.split('#')
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  const ok = await page.evaluate(([hash]) => {
    const is404 = document.title.startsWith('Page not found')
    return { is404, hashOk: !hash || !!document.getElementById(hash) }
  }, [hash])
  if (ok.is404) problems.push(`LINK 404: ${h}`)
  else if (!ok.hashOk) problems.push(`LINK missing #anchor: ${h}`)
}
await browser.close()
console.log(`Checked ${PAGES.length} pages x ${WIDTHS.length} widths, ${internal.length} internal links.`)
console.log(problems.length ? problems.join('\n') : 'NO PROBLEMS FOUND')
