# Architecture

## Principles

1. **Content is data.** Services, activities, experts, navigation and routes live in `src/data` and `src/config`. Components never hard-code service lists.
2. **Data is serialisable.** Icons are string keys (`'stethoscope'`) resolved by `src/lib/icons.ts`, and images are registry keys resolved by `src/config/images.ts`. That means the same shapes can later come from a CMS or API.
3. **One CTA path.** Every "Contact Us" goes through `contactHref()` in `src/lib/contact.ts`. It produces `/contact?interest=…&topic=…#enquiry`, which pre-fills the form.
4. **Honest Stage 1.** `src/services/enquiry.ts` does not send data. The contact form validates and shows a success state that says clearly the form isn't connected yet. The form is currently hidden at the client's request (`ENQUIRY_FORM_ENABLED = false` in `src/config/site.ts`), so the Contact page shows phone, WhatsApp and email.

## Design system

Tokens live in `src/index.css` (`@theme`):

| Token            | Value                    | Use                                  |
| ---------------- | ------------------------ | ------------------------------------ |
| `navy-950`       | `#070B14`                | Page background                      |
| `navy-900`       | `#0D1424`                | Cards / alternate sections           |
| `electric`       | `#155CFF`                | Accent (large/icons, light surfaces) |
| `cyan`           | `#00D9FF`                | Accent text on dark, focus rings     |
| `silver`         | `#DCE3EA`                | Body text on dark                    |
| `muted`          | `#8D98A8`                | Secondary text on dark               |
| `line`           | `#1D3F82`                | Borders                              |
| Primary gradient | `135deg #155CFF → #00D9FF` | Primary buttons only                 |

- Primary buttons use **navy text** on the gradient. White text would fail contrast on the cyan end.
- `.surface-light` flips a section to light paper (`#F5F8FC`) with ink text, so dark and light sections alternate.
- Utility classes: `.card`, `.card-light`, `.card-hover`, `.icon-badge`, `.chip`, `.eyebrow`, `.field`, `.rule`, `.reveal`.

## Images

| Kind | Location | Size | Used by | Lookup |
| --- | --- | --- | --- | --- |
| Section photos | `src/assets/photos/<slot>-{640,1200}.webp` | 20–90 KB | Heroes, service cards, feature sections | `IMAGES` registry (`src/config/images.ts`) |
| Card thumbnails | `src/assets/thumbs/<id>.webp` | 480×320, ~6–18 KB | Wellness activity cards, corporate area cards | `thumbFor(id)` |
| Mini thumbnails | `src/assets/mini/<id>.webp` | 96×96, ~1–2 KB | Dropdown/mobile menu items, category & subcategory headers | `miniFor(id)` / `<MenuThumb>` |

- All three are discovered with `import.meta.glob`. Adding a file is enough; a missing file falls back to an icon or abstract visual.
- Everything below the fold uses `loading="lazy"`. Menu thumbnails sit inside hidden dropdowns, so they only download when a menu opens.
- Activity cards use a compact side thumbnail on phones and an image-on-top layout from `sm` up, which keeps the mobile page short.

## Motion

- `Reveal` + `useReveal()` use IntersectionObserver to add `.is-visible`, and CSS handles the fade/slide.
- Orbital SVG rings rotate slowly (60–90s).
- `@media (prefers-reduced-motion: reduce)` disables all animation and transitions, and reveals content immediately.

## Accessibility

- Skip link, landmark roles, one `h1` per page, ordered headings.
- Mobile menu: `role="dialog"`, focus trap, Esc to close, focus returned to the trigger.
- Desktop dropdowns: link + separate toggle button with `aria-expanded`; Esc and outside-click close them.
- Wellness tabs follow the WAI-ARIA tabs pattern (arrow keys, Home/End).
- Expert profile uses native `<dialog>` (`showModal`) for focus containment.
- Minimum 44px touch targets. Visible `:focus-visible` rings.

## Performance

- Home is eagerly loaded; the other pages are code-split with `React.lazy`.
- Only the used lucide icons are bundled (tree-shaken).
- Logo served as responsive WebP (`320/640/1100w`) with a PNG fallback.
- Below-the-fold images use `loading="lazy"` and `decoding="async"`.
- No animation libraries.

## SEO

- **Prerendering.** `npm run build` also builds `src/entry-server.tsx` for SSR and runs `scripts/prerender.mjs`. Each route in `src/config/routes.ts` is rendered with `react-dom/static` into `dist/<route>.html` (home → `dist/index.html`, plus a `noindex` `dist/404.html`). Crawlers and link previews (WhatsApp, LinkedIn, X) see real content and per-page tags without running JavaScript.
- **Hydration.** `src/main.tsx` hydrates only when `#root[data-prerendered]` matches the current path. It loads that route's lazy chunk first (`preloadRoute`), so there is no flash. Otherwise (dev server, fallback HTML) it renders on the client. Render output must not depend on browser-only state, because the server has no `?query` or `#hash`. For this reason `useExpertModal` opens `?expert=` profiles only after hydration, and the Wellness page opens the `#activity` accordion in an effect. `ScrollToTop` retries until a `#hash` target is visible. `npm run qa:seo` fails if hydration ever discards the prerendered DOM.
- **Head tags.** `scripts/prerender.mjs` writes title, description, robots, canonical, OG/Twitter and JSON-LD (`src/config/seo.ts`: Organization, WebSite, WebPage, BreadcrumbList, plus FAQPage, Service lists (Healthcare, Wellness, Corporate) and Person entries (Experts), built from `site.ts` and `src/data/` only) between the `<!--seo:start/end-->` markers in `index.html`. `useDocumentMeta()` keeps them in sync during client-side navigation.
- `public/robots.txt`. `scripts/generate-sitemap.mjs` (run by `build`) writes `sitemap.xml` from `src/config/routes.ts`.

## AEO (answer engines: Google AI Overviews, Bing/Copilot, ChatGPT, Perplexity, Claude)

- **Primary search focus: wellness activities and health camps** (client, 2026-10-20). This is applied only to what search engines and AI read; the visible layout is unchanged:
  - titles and descriptions in `src/config/routes.ts` lead with them
  - Organization `knowsAbout` lists them first
  - each health camp type and each of the 40 activities is its own `Service` (in `OfferCatalog`s) on Home, Healthcare, Wellness and Corporate
  - `WELLNESS_ACTIVITIES_FAQ` / `HEALTH_CAMPS_FAQ` lead the FAQs
  - `llms.txt` opens with them

- **FAQs.** `src/data/faqs.ts` holds question → answer pairs per route (Home, Healthcare, Wellness, Corporate Wellness, Experts, Contact). `<FAQSection />` renders them visibly (answers are in the HTML even when collapsed) and `seo.ts` emits the identical text as FAQPage JSON-LD. Answers are generated from the service, expert, disclaimer and contact data, so they stay in sync. Add a page's FAQs to `FAQS` and drop `<FAQSection />` into the page.
- **`/llms.txt`.** `src/config/llms.ts` builds a Markdown summary of the site (pages, services, activities, corporate areas, experts, contact, all FAQs, disclaimer) per [llmstxt.org](https://llmstxt.org). `scripts/prerender.mjs` writes it to `dist/llms.txt`.
- **Crawlers.** `public/robots.txt` allows everyone and names the AI search/answer crawlers explicitly (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot, …). To opt out of AI *training* while staying in AI *search*, add `Disallow: /` groups for `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended` and `CCBot`; this is the client's call.
- `npm run qa:seo` checks that FAQPage exists on exactly the FAQ pages, that every question and answer appears in the raw HTML, and that `/llms.txt` and the robots rules are served.

## Hosting (production)

- Production runs on **Apache 2.4 on AWS EC2**, behind Let's Encrypt (`certbot --apache`). `http://` and `www.` redirect to `https://aurasphere.co.in`. The full vhost is mirrored in `deploy/apache-aurasphere.conf`, and the live file is `/etc/apache2/sites-available/aurasphere-le-ssl.conf`.
- The `:443` vhost needs these rules instead of `FallbackResource /index.html`:
  ```apache
  RewriteEngine On
  # /healthcare (or /healthcare/) → /healthcare.html
  RewriteCond %{DOCUMENT_ROOT}$1.html -f
  RewriteRule ^(/.+?)/?$ $1.html [L]
  ErrorDocument 404 /404.html
  # robots.txt, llms.txt and sitemap.xml contain UTF-8 (°, —)
  AddCharset UTF-8 .txt .xml
  ```
  Run `a2enmod rewrite headers` if needed. Without the rewrite, every route falls back to the prerendered home page. The app still works, but the SEO gain is lost.
- Caching: `/assets/` (hashed) is `immutable` for a year, and HTML is `no-cache`.
- Redeploy steps are in `PROGRESS.md`.
