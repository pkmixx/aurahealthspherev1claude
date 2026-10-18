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
    title: 'AURASPHERE Wellness 360 | Healthcare & Corporate Wellness, Mumbai',
    description:
      'Mumbai-based AURASPHERE Wellness 360 brings doctor consultations, lab tests, health camps, yoga, meditation and corporate wellness programs together in one place.',
  },
  healthcare: {
    path: '/healthcare',
    label: 'Healthcare',
    title: 'Healthcare Services: Doctor Consultation, Lab Tests & Health Camps | AURASPHERE',
    description:
      'Doctor consultation, pharmacy support, lab tests, preventive health camps and diet & nutrition guidance from AURASPHERE Wellness 360, Mumbai.',
  },
  wellness: {
    path: '/wellness',
    label: 'Wellness',
    title: 'Wellness Activities: Yoga, Meditation & Sound Therapy | AURASPHERE',
    description:
      'Yoga, meditation, sound therapy, Zumba, fitness, mental well-being and lifestyle sessions for individuals and teams, from AURASPHERE Wellness 360.',
  },
  corporate: {
    path: '/corporate-wellness',
    label: 'Corporate Wellness',
    title: 'Corporate Wellness Programs in Mumbai | AURASPHERE Wellness 360',
    description:
      'Employee wellness programs for workplaces: health talks, preventive health camps, stress management, POSH training, fitness and team engagement activities.',
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
