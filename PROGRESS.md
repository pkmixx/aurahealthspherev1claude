# PROGRESS — AURASPHERE Wellness 360 (Stage 1)

> Living log so work can be resumed at any time. Update at every milestone.
> Spec: `prompt.txt` · Docs: `README.md`, `docs/`

_Last updated: 2026-09-21_

## Status at a glance

| Area                                   | Status |
| -------------------------------------- | ------ |
| Project scaffold (Vite/React/TS/Tailwind v4) | ✅ Done |
| Design system / tokens / motion        | ✅ Done |
| Content data layer (services, 40 activities, experts) | ✅ Done |
| Home (hero + 8 sections + AI "coming soon") | ✅ Done |
| Healthcare page                        | ✅ Done |
| Wellness page (search, filter, mobile accordions) | ✅ Done |
| Corporate Wellness page                | ✅ Done |
| Experts page + profile modal (`?expert=id`) | ✅ Done |
| About page                             | ✅ Done |
| Contact page (validation, honest success state) | ✅ Done |
| Health disclaimers (`/disclaimer` + contextual notes) | ✅ Done |
| 404 page                               | ✅ Done |
| SEO basics (meta, OG, canonical, robots, sitemap script) | ✅ Done |
| Automated QA script (`scripts/qa.mjs`) | ✅ Done — last run: no problems |
| Visual QA pass (390 / 1440 reviewed)   | ✅ Done |
| Interaction QA (`scripts/qa-interactions.mjs`, 26 checks) | ✅ All pass |
| Realistic photography                  | ⏸ Blocked (see below) |
| Client contact details / social links  | ⏸ Waiting on client |

## Resume here — next steps

1. Optional polish: review the 768 / 1024 screenshots in detail. The automated checks already pass at all six widths.
2. Generate photos once Gemini credits are topped up: `python scripts/generate-images.py`. Then review every image for realism (no obviously AI-looking faces, no text or logos).
3. Re-run QA: `npm run build && npx vite preview --port 4173` then `node scripts/qa.mjs`.
4. Commit + push with updated docs.

## Blockers / open items

- **Gemini image generation:** `GEMINI_API_KEY` is present, but the project's prepaid credits are used up (HTTP 402 on every image model). Script is ready at `scripts/generate-images.py`. Until then, image slots show branded abstract visuals (by design, with no broken images).
- **Canva:** connected on claude.ai but needs authentication in Claude Code (`/mcp` → claude.ai Canva).
- **Client inputs needed:** phone, email, WhatsApp, address, hours (`src/config/site.ts`), social URLs, production domain (`VITE_SITE_URL`), and legal review of the disclaimer copy (`src/data/disclaimers.ts`).

## Key decisions (and why)

- **Doctor profiles:** used credentials + areas of interest only. Omitted hospital branding and affiliation (the PDFs are hospital-branded, and showing it would imply a partnership), plus years, procedure counts and awards. See `docs/CONTENT.md`.
- **Kunjan Paul:** used roles, session topics and qualifications from the 4 profiles. Omitted Trion Academy branding, contacts, client logos, stats and testimonials.
- **Contact form:** no backend. `submitEnquiry()` is a no-op, and the success state says clearly the form was *not sent*. If `CONTACT.email` is set, it offers a real "Send via email" (mailto) fallback.
- **Primary button text is navy**, not white. White fails contrast on the cyan end of the gradient.
- **Photos auto-discovered** from `src/assets/photos/<name>-{640,1200}.webp` via `import.meta.glob`, so no code changes are needed when they're added.
- **AI section** is labelled "Planned" everywhere, is non-interactive and makes no diagnostic claims.
- **Emergency number:** 112 (India national emergency number).
- **Client PDFs are never committed** (`.gitignore`: `*.pdf`, `Aurasphere Image`).

## Commands

```bash
npm run dev                 # dev server
npm run build               # typecheck + build
npx vite preview --port 4173 &  node scripts/qa.mjs   # automated QA + screenshots
python scripts/generate-images.py                     # photos (needs Gemini credits)
SITE_URL=https://domain npm run sitemap               # sitemap after build
```

## Log

- **2026-09-21**
  - Scaffolded the project.
  - Extracted the logo and expert portraits from the client files.
  - Built all pages, components and the data layer.
  - Added health disclaimers and the AI "coming soon" section.
  - Wrote the README and docs.
  - Pushed to `origin/main`: commits `c0f22aa`, `2e42825`.
  - First automated QA run: clean.
  - Visual review done. Fixes:
    - header CTA was showing on mobile (a `hidden` vs `inline-flex` conflict)
    - larger header logo
    - service-card title layout
  - Added `scripts/qa-interactions.mjs`: 26 interaction checks, all passing.
