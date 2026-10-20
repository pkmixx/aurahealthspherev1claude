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

/** On-site camps (Eye Check-up Camp, ECG Camp…) from the Health & Prevention activities. */
const CAMPS = activitiesByCategory('health-prevention').filter((a) => a.format.includes('Camp'))

/** Each camp as its own Service, so "ECG camp", "eye check-up camp"… are explicit entities. */
function campCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Health camps',
    itemListElement: CAMPS.map((a) => ({
      '@type': 'Service',
      name: a.name,
      description: a.description,
      serviceType: 'Health camp',
      provider: { '@id': ORG_ID },
    })),
  }
}

function healthCampsService() {
  const s = HEALTHCARE_SERVICES.find((x) => x.id === 'health-camps')!
  return {
    '@type': 'Service',
    '@id': `${SITE.url}${ROUTES.healthcare.path}#${s.id}`,
    name: s.name,
    description: `${s.summary} ${s.description}`,
    serviceType: 'Preventive health camp',
    category: 'Health camps',
    provider: { '@id': ORG_ID },
    hasOfferCatalog: campCatalog(),
  }
}

function wellnessService(c: (typeof WELLNESS_CATEGORIES)[number]) {
  const activities = activitiesByCategory(c.id)
  return {
    '@type': 'Service',
    '@id': `${SITE.url}${ROUTES.wellness.path}#${c.id}`,
    name: `${c.name} wellness activities`,
    description: `${c.intro} Includes ${activities.map((a) => a.name).join(', ')}.`,
    serviceType: 'Wellness activity',
    category: 'Wellness',
    provider: { '@id': ORG_ID },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: c.name,
      itemListElement: activities.map((a) => ({
        '@type': 'Service',
        name: a.name,
        description: a.description,
        serviceType: a.format.includes('Camp') ? 'Health camp' : 'Wellness activity',
        provider: { '@id': ORG_ID },
      })),
    },
  }
}

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
    // Primary focus first: wellness activities and health camps.
    knowsAbout: [
      'Wellness activities',
      'Health camps',
      'Preventive health camps',
      ...CAMPS.map((a) => a.name),
      'Yoga',
      'Meditation',
      'Sound therapy',
      'Zumba',
      'Stress management',
      ...WELLNESS_CATEGORIES.map((c) => c.name),
      'Corporate wellness',
      'Employee wellness programs',
      ...HEALTHCARE_SERVICES.filter((s) => s.id !== 'health-camps').map((s) => s.name),
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
  if (path === ROUTES.home.path) {
    label = 'Wellness activities and health camps'
    items = [healthCampsService(), ...WELLNESS_CATEGORIES.map(wellnessService)]
  } else if (path === ROUTES.healthcare.path) {
    label = 'Healthcare services'
    items = HEALTHCARE_SERVICES.map((s) =>
      s.id === 'health-camps'
        ? healthCampsService()
        : {
            '@type': 'Service',
            '@id': `${SITE.url}${path}#${s.id}`,
            name: s.name,
            description: `${s.summary} ${s.description}`,
            serviceType: s.name,
            category: 'Healthcare',
            provider,
          },
    )
  } else if (path === ROUTES.wellness.path) {
    label = 'Wellness activities'
    items = WELLNESS_CATEGORIES.map(wellnessService)
  } else if (path === ROUTES.corporate.path) {
    label = 'Corporate wellness services'
    items = CORPORATE_AREAS.map((a) => ({
      '@type': 'Service',
      name: `Corporate ${a.name}`,
      description: `${a.description} Includes ${a.includes.join(', ')}.`,
      serviceType: 'Corporate wellness',
      audience: { '@type': 'BusinessAudience', name: 'Employers and workplace teams' },
      provider,
      ...(a.id === 'preventive-camps' && { hasOfferCatalog: campCatalog() }),
    }))
  } else return null
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl(path)}#services`,
    name: label,
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
