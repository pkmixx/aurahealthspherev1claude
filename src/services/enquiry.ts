/**
 * Enquiry submission service.
 *
 * STAGE 1: there is no backend. `submitEnquiry` does NOT send data anywhere —
 * it resolves with `{ delivered: false }` so the UI can be honest about it.
 *
 * STAGE 2: replace the body with a real call (API route, CRM, email service,
 * WhatsApp, etc.) and return `{ delivered: true }`. No UI changes required.
 */
import type { EnquiryInterest } from '@/data/enquiry'

export interface Enquiry {
  name: string
  organisation: string
  phone: string
  email: string
  interest: EnquiryInterest | ''
  message: string
}

export interface EnquiryResult {
  delivered: boolean
}

export const ENQUIRY_BACKEND_ENABLED = false

export async function submitEnquiry(_enquiry: Enquiry): Promise<EnquiryResult> {
  // Intentionally a no-op in Stage 1.
  return { delivered: false }
}

/** Plain-text summary, used for the optional "send via email" fallback. */
export function formatEnquiry(e: Enquiry): string {
  return [
    `Name: ${e.name}`,
    e.organisation && `Company / Organisation: ${e.organisation}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email}`,
    `Interested in: ${e.interest}`,
    '',
    e.message,
  ]
    .filter((line) => line !== false && line !== undefined)
    .join('\n')
}
