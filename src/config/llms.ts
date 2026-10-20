/**
 * /llms.txt (https://llmstxt.org): a plain-Markdown summary of the site for AI
 * assistants and answer engines. Written to dist/ by scripts/prerender.mjs and
 * built from the same data as the pages, so it never drifts from the site.
 */
import { CONTACT, SITE, SOCIAL_LINKS } from '@/config/site'
import { ROUTES } from '@/config/routes'
import {
  CORPORATE_AREAS,
  HEALTHCARE_SERVICES,
  PROGRAM_FORMATS,
  WELLNESS_ACTIVITIES,
  WELLNESS_CATEGORIES,
  activitiesByCategory,
} from '@/data/services'
import { EXPERTS } from '@/data/experts'
import { FAQS } from '@/data/faqs'
import { EMERGENCY_NOTE, SHORT_DISCLAIMER } from '@/data/disclaimers'

const url = (path: string) => (path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`)

const CAMPS = activitiesByCategory('health-prevention').filter((a) => a.format.includes('Camp'))
const camps = HEALTHCARE_SERVICES.find((s) => s.id === 'health-camps')!

export function llmsTxt(): string {
  const contact = [
    CONTACT.phone && `- Phone${CONTACT.whatsapp ? ' and WhatsApp' : ''}: ${CONTACT.phone}`,
    CONTACT.email && `- Email: ${CONTACT.email}`,
    CONTACT.address && `- Location: ${CONTACT.address}, India`,
    CONTACT.hours && `- Hours: ${CONTACT.hours}`,
    `- Contact page: ${url(ROUTES.contact.path)}`,
  ].filter(Boolean)

  const faqs = Object.entries(FAQS).flatMap(([path, items]) =>
    items.map((f) => `### ${f.question}\n\n${f.answer} (Source: ${url(path)})`),
  )
  // The same question can appear on several pages; keep the first.
  const seen = new Set<string>()
  const uniqueFaqs = faqs.filter((f) => {
    const q = f.split('\n')[0]
    return !seen.has(q) && seen.add(q)
  })

  return [
    `# ${SITE.name}`,
    `> ${SITE.defaultDescription} Based in ${CONTACT.address ?? 'India'}. ${SITE.tagline}`,
    `Requests are handled personally by the team after you get in touch; online booking is not available yet, and prices are not published.`,
    '## Pages',
    Object.values(ROUTES)
      .map((r) => `- [${r.label}](${url(r.path)}): ${r.description}`)
      .join('\n'),
    `## Wellness activities\n\n${WELLNESS_ACTIVITIES.length} activities for individuals, groups and workplaces. Details: ${url(ROUTES.wellness.path)}`,
    WELLNESS_CATEGORIES.map(
      (c) =>
        `### ${c.name}\n\n${c.intro}\n\n` +
        activitiesByCategory(c.id)
          .map((a) => `- ${a.name}: ${a.description} (${a.format.join(', ')})`)
          .join('\n'),
    ).join('\n\n'),
    `## Health camps\n\n${camps.description} Details: ${url(ROUTES.healthcare.path)}#${camps.id}`,
    CAMPS.map((a) => `- ${a.name}: ${a.description}`).join('\n'),
    '## Healthcare services',
    HEALTHCARE_SERVICES.filter((s) => s.id !== camps.id)
      .map((s) => `- ${s.name}: ${s.description} (${s.features.join('; ')})`)
      .join('\n'),
    '## Corporate wellness',
    CORPORATE_AREAS.map((a) => `- ${a.name}: ${a.description} Includes ${a.includes.join(', ')}.`).join('\n'),
    `Formats: ${PROGRAM_FORMATS.map((f) => f.name).join(', ')}.`,
    '## Experts',
    EXPERTS.map((e) => `- ${e.name}, ${e.role} (${e.credentials.replace(/ · /g, ', ')}): ${e.focus}`).join('\n'),
    '## Contact',
    contact.join('\n'),
    '## Frequently asked questions',
    uniqueFaqs.join('\n\n'),
    '## Important',
    `- ${SHORT_DISCLAIMER}\n- ${EMERGENCY_NOTE}\n- Full disclaimer: ${url(ROUTES.disclaimer.path)}`,
    '## Optional',
    SOCIAL_LINKS.flatMap((s) => (s.url ? [`- [${s.label}](${s.url})`] : [])).join('\n'),
  ].join('\n\n') + '\n'
}
