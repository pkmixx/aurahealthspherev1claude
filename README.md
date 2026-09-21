# AURASPHERE Wellness 360 — Website (Stage 1)

Premium, mobile-first static website for **AURASPHERE Wellness 360**, an integrated healthcare, wellness and corporate wellness company.

> **Stage 1 = static frontend only.** No backend, database, auth, payments, booking, pharmacy ordering or lab booking. Every service CTA leads to **Contact Us**. The architecture is prepared for Stage 2. See [`docs/STAGE-2.md`](docs/STAGE-2.md).

## Tech stack

| Concern    | Choice                                                             |
| ---------- | ------------------------------------------------------------------ |
| Framework  | React 19 + TypeScript (Vite)                                       |
| Styling    | Tailwind CSS v4 (design tokens in `src/index.css`)                 |
| Routing    | React Router (clean URLs, lazy-loaded pages)                       |
| Icons      | `lucide-react` only (one consistent icon library)                  |
| Fonts      | Sora (display) + Inter (body), self-hosted via Fontsource          |
| Animation  | CSS only, respects `prefers-reduced-motion`                        |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

Optional:

```bash
SITE_URL=https://your-domain.com npm run sitemap   # writes dist/sitemap.xml after a build
python scripts/generate-images.py                  # generate site photography via Gemini (needs GEMINI_API_KEY)
```

### Quality checks

```bash
npm run build && npx vite preview --port 4173 &
npm run qa                 # 9 pages × 6 breakpoints: console errors, overflow, broken images/links, h1, screenshots → screenshots/
npm run qa:interactions    # mobile menu, dropdowns, tabs, deep links, expert modal, contact form validation/success
```

## Pages

| Route                 | Page                |
| --------------------- | ------------------- |
| `/`                   | Home                |
| `/healthcare`         | Healthcare          |
| `/wellness`           | Wellness            |
| `/corporate-wellness` | Corporate Wellness  |
| `/experts`            | Our Experts         |
| `/about`              | About               |
| `/contact`            | Contact             |
| `/disclaimer`         | Health Disclaimer   |

Expert profiles are deep-linkable: `/experts?expert=kunjan-paul`.

## Project structure

```
src/
  config/        site.ts (contact details, social), routes.ts (routes + SEO), images.ts (image registry)
  data/          services.ts, experts.ts, navigation.ts, enquiry.ts, types.ts — all content lives here
  lib/           contact.ts (CTA routing), hooks.ts (meta, reveal, scroll lock), icons.ts, useExpertModal.ts
  services/      enquiry.ts — form submission stub (Stage 2 swap-in point)
  components/    Navbar, MobileMenu, Hero, PageHero, SectionHeading, ServiceCard, ServiceCategory,
                 ActivityCard, ExpertCard, ExpertModal, CTASection, Footer, ContactCard, IconCard,
                 Accordion, ScrollToTop, Visual, Logo, Button, Reveal, OrbitRings, WellnessTabs
  pages/         Home, Healthcare, Wellness, CorporateWellness, Experts, About, Contact, NotFound
public/          brand/ (logo variants), images/experts/, og-image.jpg, favicon, robots.txt
scripts/         generate-sitemap.mjs, generate-images.py, import-photo.py, make-thumb.py, qa.mjs, qa-interactions.mjs
docs/            ARCHITECTURE.md, CONTENT.md, STAGE-2.md
```

## Editing content

- **Contact details / social links** → `src/config/site.ts`. These are empty (`null`) until the client supplies them. The UI shows neutral placeholders, and social links render only when real URLs exist.
- **Services and activities** → `src/data/services.ts`
- **Experts** → `src/data/experts.ts`
- **Images** → `python scripts/import-photo.py <slot> <file-or-url> [focusX] [focusY]` crops to 3:2 and writes `src/assets/photos/<slot>-640.webp` + `-1200.webp`. Photos are picked up automatically (see `src/config/images.ts` for slot names), and a missing photo falls back to an abstract branded visual. The current photos are AI-generated via Canva; see `docs/CONTENT.md`.
- **Small images** (wellness activities, corporate areas, category headers, menu items) → `python scripts/make-thumb.py <content-id> <file-or-url>` writes `src/assets/thumbs/<id>.webp` (480×320, ~6–18 KB) and `src/assets/mini/<id>.webp` (96×96, ~1–2 KB). The id is the activity / area / service / category id from `src/data`. Images are matched by id automatically; items without one keep their icon.

The content rules (no invented credentials, stats, testimonials and so on) are in [`docs/CONTENT.md`](docs/CONTENT.md).

## Deployment

It's a static SPA, so any static host works. SPA fallbacks are included for Netlify (`public/_redirects`) and Vercel (`vercel.json`). Set `VITE_SITE_URL` at build time for absolute canonical/OG URLs.
