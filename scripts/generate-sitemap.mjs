// Generates dist/sitemap.xml from the route list in src/config/routes.ts.
// Runs as part of `npm run build`. SITE_URL defaults to the production domain.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://aurasphere.co.in').replace(/\/$/, '')
if (!existsSync('dist')) {
  console.error('[sitemap] dist/ not found. Run `npm run build` first.')
  process.exit(1)
}

const source = readFileSync('src/config/routes.ts', 'utf8')
const paths = [...source.matchAll(/path:\s*'(\/[^']*)'/g)].map((m) => m[1])
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync('dist/sitemap.xml', xml)
console.log(`[sitemap] Wrote ${paths.length} URLs to dist/sitemap.xml`)
