/**
 * Central site configuration.
 *
 * Contact details come from the client. Components render graceful
 * placeholders for any value that is `null`, and social links only appear
 * when a URL exists. Never invent values here.
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

/**
 * Shows the enquiry form on the Contact page. Hidden for now at the client's
 * request (2026-09-22): visitors see phone and email only. Set to `true` to restore.
 */
export const ENQUIRY_FORM_ENABLED = false

export interface ContactDetails {
  phone: string | null
  /** Digits only with country code, e.g. "919999999999". Enables the WhatsApp link. */
  whatsapp: string | null
  email: string | null
  address: string | null
  hours: string | null
}

/** Greeting pre-filled when a visitor opens WhatsApp chat; they can edit it before sending. */
export const WHATSAPP_GREETING = "Hi AURASPHERE, I'd like to know more about your services."

/** Supplied by the client (2026-09-21). Remaining nulls: still to be provided. */
export const CONTACT: ContactDetails = {
  /** Contact & enquiries */
  phone: '+91 73879 96455',
  /** WhatsApp: same number as phone (client confirmed 2026-09-22) */
  whatsapp: '917387996455',
  /** Support */
  email: 'aurasphere455@gmail.com',
  address: null,
  hours: null,
}

export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'x'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  /** Profile URL from the client. `null` shows the icon as "coming soon" (not clickable). */
  url: string | null
}

/** Footer social icons. Fill in each URL once the client supplies it. */
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'instagram', label: 'Instagram', url: null },
  { platform: 'facebook', label: 'Facebook', url: null },
  { platform: 'linkedin', label: 'LinkedIn', url: null },
  { platform: 'youtube', label: 'YouTube', url: null },
  { platform: 'x', label: 'X (Twitter)', url: null },
]
