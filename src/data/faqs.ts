/**
 * Page FAQs, written as direct question → answer pairs so search and AI answer
 * engines (Google, Bing/Copilot, ChatGPT, Perplexity, Claude…) can quote them.
 * Rendered visibly by <FAQSection> and emitted as FAQPage JSON-LD by config/seo.ts.
 *
 * CONTENT RULE: answers restate facts already on the site (services, experts,
 * disclaimers, client-supplied contact details). Never add prices, statistics,
 * outcomes or anything the client has not supplied.
 */
import { CONTACT } from '@/config/site'
import { CORPORATE_AREAS, HEALTHCARE_SERVICES, PROGRAM_FORMATS, WELLNESS_CATEGORIES, activitiesByCategory } from './services'
import { EXPERTS } from './experts'
import { EMERGENCY_NOTE, EXPERT_NOTE, SHORT_DISCLAIMER, WELLNESS_NOTE } from './disclaimers'

export interface Faq {
  question: string
  answer: string
}

/** "a, b and c" */
const list = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`

const lower = (items: string[]) => items.map((s) => s.toLowerCase())

const channels = [
  CONTACT.phone && `call ${CONTACT.whatsapp ? 'or WhatsApp ' : ''}${CONTACT.phone}`,
  CONTACT.email && `email ${CONTACT.email}`,
].filter((s): s is string => !!s)

const REACH_US = `You can ${channels.join(' or ')}.`
const HOW_TO_CONTACT = `${REACH_US} Tell us what you need, our team gets in touch to understand your requirement, and we guide you to the right next step.`

const NO_BOOKING =
  "Online booking isn't available yet. Every request is handled personally by our team, and specific services, formats and locations are confirmed individually after you contact us."

const doctors = EXPERTS.filter((e) => e.categories.includes('Doctors'))
const specialties = [...new Set(doctors.map((d) => d.role.toLowerCase()))]
const wellnessExperts = EXPERTS.filter((e) => !e.categories.includes('Doctors'))

const camps = activitiesByCategory('health-prevention')
  .filter((a) => a.format.includes('Camp'))
  .map((a) => a.name.replace(/ Camp$/, ''))

const service = (id: string) => HEALTHCARE_SERVICES.find((s) => s.id === id)!

const HOME: Faq[] = [
  {
    question: 'What is AURASPHERE Wellness 360?',
    answer: `AURASPHERE Wellness 360 is a healthcare and wellness platform based in ${CONTACT.address ?? 'India'}. It brings ${list(lower(HEALTHCARE_SERVICES.map((s) => s.name)))} together with wellness activities and corporate wellness programs, for individuals, families and organisations.`,
  },
  {
    question: 'What services does AURASPHERE Wellness 360 offer?',
    answer: `Healthcare: ${list(HEALTHCARE_SERVICES.map((s) => s.name))}. Wellness: activities across ${list(WELLNESS_CATEGORIES.map((c) => c.name))}, such as yoga, meditation, sound therapy, Zumba and stress management. Corporate wellness: employee programs covering ${lower(CORPORATE_AREAS.slice(0, 6).map((a) => a.name)).join(', ')} and more.`,
  },
  {
    question: 'Who are AURASPHERE’s services for?',
    answer:
      'Individuals and families looking for healthcare access, wellness sessions, nutrition and preventive health, and organisations looking for corporate wellness, employee engagement, health camps, training and team activities.',
  },
  {
    question: 'How do I get started with AURASPHERE Wellness 360?',
    answer: HOW_TO_CONTACT,
  },
  {
    question: 'Can I book a service online?',
    answer: NO_BOOKING,
  },
  {
    question: 'Is the information on this website medical advice?',
    answer: `No. ${SHORT_DISCLAIMER} ${EMERGENCY_NOTE}`,
  },
]

const HEALTHCARE: Faq[] = [
  {
    question: 'How can AURASPHERE help me consult a doctor?',
    answer: `${service('doctor-consultation').description} We help individuals, families and workplaces identify the right type of consultation. Doctors associated with AURASPHERE cover ${list(specialties)}.`,
  },
  {
    question: 'Can AURASPHERE help me with medicines?',
    answer: `Yes. ${service('pharmacy').description} Pharmacy services are subject to applicable laws, including the requirement of a valid prescription where applicable.`,
  },
  {
    question: 'Can I get lab tests done through AURASPHERE?',
    answer: `Yes. ${service('lab-tests').description} Options are available for individuals and teams.`,
  },
  {
    question: 'What kinds of health camps does AURASPHERE organise?',
    answer: `AURASPHERE organises preventive health camps at workplaces and community spaces to encourage awareness and early action, including ${list(camps)} camps.`,
  },
  {
    question: 'Does AURASPHERE offer diet and nutrition guidance?',
    answer: `Yes. AURASPHERE offers ${service('diet-nutrition').description.replace(/^./, (c) => c.toLowerCase())} Options include ${list(lower(service('diet-nutrition').features))}.`,
  },
]

const WELLNESS: Faq[] = [
  {
    question: 'What wellness activities does AURASPHERE offer?',
    answer: WELLNESS_CATEGORIES.map(
      (c) => `${c.name}: ${activitiesByCategory(c.id).slice(0, 5).map((a) => a.name).join(', ')} and more.`,
    ).join(' '),
  },
  {
    question: 'Are wellness sessions for individuals or groups?',
    answer:
      'Both. Activities run as group sessions, workshops, trainings, talks, camps and events, and some, such as sound therapy and diet consultation, are also available one-to-one.',
  },
  {
    question: 'What happens in a sound therapy session?',
    answer:
      'Sound therapy at AURASPHERE is sound-based relaxation combined with breathwork and guided rest. It is available as a group session or a one-to-one session.',
  },
  {
    question: 'Should I consult a doctor before joining a wellness activity?',
    answer: WELLNESS_NOTE,
  },
]

const CORPORATE: Faq[] = [
  {
    question: 'What does an AURASPHERE corporate wellness program include?',
    answer: `Programs are built from ${CORPORATE_AREAS.length} areas: ${list(CORPORATE_AREAS.map((a) => a.name))}. For example, wellness sessions include ${list(CORPORATE_AREAS[0].includes)}.`,
  },
  {
    question: 'What formats are available for workplace wellness?',
    answer: `${list(PROGRAM_FORMATS.map((f) => f.name.toLowerCase())).replace(/^./, (c) => c.toUpperCase())}. A custom corporate program combines formats and is planned around your workplace.`,
  },
  {
    question: 'Can AURASPHERE run health camps at our office?',
    answer: `Yes. AURASPHERE organises on-site preventive health camps, including ${list(camps)} camps, to encourage awareness and early action.`,
  },
  {
    question: 'Does AURASPHERE provide POSH and CPR training for employees?',
    answer:
      'Yes. Trainings include Prevention of Sexual Harassment (POSH) awareness training and hands-on CPR, AED and first aid training, alongside workshops on financial wellness, tax awareness, AI tools and parenting.',
  },
  {
    question: 'How do we plan a corporate wellness program with AURASPHERE?',
    answer: `Tell us about your teams and goals, and we’ll help you shape a program that fits, from a one-time session to a custom program that combines several formats. ${REACH_US}`,
  },
]

const EXPERTS_FAQ: Faq[] = [
  {
    question: 'Which doctors are associated with AURASPHERE Wellness 360?',
    answer: `${list(doctors.map((d) => `${d.name} (${d.role})`))}.`,
  },
  {
    question: 'Which wellness experts work with AURASPHERE?',
    answer: list(wellnessExperts.map((e) => `${e.name}, ${e.role} (${e.credentials.replace(/ · /g, ', ')})`)) + '.',
  },
  {
    question: 'How can I consult one of these experts?',
    answer: `${HOW_TO_CONTACT} Consultations and sessions are subject to availability and confirmation.`,
  },
  {
    question: 'Does viewing an expert profile create a doctor–patient relationship?',
    answer: `No. ${EXPERT_NOTE}`,
  },
]

const CONTACT_FAQ: Faq[] = [
  {
    question: 'How can I contact AURASPHERE Wellness 360?',
    answer: HOW_TO_CONTACT,
  },
  ...(CONTACT.address
    ? [{ question: 'Where is AURASPHERE Wellness 360 located?', answer: `AURASPHERE Wellness 360 is based in ${CONTACT.address}, India.` }]
    : []),
  {
    question: 'Should I contact AURASPHERE in a medical emergency?',
    answer: `No. ${EMERGENCY_NOTE} Enquiries submitted through this website are not monitored for urgent or emergency requests.`,
  },
]

/** FAQs by route path. */
export const FAQS: Record<string, Faq[]> = {
  '/': HOME,
  '/healthcare': HEALTHCARE,
  '/wellness': WELLNESS,
  '/corporate-wellness': CORPORATE,
  '/experts': EXPERTS_FAQ,
  '/contact': CONTACT_FAQ,
}
