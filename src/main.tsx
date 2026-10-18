import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/sora/wght.css'
import '@fontsource-variable/inter/wght.css'
import './index.css'
import { App, preloadRoute } from './App'
import { ROUTES } from './config/routes'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered (scripts/prerender.mjs): hydrate them in place.
// In dev, or when the server falls back to another page's HTML, render on the client.
const path = window.location.pathname.replace(/(.)\/$/, '$1')
const prerendered = container.dataset.prerendered
const isKnownRoute = Object.values(ROUTES).some((r) => r.path === path)
if (prerendered === path || (prerendered === '/404' && !isKnownRoute)) {
  preloadRoute(path).finally(() => hydrateRoot(container, app))
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
