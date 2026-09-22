/**
 * Every service CTA routes through here.
 *
 * Stage 1: returns a link to the Contact page with the enquiry pre-filled.
 * Stage 2: this is the single place to switch a service to a booking flow
 * (e.g. return `/book/${serviceId}` when bookingEnabled is true).
 */
import { ROUTES } from '@/config/routes'
import { CONTACT, WHATSAPP_GREETING } from '@/config/site'
import type { EnquiryInterest } from '@/data/enquiry'

export interface ContactIntent {
  interest?: EnquiryInterest
  /** Specific service/activity/expert name the visitor came from. */
  topic?: string
}

export function contactHref(intent: ContactIntent = {}): string {
  const params = new URLSearchParams()
  if (intent.interest) params.set('interest', intent.interest)
  if (intent.topic) params.set('topic', intent.topic)
  const qs = params.toString()
  return `${ROUTES.contact.path}${qs ? `?${qs}` : ''}#enquiry`
}

/** wa.me chat link with the greeting pre-filled, or null when no WhatsApp number is set. */
export function whatsappHref(message: string = WHATSAPP_GREETING): string | null {
  if (!CONTACT.whatsapp) return null
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
}
