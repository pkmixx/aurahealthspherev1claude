# PROGRESS — AURASPHERE Wellness 360 (Stage 1)

> Living log so work can be resumed at any time. Update at every milestone.
> Spec: `prompt.txt` · Docs: `README.md`, `docs/`

_Last updated: 2026-09-22_

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
| Visual QA pass (390 / 1024 / 1440 reviewed) | ✅ Done |
| Interaction QA (`scripts/qa-interactions.mjs`, 26 checks) | ✅ All pass |
| Photography (13 slots, AI-generated via Canva) | ✅ Done. Client to confirm that AI imagery is acceptable |
| Small images for subcategories (activities, corporate areas, category headers, menus) | ✅ Done. All 40 activities, 10 corporate areas, 18 menu items and 6 category/subcategory headers |
| Client contact details                 | ✅ Phone + support email added. WhatsApp, address, hours and socials still pending |

## Resume here — next steps

> **Session paused 2026-09-22.** All dev/preview servers are stopped and the working tree is committed and pushed to `origin/main`. To pick up again:
>
> ```bash
> cd C:\AWork\Auraspherev1claude
> git pull
> npm install               # only if package.json changed
> npm run dev -- --host     # http://localhost:5173 (and LAN URL for phone testing)
> ```
>
> Before any commit: `npm run build`, then `npx vite preview --port 4173 &`, `npm run qa` and `npm run qa:interactions`.

1. Client review:
   - AI imagery acceptable? Real photos can be swapped in with `scripts/import-photo.py`.
   - Remaining contact details: WhatsApp, address, hours (`src/config/site.ts`).
   - Social URLs.
   - Production domain (`VITE_SITE_URL`).
   - Legal review of `src/data/disclaimers.ts`.
2. Deploy: static host with SPA fallback (Netlify `_redirects` / `vercel.json` included). Then run `SITE_URL=… npm run sitemap` and add the sitemap line to `robots.txt`.
3. Stage 2 planning: see `docs/STAGE-2.md`.

## Blockers / open items

- **Gemini image generation:** credits used up (402). No longer needed, since the images came from Canva. `scripts/generate-images.py` is kept as an alternative.
- **Canva:** ✅ authenticated 2026-09-21 and used to generate all 13 site images.
- **Nebius (`NEBIUS_API_KEY`):** checked 2026-09-21. The key only gives access to text models (Qwen, DeepSeek, GLM, Kimi…), and the image-generation endpoints return 404. Not usable for images.
- **Client inputs needed:** WhatsApp, address, hours (`src/config/site.ts`), social URLs, production domain (`VITE_SITE_URL`), and legal review of the disclaimer copy (`src/data/disclaimers.ts`). Phone and support email were supplied 2026-09-21.

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
  - Hero headline sized down at 1024px.
  - Hardened the flaky interaction checks: 3 consecutive runs, all 26 pass.
  - Full QA suite: 9 pages × 6 widths, 89 links, no problems.
  - Re-checked image sources: Gemini still returns 402, Nebius has no image models, Canva is not authenticated.
  - Canva authenticated. Generated 4 candidates per slot × 13 slots and picked the best for each; rejected candidates with embedded text.
  - Exported at 1920px. Imported via the new `scripts/import-photo.py` (3:2 crop, 640/1200 WebP, 1.1 MB total).
  - QA re-run: clean. 26/26 interaction checks pass.
  - Started subcategory images:
    - `scripts/make-thumb.py`
    - `thumbFor` / `miniFor` lookups
    - image cards for activities and corporate areas
    - image headers for categories and subcategories
    - thumbnails in the dropdown and mobile menus

    Batch A (6 activities) generated; 7 more activity thumbs reuse existing photos.
  - Batches B and C generated: the Fitness & Lifestyle category is complete (Bollywood through team building). Garba is reused for Employee Engagement, and Fun Activities for the Lifestyle & Engagement subheading.
- **2026-09-22**
  - Subcategory images complete. Batches D–F added the Health & Prevention and Awareness activities, plus the Health Awareness and Professional Awareness areas.
    - 56 card thumbs (~6–18 KB each) and 56 mini thumbs (~1–2 KB each), all lazy-loaded.
    - Rejected candidates with embedded text (e.g. tax #2).
  - Added the client's phone (+91 73879 96455, contact & enquiries) and support email (aurasphere455@gmail.com). This enables the Contact page cards, the footer links and the form's "Send via email" fallback.
  - QA: 9 pages × 6 widths clean; 26/26 interaction checks pass.
