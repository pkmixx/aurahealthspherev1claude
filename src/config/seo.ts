/**
 * Structured data (schema.org JSON-LD) baked into every prerendered page by
 * scripts/prerender.mjs. Uses only client-supplied facts from config/site.ts.
 */
import { CONTACT, SITE, SOCIAL_LINKS } from '@/config/site'
import { ROUTES } from '@/config/routes'

const ORG_ID = `${SITE.url}/#organization`

function organization() {
  const [locality, region] = (CONTACT.address ?? '').split(',').map((s) => s.trim())
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/brand/logo-640.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    slogan: SITE.tagline,
    description: SITE.defaultDescription,
    ...(CONTACT.email && { email: CONTACT.email }),
    ...(CONTACT.phone && { telephone: CONTACT.phone.replace(/\s/g, '') }),
    ...(locality && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: locality,
        ...(region && { addressRegion: region }),
        addressCountry: 'IN',
      },
    }),
    ...(CONTACT.phone && {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: CONTACT.phone.replace(/\s/g, ''),
        ...(CONTACT.email && { email: CONTACT.email }),
        areaServed: 'IN',
      },
    }),
    sameAs: SOCIAL_LINKS.flatMap((s) => (s.url ? [s.url] : [])),
  }
}

/** JSON-LD graph for a route path (e.g. "/healthcare"). */
export function structuredData(path: string, title: string, description: string) {
  const url = path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`
  const route = Object.values(ROUTES).find((r) => r.path === path)
  const graph: object[] = [
    organization(),
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: 'en-IN',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': path === '/about' ? 'AboutPage' : path === '/contact' ? 'ContactPage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': ORG_ID },
    },
  ]
  if (route && path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ROUTES.home.label, item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: route.label, item: url },
      ],
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
