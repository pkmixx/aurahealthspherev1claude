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
scripts/         generate-sitemap.mjs, generate-images.py
docs/            ARCHITECTURE.md, CONTENT.md, STAGE-2.md
```

## Editing content

- **Contact details / social links** → `src/config/site.ts`. These are empty (`null`) until the client supplies them. The UI shows neutral placeholders, and social links render only when real URLs exist.
- **Services and activities** → `src/data/services.ts`
- **Experts** → `src/data/experts.ts`
- **Images** → put `<name>-640.webp` + `<name>-1200.webp` into `src/assets/photos/`. They're picked up automatically (see `src/config/images.ts`). A missing photo falls back to an abstract branded visual, so there are never broken images.

The content rules (no invented credentials, stats, testimonials and so on) are in [`docs/CONTENT.md`](docs/CONTENT.md).

## Deployment

It's a static SPA, so any static host works. SPA fallbacks are included for Netlify (`public/_redirects`) and Vercel (`vercel.json`). Set `VITE_SITE_URL` at build time for absolute canonical/OG URLs.
