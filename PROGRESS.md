# PROGRESS — AURASPHERE Wellness 360 (Stage 1)

> Living log so work can be resumed at any time. Update at every milestone.
> Spec: `prompt.txt` · Docs: `README.md`, `docs/`

_Last updated: 2026-10-20_

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
| SEO: prerendered routes, JSON-LD, keyword titles, real 404 (`npm run qa:seo`) | ✅ Live on AWS 2026-10-18 |
| AEO: FAQs + FAQPage schema, Service/Person schema, `llms.txt`, AI-crawler robots rules | ✅ Live on AWS 2026-10-20 |
| Search focus on wellness activities + health camps (titles, schema, FAQs, llms.txt) | ✅ Live on AWS 2026-10-20 |
| Automated QA script (`scripts/qa.mjs`) | ✅ Done — last run: no problems |
| Visual QA pass (390 / 1024 / 1440 reviewed) | ✅ Done |
| Interaction QA (`scripts/qa-interactions.mjs`, 26 checks) | ✅ All pass |
| Photography (13 slots, AI-generated via Canva) | ✅ Done. Client to confirm that AI imagery is acceptable |
| Small images for subcategories (activities, corporate areas, category headers, menus) | ✅ Done. All 40 activities, 10 corporate areas, 18 menu items and 6 category/subcategory headers |
| Client contact details                 | ✅ Phone, email, WhatsApp, address (Mumbai, Maharashtra) and socials (Instagram, Facebook, LinkedIn, X, YouTube) added. Hours still pending |

## Resume here — next steps

> **Session paused 2026-10-20.** The site is live and up to date at https://aurasphere.co.in (last deploy: commit `30f356a`). Everything is committed and pushed to `origin/main`, and no dev or preview servers are running. To pick up again:
>
> ```bash
> cd C:\AWork\Auraspherev1claude
> git pull
> npm install               # only if package.json changed
> npm run dev -- --host     # http://localhost:5173 (and LAN URL for phone testing)
> ```
>
> Before any commit or deploy: `npm run build`, then `npx vite preview --port 4173 &`, then `npm run qa`, `npm run qa:interactions` and `npm run qa:seo`. Read the **full** output: the interaction suite prints each check, and a FAIL can hide above the last lines.

1. **Search follow-up** (can be done any time):
   - Google Search Console: submit `https://aurasphere.co.in/sitemap.xml` and request indexing of the home page, so the new wellness/health-camp titles are picked up sooner.
   - Bing Webmaster Tools: submit the same sitemap. Bing feeds Copilot and ChatGPT search.
   - In 2–4 weeks: check Search Console for queries on wellness activities and health camps. Also try asking ChatGPT, Perplexity and Google AI Mode about "health camps in Mumbai" and see whether AURASPHERE is cited.
2. **Client decisions / inputs:**
   - AI *training* crawlers (GPTBot, ClaudeBot, Google-Extended) are currently allowed. Block them? (AI *search* would still work; how-to in `docs/ARCHITECTURE.md`.)
   - Full street address and postcode? This is optional. It would clear the 2 Rich Results warnings and help local search. The current rule is city and state only.
   - Opening hours (`CONTACT.hours`).
   - Is AI imagery acceptable? Real photos can be swapped in with `scripts/import-photo.py`.
   - Legal review of `src/data/disclaimers.ts`.
   - Mailbox for info@aurasphere.co.in: confirm the MX records so it receives mail.
3. **Hosting:** ✅ **Live on AWS since 2026-10-18.** The old GCP VM is offline (GCP billing account closed) and still needs to be decommissioned.
   - **Server:** AWS EC2 (Ubuntu, user `ubuntu`). The server address and SSH key are kept locally and never committed (`*.pem` is gitignored).
   - **Apache 2.4:** site in `/var/www/aurasphere`; live vhost `/etc/apache2/sites-available/aurasphere-le-ssl.conf`, mirrored in `deploy/apache-aurasphere.conf`. It serves `/route` → `route.html` for the prerendered pages, a real 404, immutable cache on `/assets`, `no-cache` on HTML, and UTF-8 for `.txt`/`.xml`. Modules: rewrite, headers. A pre-AddCharset backup is in `aurasphere-le-ssl.conf.bak-20261020`.
   - **Server housekeeping:** on the 2026-10-20 reload, systemd said the `apache2.service` unit had changed on disk (probably a package update). Running `sudo systemctl daemon-reload` is harmless.
   - **Redirects:** `http://` and `www.` → 301 to `https://aurasphere.co.in`, path and query kept.
   - **DNS** is at GoDaddy: A records for the apex and `www` → the server.
   - **HTTPS:** Let's Encrypt via `certbot --apache`, auto-renews via `certbot.timer`.
   - **Redeploy** (set `AURA_HOST` and `AURA_KEY` locally first):
   ```bash
   npm run build   # prerenders all routes + writes sitemap.xml and llms.txt (domain defaults to aurasphere.co.in)
   tar --force-local -czf dist.tgz -C dist .
   scp -i "$AURA_KEY" dist.tgz ubuntu@$AURA_HOST:/tmp/
   ssh -i "$AURA_KEY" ubuntu@$AURA_HOST "sudo rm -rf /var/www/aurasphere/* && sudo tar -xzf /tmp/dist.tgz -C /var/www/aurasphere && sudo chown -R www-data:www-data /var/www/aurasphere && rm /tmp/dist.tgz"
   QA_BASE=https://aurasphere.co.in npm run qa:seo   # verify production
   ```
   **Floating WhatsApp button** on every page (bottom-right, label slides out on hover) opens `wa.me/917387996455` with a pre-filled greeting (`WHATSAPP_GREETING` in `src/config/site.ts`); back-to-top sits above it.
   **Enquiry form hidden** (client request 2026-09-22): Contact shows phone, WhatsApp and email only. Restore with `ENQUIRY_FORM_ENABLED = true` in `src/config/site.ts`; `qa:interactions` follows the flag.
4. **Stage 2 planning:** see `docs/STAGE-2.md`.

## Blockers / open items

- **Gemini image generation:** credits used up (402). No longer needed, since the images came from Canva. `scripts/generate-images.py` is kept as an alternative.
- **Canva:** ✅ authenticated 2026-09-21 and used to generate all 13 site images.
- **Nebius (`NEBIUS_API_KEY`):** checked 2026-09-21. The key only gives access to text models (Qwen, DeepSeek, GLM, Kimi…), and the image-generation endpoints return 404. Not usable for images.
- **Client inputs needed:** see "Client decisions / inputs" above. Already supplied: phone and email (2026-09-21; primary email changed to info@aurasphere.co.in 2026-09-28), WhatsApp and domain (2026-09-22), address and socials (2026-10-01).

## Key decisions (and why)

- **Doctor profiles:** used credentials + areas of interest only. Omitted hospital branding and affiliation (the PDFs are hospital-branded, and showing it would imply a partnership), plus years, procedure counts and awards. See `docs/CONTENT.md`.
- **Kunjan Paul:** used roles, session topics and qualifications from the 4 profiles. Omitted Trion Academy branding, contacts, client logos, stats and testimonials.
- **Contact form:** no backend. `submitEnquiry()` is a no-op, and the success state says clearly the form was *not sent*. If `CONTACT.email` is set, it offers a real "Send via email" (mailto) fallback.
- **Primary button text is navy**, not white. White fails contrast on the cyan end of the gradient.
- **Photos auto-discovered** from `src/assets/photos/<name>-{640,1200}.webp` via `import.meta.glob`, so no code changes are needed when they're added.
- **AI section** is labelled "Planned" everywhere, is non-interactive and makes no diagnostic claims.
- **Emergency number:** 112 (India national emergency number).
- **Client PDFs are never committed** (`.gitignore`: `*.pdf`, `Aurasphere Image`).
- **Main search target: wellness activities and health camps** (client, 2026-10-20). This is applied **only to what search engines and AI read**: titles, descriptions, JSON-LD, FAQ order and `llms.txt`. The client chose not to change the visible layout for it.
- **FAQ answers are generated from the site's own data** (`src/data/faqs.ts`), so they can't drift or add claims. The visible FAQ, its FAQPage JSON-LD and `llms.txt` all read from that one file.
- **Address stays city and state only** in JSON-LD, even though Google flags `streetAddress`/`postalCode` as optional warnings (client, 2026-10-01).
- **AI crawlers:** all allowed, and the search/answer bots are named explicitly in `robots.txt`. Blocking the training bots is the client's decision.

## Commands

```bash
npm run dev                 # dev server
npm run build               # typecheck + build + prerender + sitemap.xml + llms.txt
npx vite preview --port 4173 &                        # serve dist/ for the QA scripts
npm run qa                                            # 9 pages × 6 widths + screenshots (QA_SHOTS=0 to skip shots)
npm run qa:interactions                               # 26 interaction checks
npm run qa:seo                                        # SEO/AEO + hydration checks
QA_BASE=https://aurasphere.co.in npm run qa:seo       # same checks against production
python scripts/import-photo.py <slot> <file-or-url>   # swap in a real photo
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
- **2026-09-28**
  - Primary email changed to **info@aurasphere.co.in** (replaces aurasphere455@gmail.com) in `CONTACT.email`; Contact card relabelled "Email us — contact & enquiries". Used by the Contact page, footer and mailto fallback.
  - Deployed to https://aurasphere.co.in; verified live bundle serves info@aurasphere.co.in and no longer contains the old Gmail address. Pending: confirm MX records so the mailbox receives mail.
  - Emergency note softened: "do not use this website" removed; now "In a medical emergency, please call 112 … or go to the nearest hospital immediately." Deployed and verified live.
  - Disclaimer section 06 softened: "No guaranteed outcomes" → "Individual outcomes" (outcomes vary person to person; no "does not guarantee" wording). Deployed; live check of the bundle still pending.
- **2026-10-01**
  - Footer social icons linked: Instagram @aura_sphere360, Facebook (profile id 61594542996798), LinkedIn /in/aura-sphere-24212343b, X @aurasphere455. YouTube is still "coming soon".
  - `CONTACT.address` set to "Mumbai, Maharashtra" (city/state only; no street address). Shown on the Contact page and in the footer.
  - Deployed to https://aurasphere.co.in; verified the live bundle contains all four social URLs and the new address.
  - YouTube linked: https://www.youtube.com/@aura-sphere360. Deployed and verified live.
- **2026-10-18**
  - SEO pass:
    - Every route is now prerendered to static HTML at build time (`scripts/prerender.mjs`, `src/entry-server.tsx`) and hydrated in place.
    - Each page has its own title, description, canonical, OG/Twitter tags and JSON-LD (Organization, WebSite, WebPage, BreadcrumbList).
    - Titles and descriptions now include keywords (doctor consultation, lab tests, yoga, corporate wellness, Mumbai).
    - Added a real `404.html` (noindex) and absolute OG image URLs. The sitemap is generated in `build`.
    - New `npm run qa:seo`. All QA suites are clean (qa, 26 interaction checks, qa:seo).
  - The GCP-hosted site went offline (billing issue on the GCP account).
  - Moved hosting to AWS EC2: new Apache config and a Let's Encrypt certificate, with the SEO build deployed. GoDaddy DNS points to the new server.
  - Verified live: all 8 routes return 200 with their own canonical URL, unknown URLs return 404, http/www redirect to https, gzip is on.
  - **Next:** submit `https://aurasphere.co.in/sitemap.xml` in Google Search Console. Decommission the old GCP VM.
- **2026-10-20**
  - AEO (answer engine optimisation) pass:
    - Visible FAQ sections on Home, Healthcare, Wellness, Corporate Wellness, Experts and Contact (`src/data/faqs.ts`, `<FAQSection />`), with matching FAQPage JSON-LD. Answers are generated from existing site data; nothing new is claimed.
    - JSON-LD now also has Service lists (healthcare services, wellness categories, corporate areas), Person entries for experts (no affiliations), Organization `knowsAbout`, and WebPage `dateModified`.
    - `/llms.txt` generated at build from the same data (`src/config/llms.ts`).
    - `robots.txt` names the AI search/answer crawlers explicitly (all allowed, as before).
    - `deploy/apache-aurasphere.conf`: `AddCharset UTF-8 .txt .xml`. Also added to the live `aurasphere-le-ssl.conf` (backup: `.bak-20261020`).
    - `qa:seo` extended (FAQ/schema match, llms.txt, robots). All suites clean: qa (9 pages × 6 widths), qa:interactions, qa:seo.
  - Deployed and verified live: 8 routes return 200, FAQPage on the 6 FAQ pages, `/llms.txt` and `robots.txt` served as `text/plain; charset=utf-8`, unknown URLs return 404, and `qa:seo` passes against production.
  - Rich Results Test (home): 2 valid items (Organisation, Local business), only warnings are the optional `streetAddress`/`postalCode` (client wants city only). FAQ rich results are not shown for most sites since 2023, so FAQ isn't listed; Schema.org validator confirms FAQPage, Service and Person markup with 0 errors/warnings on Home, Healthcare and Experts.
  - Client: wellness activities and health camps are the main search target, **search and AI only** (no visible layout change). Retargeted titles/descriptions, Organization description and `knowsAbout`, added per-camp and per-activity `Service` entries, FAQs now lead with wellness activities and health camps (new Home and Corporate questions), `llms.txt` opens with an activity-by-activity and camp-by-camp list.
  - Bug fix (live since the prerender commit `4491d1c`): `/wellness#<activity>` deep links didn't open the right accordion, because the initial state read the hash during hydration, so it didn't match the prerendered HTML. The page now opens it after hydration, and `ScrollToTop` waits until the target is visible before scrolling. Two timing-based interaction checks were also hardened. QA is clean: 26/26 on 6 consecutive runs, qa and qa:seo.
  - Deployed (`30f356a`) and verified live: new titles on all four focus pages, 53 Service entities on Home, `llms.txt` leads with wellness and camps, `qa:seo` passes against production, and `/wellness#yoga`, `#self-defence` and `#ecg-camp` open on mobile.
  - Docs pass: README (contact status, file map, SEO/AEO section, hosting), ARCHITECTURE (hydration rule for `#hash`, Hosting section incl. AddCharset), STAGE-2 (WhatsApp done), CONTENT (supplied contact facts, no unconfirmed areas or languages), and this file (resume block rewritten for the next session).
  - **Next session:** see "Resume here" at the top (search follow-up, client decisions).
