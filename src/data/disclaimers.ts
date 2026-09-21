/**
 * Health & wellness disclaimers.
 * TODO(client): have these reviewed by the client's legal / medical advisers before launch.
 */

export const EMERGENCY_NOTE =
  'In a medical emergency, do not use this website. Call 112 (India national emergency number) or go to the nearest hospital immediately.'

export const SHORT_DISCLAIMER =
  'Information on this website is for general awareness only and is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare professional about your health.'

export const WELLNESS_NOTE =
  'Wellness activities are not medical treatment. If you have a health condition, are pregnant, or are recovering from injury or illness, please consult your doctor before taking part in fitness, nutrition or movement-based sessions.'

export const EXPERT_NOTE =
  'Expert information is based on profiles supplied by the professionals and is provided for reference only. Viewing a profile or submitting an enquiry does not create a doctor–patient relationship. Consultations and sessions are subject to availability and confirmation.'

export interface DisclaimerSection {
  id: string
  title: string
  body: string[]
}

export const DISCLAIMER_SECTIONS: DisclaimerSection[] = [
  {
    id: 'not-medical-advice',
    title: 'Not medical advice',
    body: [
      SHORT_DISCLAIMER,
      'Never disregard professional medical advice or delay seeking it because of something you have read on this website.',
    ],
  },
  {
    id: 'emergencies',
    title: 'Medical emergencies',
    body: [EMERGENCY_NOTE, 'Enquiries submitted through this website are not monitored for urgent or emergency requests.'],
  },
  {
    id: 'wellness-activities',
    title: 'Wellness activities',
    body: [
      WELLNESS_NOTE,
      'Participation in any physical activity involves some risk. Please take part within your own comfort and ability and inform the facilitator of any relevant health concerns.',
    ],
  },
  {
    id: 'experts',
    title: 'Experts and professionals',
    body: [EXPERT_NOTE],
  },
  {
    id: 'services',
    title: 'Services and availability',
    body: [
      'Services described on this website are indicative. Specific services, formats and locations are confirmed individually after you contact us.',
      'Pharmacy and diagnostic services are subject to applicable laws, including the requirement of a valid prescription where applicable.',
    ],
  },
  {
    id: 'no-guarantee',
    title: 'No guaranteed outcomes',
    body: [
      'Health and wellness outcomes vary from person to person. AURASPHERE does not guarantee any specific medical, fitness or wellness result.',
    ],
  },
  {
    id: 'ai-features',
    title: 'Upcoming technology features',
    body: [
      'Any AI-enabled features described as "coming soon" are planned and not yet available. When introduced, they will be designed to support — not replace — qualified healthcare professionals, and will not provide medical diagnosis.',
    ],
  },
]
