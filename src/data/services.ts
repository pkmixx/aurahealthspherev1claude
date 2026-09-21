import type {
  CorporateArea,
  Feature,
  HealthcareService,
  ProgramFormat,
  WellnessActivity,
  WellnessCategory,
} from './types'

/* ------------------------------------------------------------------ */
/* Healthcare                                                          */
/* ------------------------------------------------------------------ */

export const HEALTHCARE_SERVICES: HealthcareService[] = [
  {
    id: 'doctor-consultation',
    name: 'Doctor Consultation',
    icon: 'stethoscope',
    image: 'doctorConsultation',
    summary: 'Guidance from qualified doctors for your health concerns.',
    description:
      'Tell us what you are looking for and we will help you connect with an appropriate doctor for your concern.',
    features: [
      'Help identifying the right type of consultation',
      'Access to qualified doctors',
      'For individuals, families and workplaces',
    ],
    interest: 'Doctor Consultation',
    cta: 'Contact Us',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    icon: 'pill',
    image: 'pharmacy',
    summary: 'Support with your medicine requirements.',
    description:
      'Share your medicine requirement with us and our team will get in touch to guide you on the next steps.',
    features: [
      'Enquire about prescribed medicines',
      'Guidance on the next steps',
      'Individual and organisational requirements',
    ],
    interest: 'Pharmacy',
    cta: 'Contact Us',
  },
  {
    id: 'lab-tests',
    name: 'Lab Tests',
    icon: 'flask',
    image: 'labTests',
    summary: 'Diagnostic and preventive tests, simplified.',
    description:
      'Whether it is a routine check or a test your doctor has advised, reach out and we will help you with the options.',
    features: [
      'Routine and preventive check-ups',
      'Tests advised by your doctor',
      'Options for individuals and teams',
    ],
    interest: 'Lab Tests',
    cta: 'Contact Us',
  },
  {
    id: 'health-camps',
    name: 'Health Camps',
    icon: 'tent',
    image: 'healthCamps',
    summary: 'Preventive health camps for workplaces and communities.',
    description:
      'Organise a health camp at your workplace or community space to encourage awareness and early action.',
    features: [
      'Basic health, eye, dental, and hair & skin camps',
      'ECG, PFT and audiometry camps',
      'Blood donation camps',
    ],
    interest: 'Health Camp',
    cta: 'Contact Us',
  },
  {
    id: 'diet-nutrition',
    name: 'Diet & Nutrition',
    icon: 'apple',
    image: 'dietNutrition',
    summary: 'Practical nutrition guidance that fits real life.',
    description:
      'Personalised and group nutrition support focused on everyday food habits, routines and health goals.',
    features: [
      '1:1 diet consultations',
      'Group nutrition awareness sessions',
      'Workplace nutrition talks',
    ],
    interest: 'Nutrition',
    cta: 'Contact Us',
  },
]

/* ------------------------------------------------------------------ */
/* Wellness                                                            */
/* ------------------------------------------------------------------ */

export const WELLNESS_CATEGORIES: WellnessCategory[] = [
  {
    id: 'mind-well-being',
    name: 'Mind & Well-being',
    shortName: 'Mind',
    icon: 'brain',
    intro: 'Sessions that create space to pause, breathe and reset.',
  },
  {
    id: 'fitness-lifestyle',
    name: 'Fitness & Lifestyle',
    shortName: 'Fitness',
    icon: 'activity',
    intro: 'Movement, creativity and shared experiences that bring energy back.',
  },
  {
    id: 'health-prevention',
    name: 'Health & Prevention',
    shortName: 'Prevention',
    icon: 'heartPulse',
    intro: 'Camps, talks and consultations that encourage early action.',
  },
  {
    id: 'awareness-professional',
    name: 'Awareness & Professional',
    shortName: 'Awareness',
    icon: 'graduation',
    intro: 'Practical knowledge for work, finances, family and safety.',
  },
]

const a = (
  name: string,
  category: WellnessActivity['category'],
  icon: WellnessActivity['icon'],
  description: string,
  format: WellnessActivity['format'],
  interest: WellnessActivity['interest'] = 'Wellness Activity',
  subcategory?: string,
): WellnessActivity => ({
  id: name
    .toLowerCase()
    .replace(/1:1/g, 'one-on-one')
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  name,
  category,
  subcategory,
  description,
  format,
  icon,
  interest,
  cta: 'Contact Us',
})

const FIT = 'Fitness'
const LIFE = 'Lifestyle & Engagement'

export const WELLNESS_ACTIVITIES: WellnessActivity[] = [
  // Mind & Well-being
  a('Meditation', 'mind-well-being', 'sparkles', 'Guided practice to build calm and focus.', ['Group session'], 'Mental Well-being'),
  a('Stress Management', 'mind-well-being', 'gauge', 'Recognise triggers and practise simple coping tools.', ['Session', 'Workshop'], 'Mental Well-being'),
  a('Mental Well-being', 'mind-well-being', 'brain', 'Awareness sessions on well-being, resilience and seeking support.', ['Session', 'Workshop'], 'Mental Well-being'),
  a('Sound Therapy', 'mind-well-being', 'audio', 'Sound-based relaxation with breathwork and guided rest.', ['Group session', '1:1 consultation'], 'Mental Well-being'),
  a('Yoga', 'mind-well-being', 'flower', 'Yoga sessions for individuals and groups.', ['Group session']),
  a('Personality Development', 'mind-well-being', 'user', 'Interactive session on personal growth.', ['Workshop']),

  // Fitness & Lifestyle — Fitness
  a('Zumba', 'fitness-lifestyle', 'music', 'Energetic dance-based fitness session.', ['Group session'], 'Wellness Activity', FIT),
  a('Tabata', 'fitness-lifestyle', 'timer', 'Short-interval fitness session.', ['Group session'], 'Wellness Activity', FIT),
  a('Bollywood Dance', 'fitness-lifestyle', 'music', 'Fun dance session set to Bollywood music.', ['Group session'], 'Wellness Activity', FIT),
  a('Dance Fitness', 'fitness-lifestyle', 'activity', 'Dance-led movement session.', ['Group session'], 'Wellness Activity', FIT),
  a('Self Defence', 'fitness-lifestyle', 'shield', 'Practical self-defence session.', ['Workshop'], 'Wellness Activity', FIT),

  // Fitness & Lifestyle — Lifestyle & Engagement
  a('Grooming', 'fitness-lifestyle', 'sparkle', 'Session on personal grooming.', ['Workshop'], 'Wellness Activity', LIFE),
  a('Nail Art', 'fitness-lifestyle', 'brush', 'Hands-on creative nail art activity.', ['Activity'], 'Wellness Activity', LIFE),
  a('Gardening', 'fitness-lifestyle', 'sprout', 'Hands-on gardening activity.', ['Activity'], 'Wellness Activity', LIFE),
  a('Garba', 'fitness-lifestyle', 'music', 'Festive Garba session.', ['Event'], 'Wellness Activity', LIFE),
  a('Guitarist Session', 'fitness-lifestyle', 'guitar', 'Live guitar music session.', ['Event'], 'Wellness Activity', LIFE),
  a('Coffee Painting', 'fitness-lifestyle', 'coffee', 'Creative painting activity using coffee.', ['Activity'], 'Wellness Activity', LIFE),
  a('Mandala Art', 'fitness-lifestyle', 'palette', 'Mindful Mandala art activity.', ['Activity'], 'Wellness Activity', LIFE),
  a('Comedy Show', 'fitness-lifestyle', 'smile', 'Live comedy for a lighter day.', ['Event'], 'Wellness Activity', LIFE),
  a('Fun Activities', 'fitness-lifestyle', 'party', 'Engaging group activities for teams.', ['Activity'], 'Wellness Activity', LIFE),
  a('Team Building', 'fitness-lifestyle', 'users', 'Activities that bring teams together.', ['Activity'], 'Corporate Wellness', LIFE),

  // Health & Prevention
  a('Health Talk', 'health-prevention', 'mic', 'Awareness talk on health topics.', ['Talk'], 'Health Camp'),
  a('Eye Check-up Camp', 'health-prevention', 'eye', 'On-site eye check-up camp.', ['Camp'], 'Health Camp'),
  a('Dental Camp', 'health-prevention', 'smile', 'On-site dental check-up camp.', ['Camp'], 'Health Camp'),
  a('Basic Health Camp', 'health-prevention', 'stethoscope', 'On-site basic health check-up camp.', ['Camp'], 'Health Camp'),
  a('Hair & Skin Camp', 'health-prevention', 'sparkle', 'On-site hair and skin camp.', ['Camp'], 'Health Camp'),
  a('Diet & Nutrition', 'health-prevention', 'apple', 'Nutrition awareness around everyday food habits.', ['Talk', 'Workshop'], 'Nutrition'),
  a('1:1 Diet Consultation', 'health-prevention', 'clipboard', 'Personal nutrition guidance.', ['1:1 consultation'], 'Nutrition'),
  a('Acupressure', 'health-prevention', 'hand', 'Acupressure session.', ['Session']),
  a('Ergonomics Session', 'health-prevention', 'armchair', 'Workstation and posture awareness session.', ['Session'], 'Corporate Wellness'),
  a('ECG Camp', 'health-prevention', 'heartPulse', 'On-site ECG camp.', ['Camp'], 'Health Camp'),
  a('PFT Camp', 'health-prevention', 'wind', 'On-site pulmonary function test (PFT) camp.', ['Camp'], 'Health Camp'),
  a('Audiometry Camp', 'health-prevention', 'ear', 'On-site hearing (audiometry) camp.', ['Camp'], 'Health Camp'),
  a('Blood Donation Camp', 'health-prevention', 'droplet', 'Organised blood donation camp.', ['Camp'], 'Health Camp'),

  // Awareness & Professional
  a('Financial Wellness', 'awareness-professional', 'wallet', 'Awareness session on personal finances.', ['Workshop'], 'Corporate Wellness'),
  a('Tax Awareness', 'awareness-professional', 'receipt', 'Awareness session on tax basics.', ['Workshop'], 'Corporate Wellness'),
  a('AI Workshop', 'awareness-professional', 'cpu', 'Practical workshop on using AI tools.', ['Workshop'], 'Corporate Wellness'),
  a('CPR Session', 'awareness-professional', 'heartHand', 'Hands-on CPR, AED and first aid training.', ['Training'], 'CPR / First Aid'),
  a('Parenting Session', 'awareness-professional', 'baby', 'Awareness session for parents.', ['Session']),
  a('POSH Training', 'awareness-professional', 'scale', 'Prevention of Sexual Harassment (POSH) awareness training.', ['Training'], 'Corporate Wellness'),
]

export function activitiesByCategory(id: WellnessActivity['category']) {
  return WELLNESS_ACTIVITIES.filter((x) => x.category === id)
}

/* ------------------------------------------------------------------ */
/* Corporate wellness                                                  */
/* ------------------------------------------------------------------ */

/** Offerings highlighted on the homepage corporate section. */
export const CORPORATE_OFFERINGS: string[] = [
  'Desk Yoga',
  'Chair Yoga',
  'Meditation',
  'Sound Therapy',
  'Stress Management',
  'Health Talks',
  'Financial Wellness',
  'Tax Awareness',
  'AI Workshops',
  'CPR & First Aid',
  'Nutrition Sessions',
  'Ergonomics',
  'POSH Training',
  'Parenting Sessions',
  'Team Building',
  'Fun Activities',
  'Fitness Sessions',
  'Health Camps',
]

export const CORPORATE_AREAS: CorporateArea[] = [
  {
    id: 'wellness-sessions',
    name: 'Wellness Sessions',
    icon: 'flower',
    description: 'Short, practical sessions that fit into the working day.',
    includes: ['Desk Yoga', 'Chair Yoga', 'Meditation', 'Sound Therapy'],
  },
  {
    id: 'health-awareness',
    name: 'Health Awareness',
    icon: 'mic',
    description: 'Talks and trainings that build everyday health knowledge.',
    includes: ['Health Talks', 'CPR & First Aid', 'Ergonomics'],
  },
  {
    id: 'fitness',
    name: 'Fitness',
    icon: 'activity',
    description: 'Movement sessions that bring energy to teams.',
    includes: ['Fitness Sessions', 'Zumba', 'Tabata', 'Dance Fitness'],
  },
  {
    id: 'mental-well-being',
    name: 'Mental Well-being',
    icon: 'brain',
    description: 'Sessions on stress, resilience and healthier ways of working.',
    includes: ['Stress Management', 'Mental Well-being', 'Meditation'],
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: 'apple',
    description: 'Group and personal guidance on everyday food habits.',
    includes: ['Nutrition Sessions', '1:1 Diet Consultation'],
  },
  {
    id: 'preventive-camps',
    name: 'Preventive Camps',
    icon: 'tent',
    description: 'On-site camps that encourage awareness and early action.',
    includes: ['Basic Health', 'Eye', 'Dental', 'ECG', 'PFT', 'Audiometry', 'Blood Donation'],
  },
  {
    id: 'financial-wellness',
    name: 'Financial Wellness',
    icon: 'wallet',
    description: 'Awareness sessions on personal finances and tax basics.',
    includes: ['Financial Wellness', 'Tax Awareness'],
  },
  {
    id: 'professional-awareness',
    name: 'Professional Awareness',
    icon: 'graduation',
    description: 'Workshops and trainings for the modern workplace.',
    includes: ['AI Workshops', 'POSH Training', 'Parenting Sessions'],
  },
  {
    id: 'team-building',
    name: 'Team Building',
    icon: 'users',
    description: 'Shared experiences that strengthen team connection.',
    includes: ['Team Building', 'Fun Activities'],
  },
  {
    id: 'employee-engagement',
    name: 'Employee Engagement',
    icon: 'party',
    description: 'Creative and festive activities that bring people together.',
    includes: ['Garba', 'Mandala Art', 'Coffee Painting', 'Comedy Show', 'Guitarist Session'],
  },
]

export const PROGRAM_FORMATS: ProgramFormat[] = [
  {
    id: 'one-time-session',
    name: 'One-time session',
    icon: 'calendarDot',
    description: 'A single focused session on a chosen topic.',
  },
  {
    id: 'workshop',
    name: 'Workshop',
    icon: 'presentation',
    description: 'An interactive, hands-on learning format.',
  },
  {
    id: 'health-camp',
    name: 'Health camp',
    icon: 'tent',
    description: 'An on-site preventive health camp.',
  },
  {
    id: 'engagement-activity',
    name: 'Employee engagement activity',
    icon: 'party',
    description: 'A creative or festive activity for teams.',
  },
  {
    id: 'custom-program',
    name: 'Custom corporate program',
    icon: 'layers',
    description: 'A combination of formats planned around your workplace.',
  },
]

/* ------------------------------------------------------------------ */
/* Homepage content                                                    */
/* ------------------------------------------------------------------ */

export const PILLARS: (Feature & { to: string })[] = [
  {
    title: 'Healthcare',
    description: 'Doctor consultation, pharmacy, lab tests and nutrition support.',
    icon: 'stethoscope',
    to: '/healthcare',
  },
  {
    title: 'Wellness',
    description: 'Mind, movement and lifestyle experiences for everyday life.',
    icon: 'flower',
    to: '/wellness',
  },
  {
    title: 'Corporate Wellness',
    description: 'Programs designed for modern workplaces and teams.',
    icon: 'building',
    to: '/corporate-wellness',
  },
  {
    title: 'Preventive Care',
    description: 'Health camps, talks and awareness that encourage early action.',
    icon: 'shieldPlus',
    to: '/wellness#health-prevention',
  },
]

export const WHY_US: Feature[] = [
  {
    title: '360° Approach',
    description: 'Healthcare, wellness and preventive solutions in one ecosystem.',
    icon: 'orbit',
  },
  {
    title: 'Expert-Led',
    description: 'Programs supported by qualified healthcare and wellness professionals.',
    icon: 'badgeCheck',
  },
  {
    title: 'Corporate Ready',
    description: 'Wellness experiences designed for modern workplaces and teams.',
    icon: 'building',
  },
  {
    title: 'Preventive Focus',
    description: 'Encouraging healthier habits, awareness and early action.',
    icon: 'shieldPlus',
  },
  {
    title: 'Flexible Programs',
    description: 'From individual sessions to group and workplace programs.',
    icon: 'layers',
  },
  {
    title: 'Human-Centred',
    description: 'Designed around real people, real workplaces and real wellness needs.',
    icon: 'heartHand',
  },
]

export const AUDIENCES = {
  individuals: ['Healthcare access', 'Wellness sessions', 'Nutrition', 'Preventive health'],
  organisations: [
    'Corporate wellness',
    'Employee engagement',
    'Health camps',
    'Training',
    'Team activities',
  ],
}
