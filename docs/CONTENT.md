# Content rules & sources

The site must look premium **without fabricating credibility**.

## Never add (unless the client explicitly supplies it for AURASPHERE)

- Testimonials, reviews or ratings
- Statistics ("10,000+ employees", "500+ companies", "99% satisfaction")
- Client or partner logos
- Certifications, awards or accreditations for AURASPHERE
- Years of experience, procedure counts, success rates or medical outcomes
- Company history
- Contact details (phone, email, address) or social URLs
- Prices, availability, inventory or "Book Now / Buy Now / Pay Now" CTAs

If information is missing, **omit it**.

## Source material used

| Source (client-supplied)                       | Used for                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| AURASPHERE logo (PNG)                          | `public/brand/*` (resized only, never redrawn), favicon, OG image   |
| Dr Deepak Gautam profile                       | Credentials, focus, areas of interest, photo                        |
| Dr Nitish Arora profile                        | Credentials, focus, areas of interest, photo                        |
| Dr Rajesh S. Shinde profile                    | Credentials, focus, clinical expertise, photo                       |
| Dr Sanjeev Kumar Kalkekar profile              | Credentials, focus, areas of special interest, photo                |
| Dr Rohini Khera Bhatt profile                  | Credentials, focus, areas of expertise, photo                       |
| Kunjan Paul — CPR & First Aid profile          | Role, training modules, IRCS course, photo                          |
| Kunjan Paul — Mental Well-being profile        | Roles, session topics                                               |
| Kunjan Paul — Nutritionist profile             | Role, nutrition support, qualifications                             |
| Kunjan Paul — Sound Healer profile             | Role, session types, qualifications                                 |
| `prompt.txt`                                   | Wellness activity list, services, page copy direction               |

## Deliberately excluded from the source documents

- **Doctor profiles:** hospital affiliation and branding (the PDFs are hospital-branded, and showing that would imply a partnership), hospital contact details, years of experience, procedure counts, awards/fellowship lists beyond the credential line, publications.
- **Kunjan Paul profiles:** Trion Academy branding and contact details, client/partner logos, "200+ / 500+ / 10,000+" statistics, participant testimonials, awards and media features.

These can be added later **if the client confirms** they should appear on the AURASPHERE site.

## Wellness activity descriptions

Short, neutral one-liners only. No health claims. Each activity has a `format` (Session, Workshop, Camp and so on) and a Contact Us CTA.

## Imagery

- Expert portraits are cropped from the supplied profiles.
- Other visuals are registered in `src/config/images.ts`. A slot without a photo shows an abstract branded composition.
- **Current photos (13) are AI-generated with Canva's design generator** (2026-09-21), not photographs of real AURASPHERE people or events.
  - The brief was candid documentary style, Indian workplace and healthcare context, cool-blue grade, and no text or logos.
  - Every image was reviewed; candidates with embedded text were rejected.
  - Source designs live in the connected Canva account (titles such as "Candid Moment of Empathy in Healthcare").
- **Small images** for wellness activities, corporate areas, category headers and menus: some reuse the photos above, and the rest are additional Canva-generated images (same brief), stored as small WebP thumbnails.
- **Before launch:** confirm with the client that AI imagery is acceptable. Swap in real event photos as they become available with `python scripts/import-photo.py <slot-name> <file-or-url>`. Use of Canva-generated content is subject to Canva's content licence.
