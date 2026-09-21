# Stage 2 readiness

Stage 1 intentionally implements none of these features. This is where each one plugs in.

| Future capability                 | Integration point                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Enquiry backend / CRM / email     | Replace the body of `submitEnquiry()` in `src/services/enquiry.ts`, return `{ delivered: true }`. No UI change. |
| WhatsApp                          | Set `CONTACT.whatsapp` in `src/config/site.ts`. The Contact page renders the channel automatically.        |
| Doctor / service booking          | `contactHref()` in `src/lib/contact.ts` is the single CTA router. Branch on `bookingEnabled` to return a booking route. |
| Pricing / availability            | Reserved optional fields in `FutureCommerceFields` (`src/data/types.ts`) and `Expert.bookingEnabled`.       |
| Trainer assignment                | Wellness activities already have stable `id`s. Link experts to activity ids.                               |
| Corporate packages                | `PROGRAM_FORMATS` / `CORPORATE_AREAS` in `src/data/services.ts` can become package definitions.           |
| CMS                               | All content is serialisable data in `src/data`. Swap static imports for fetched data with the same types. |
| User accounts / admin dashboard   | Add routes to `src/config/routes.ts` and `App.tsx`. Layout (Navbar/Footer) is already route-agnostic.     |
| Pharmacy / lab ordering / payments | New routes and services. Existing service cards keep working through `contactHref()` until switched.      |

## Rules that still apply

- Do not show "Book Now", prices or availability until the backing feature really works.
- Keep content rules from `docs/CONTENT.md`.
