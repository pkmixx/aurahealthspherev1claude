# Architecture

## Principles

1. **Content is data.** Services, activities, experts, navigation and routes live in `src/data` and `src/config`. Components never hard-code service lists.
2. **Data is serialisable.** Icons are string keys (`'stethoscope'`) resolved by `src/lib/icons.ts`, and images are registry keys resolved by `src/config/images.ts`. That means the same shapes can later come from a CMS or API.
3. **One CTA path.** Every "Contact Us" goes through `contactHref()` in `src/lib/contact.ts`. It produces `/contact?interest=…&topic=…#enquiry`, which pre-fills the form.
4. **Honest Stage 1.** `src/services/enquiry.ts` does not send data. The contact form validates and shows a success state that says clearly the form isn't connected yet.

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

- Static defaults in `index.html` (title, description, OG, Twitter).
- `useDocumentMeta()` sets per-route title, description, canonical and OG tags.
- `public/robots.txt`. `scripts/generate-sitemap.mjs` builds `sitemap.xml` from `src/config/routes.ts`.
