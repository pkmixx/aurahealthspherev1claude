/**
 * Structured data (schema.org JSON-LD) baked into every prerendered page by
 * scripts/prerender.mjs. Uses only client-supplied facts from config/site.ts
 * and the site's own content in data/.
 */
import { CONTACT, SITE, SOCIAL_LINKS } from '@/config/site'
import { ROUTES } from '@/config/routes'
import { CORPORATE_AREAS, HEALTHCARE_SERVICES, WELLNESS_CATEGORIES, activitiesByCategory } from '@/data/services'
import { EXPERTS } from '@/data/experts'
import { FAQS } from '@/data/faqs'

const ORG_ID = `${SITE.url}/#organization`
const pageUrl = (path: string) => (path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`)

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
    knowsAbout: [
      ...HEALTHCARE_SERVICES.map((s) => s.name),
      'Preventive healthcare',
      'Corporate wellness',
      'Employee wellness programs',
      ...WELLNESS_CATEGORIES.map((c) => c.name),
      'Yoga',
      'Meditation',
      'Sound therapy',
      'CPR and first aid training',
      'POSH training',
    ],
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

/** Services described on a page, as Service entities provided by the organisation. */
function services(path: string) {
  const provider = { '@id': ORG_ID }
  let label: string
  let items: object[]
  if (path === ROUTES.healthcare.path) {
    label = ROUTES.healthcare.label
    items = HEALTHCARE_SERVICES.map((s) => ({
      '@type': 'Service',
      '@id': `${SITE.url}${path}#${s.id}`,
      name: s.name,
      description: `${s.summary} ${s.description}`,
      serviceType: s.name,
      category: 'Healthcare',
      provider,
    }))
  } else if (path === ROUTES.wellness.path) {
    label = ROUTES.wellness.label
    items = WELLNESS_CATEGORIES.map((c) => ({
      '@type': 'Service',
      '@id': `${SITE.url}${path}#${c.id}`,
      name: c.name,
      description: `${c.intro} Includes ${activitiesByCategory(c.id).map((a) => a.name).join(', ')}.`,
      category: 'Wellness',
      provider,
    }))
  } else if (path === ROUTES.corporate.path) {
    label = ROUTES.corporate.label
    items = CORPORATE_AREAS.map((a) => ({
      '@type': 'Service',
      name: `Corporate ${a.name}`,
      description: `${a.description} Includes ${a.includes.join(', ')}.`,
      serviceType: 'Corporate wellness',
      audience: { '@type': 'BusinessAudience', name: 'Employers and workplace teams' },
      provider,
    }))
  } else return null
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl(path)}#services`,
    name: `${label} services`,
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
  }
}

/** Expert profiles as Person entities (no affiliations — see data/experts.ts). */
function experts() {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl(ROUTES.experts.path)}#experts`,
    name: 'Doctors and wellness experts',
    itemListElement: EXPERTS.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        '@id': `${pageUrl(ROUTES.experts.path)}#${e.id}`,
        name: e.name,
        ...(e.name.startsWith('Dr.') && { honorificPrefix: 'Dr.' }),
        jobTitle: e.role,
        description: `${e.credentials}. ${e.focus}`,
        knowsAbout: e.tags,
        ...(e.photo && { image: `${SITE.url}${e.photo}` }),
      },
    })),
  }
}

function faqPage(path: string) {
  const faqs = FAQS[path]
  if (!faqs?.length) return null
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl(path)}#faq`,
    isPartOf: { '@id': `${pageUrl(path)}#webpage` },
    inLanguage: 'en-IN',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** JSON-LD graph for a route path (e.g. "/healthcare"). */
export function structuredData(path: string, title: string, description: string) {
  const url = pageUrl(path)
  const route = Object.values(ROUTES).find((r) => r.path === path)
  const listing = path === ROUTES.experts.path ? experts() : services(path)
  const faq = faqPage(path)
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
      dateModified: new Date().toISOString().slice(0, 10),
      ...(listing && { mainEntity: { '@id': listing['@id'] } }),
      ...(faq && { hasPart: { '@id': faq['@id'] } }),
    },
  ]
  if (listing) graph.push(listing)
  if (faq) graph.push(faq)
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
