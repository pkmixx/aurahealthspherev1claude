/**
 * Single source of truth for top-level routes.
 * Also parsed by scripts/generate-sitemap.mjs — keep `path: '...'` literals.
 */
export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

export const ROUTES = {
  home: {
    path: '/',
    label: 'Home',
    title: 'Wellness Activities & Health Camps in Mumbai | AURASPHERE Wellness 360',
    description:
      'Wellness activities like yoga, meditation, sound therapy and Zumba, and on-site health camps (eye, dental, ECG, PFT, audiometry) from Mumbai-based AURASPHERE.',
  },
  healthcare: {
    path: '/healthcare',
    label: 'Healthcare',
    title: 'Health Camps, Doctor Consultation & Lab Tests | AURASPHERE Wellness 360',
    description:
      'Preventive health camps for workplaces and communities (basic health, eye, dental, ECG, PFT, audiometry, blood donation), plus doctor consultation and lab tests.',
  },
  wellness: {
    path: '/wellness',
    label: 'Wellness',
    title: 'Wellness Activities in Mumbai: Yoga, Meditation & Sound Therapy | AURASPHERE',
    description:
      '40 wellness activities for individuals, groups and workplaces: yoga, meditation, sound therapy, Zumba, stress management, health talks and health camps.',
  },
  corporate: {
    path: '/corporate-wellness',
    label: 'Corporate Wellness',
    title: 'Corporate Wellness Programs & Health Camps in Mumbai | AURASPHERE',
    description:
      'Employee wellness activities and on-site health camps for workplaces: yoga, meditation, stress management, health talks, ECG and eye camps, CPR and POSH training.',
  },
  experts: {
    path: '/experts',
    label: 'Our Experts',
    title: 'Our Doctors & Wellness Experts | AURASPHERE Wellness 360',
    description:
      'Meet the doctors, nutritionist, mental health and sound healing professionals associated with AURASPHERE Wellness 360.',
  },
  about: {
    path: '/about',
    label: 'About',
    title: 'About Us | AURASPHERE Wellness 360',
    description:
      'AURASPHERE Wellness 360 is envisioned as an integrated platform bringing healthcare, wellness, preventive care and workplace well-being together.',
  },
  contact: {
    path: '/contact',
    label: 'Contact',
    title: 'Contact Us | AURASPHERE Wellness 360',
    description:
      'Contact AURASPHERE Wellness 360 in Mumbai by phone, email or WhatsApp to find the right healthcare, wellness or corporate wellness solution.',
  },
  disclaimer: {
    path: '/disclaimer',
    label: 'Health Disclaimer',
    title: 'Health Disclaimer | AURASPHERE Wellness 360',
    description:
      'Important health information: website content is for general awareness only and is not a substitute for professional medical advice.',
  },
} satisfies Record<string, RouteMeta>

export type RouteKey = keyof typeof ROUTES
