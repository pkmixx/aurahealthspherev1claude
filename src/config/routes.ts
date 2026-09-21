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
    title: 'AURASPHERE Wellness 360 | Healthcare & Corporate Wellness',
    description:
      'AURASPHERE Wellness 360 brings healthcare, preventive care, wellness activities and corporate wellness solutions together in one integrated ecosystem.',
  },
  healthcare: {
    path: '/healthcare',
    label: 'Healthcare',
    title: 'Healthcare Services | AURASPHERE Wellness 360',
    description:
      'Doctor consultation, pharmacy support, lab tests, health camps and diet & nutrition — healthcare connected around you.',
  },
  wellness: {
    path: '/wellness',
    label: 'Wellness',
    title: 'Wellness Activities | AURASPHERE Wellness 360',
    description:
      'Meditation, yoga, sound therapy, fitness, lifestyle, health camps and awareness sessions for individuals and teams.',
  },
  corporate: {
    path: '/corporate-wellness',
    label: 'Corporate Wellness',
    title: 'Corporate Wellness Programs | AURASPHERE Wellness 360',
    description:
      'Wellness sessions, health awareness, preventive camps, training and team engagement designed for modern workplaces.',
  },
  experts: {
    path: '/experts',
    label: 'Our Experts',
    title: 'Our Experts | AURASPHERE Wellness 360',
    description:
      'Meet the doctors and wellness professionals associated with AURASPHERE Wellness 360.',
  },
  about: {
    path: '/about',
    label: 'About',
    title: 'About | AURASPHERE Wellness 360',
    description:
      'AURASPHERE Wellness 360 is envisioned as an integrated platform bringing healthcare, wellness, preventive care and workplace well-being together.',
  },
  contact: {
    path: '/contact',
    label: 'Contact',
    title: 'Contact Us | AURASPHERE Wellness 360',
    description:
      'Tell us what you need and we will help you find the right healthcare or wellness solution.',
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
