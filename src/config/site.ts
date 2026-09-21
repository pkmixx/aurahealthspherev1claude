/**
 * Central site configuration.
 *
 * Contact details and social links are intentionally left empty until the
 * client supplies them. Components render graceful placeholders for any
 * value that is `null`, and social links only appear when a URL exists.
 */

export const SITE = {
  name: 'AURASPHERE Wellness 360',
  shortName: 'AURASPHERE',
  tagline: 'Your Health. Your Wellness. Your Complete 360° Care.',
  defaultTitle: 'AURASPHERE Wellness 360 | Healthcare & Corporate Wellness',
  defaultDescription:
    'AURASPHERE Wellness 360 brings healthcare, preventive care, wellness activities and corporate wellness solutions together in one integrated ecosystem.',
  /** Production origin, e.g. "https://www.example.com". Used for canonical URLs. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',
  ogImage: '/og-image.jpg',
} as const

export interface ContactDetails {
  phone: string | null
  /** Digits only with country code, e.g. "919999999999". Enables the WhatsApp link. */
  whatsapp: string | null
  email: string | null
  address: string | null
  hours: string | null
}

/** TODO(client): fill in real contact details. Do not invent these. */
export const CONTACT: ContactDetails = {
  phone: null,
  whatsapp: null,
  email: null,
  address: null,
  hours: null,
}

export interface SocialLink {
  label: string
  url: string
}

/** Only rendered when real URLs are supplied. */
export const SOCIAL_LINKS: SocialLink[] = []
