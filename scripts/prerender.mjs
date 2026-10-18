// Prerenders every route to static HTML after `vite build`, so search engines and
// link previews (WhatsApp, LinkedIn, X…) get real content and per-page meta tags.
// Expects the client build in dist/ and the SSR build (src/entry-server.tsx) in dist-ssr/.
// Output: dist/index.html (home), dist/<route>.html, dist/404.html.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render, ROUTES, SITE, structuredData } = await import(
  pathToFileURL(resolve('dist-ssr/entry-server.js')).href
)
const template = readFileSync('dist/index.html', 'utf8')

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headTags({ path, title, description, noindex }) {
  const url = path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`
  const image = `${SITE.url}${SITE.ogImage}`
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]
  if (!noindex) {
    const ld = JSON.stringify(structuredData(path, title, description)).replace(/</g, '\u003c')
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<script type="application/ld+json">${ld}</script>`,
    )
  }
  return tags.map((t) => `    ${t}`).join('\n')
}

async function page(route, file) {
  let body = await render(route.path)
  // Scroll-reveal state is added in the browser; start every section un-revealed.
  body = body.replace(/ is-visible/g, '')
  const html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headTags(route).trimStart())
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${route.path}">${body}</div>`)
  if (html.includes('<div id="root"></div>')) throw new Error(`root not filled for ${route.path}`)
  writeFileSync(file, html)
  console.log(`[prerender] ${route.path.padEnd(20)} → ${file}`)
}

for (const route of Object.values(ROUTES)) {
  await page(route, route.path === '/' ? 'dist/index.html' : `dist${route.path}.html`)
}
await page(
  {
    path: '/404',
    title: 'Page not found | AURASPHERE Wellness 360',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  },
  'dist/404.html',
)
rmSync('dist-ssr', { recursive: true, force: true })
