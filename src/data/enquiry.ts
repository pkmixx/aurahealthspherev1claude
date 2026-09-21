/** Options for the "Interested In" field on the contact form. */
export const ENQUIRY_INTERESTS = [
  'Doctor Consultation',
  'Pharmacy',
  'Lab Tests',
  'Health Camp',
  'Wellness Activity',
  'Corporate Wellness',
  'Nutrition',
  'Mental Well-being',
  'CPR / First Aid',
  'Other',
] as const

export type EnquiryInterest = (typeof ENQUIRY_INTERESTS)[number]

export function isEnquiryInterest(value: string | null): value is EnquiryInterest {
  return !!value && (ENQUIRY_INTERESTS as readonly string[]).includes(value)
}
