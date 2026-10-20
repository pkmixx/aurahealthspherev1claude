/**
 * Build-time renderer used by scripts/prerender.mjs (not shipped to browsers).
 * Renders a route to static HTML so crawlers and link previews see real content.
 */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'

export { ROUTES } from '@/config/routes'
export { SITE } from '@/config/site'
export { structuredData } from '@/config/seo'
export { llmsTxt } from '@/config/llms'

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return new Response(prelude).text()
}
