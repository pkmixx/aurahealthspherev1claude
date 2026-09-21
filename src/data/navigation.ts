import { ROUTES } from '@/config/routes'

export interface NavChild {
  label: string
  to: string
  /** Content id for a small menu thumbnail (see miniFor in config/images.ts). */
  image?: string
}

export interface NavItem {
  label: string
  to: string
  children?: NavChild[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: ROUTES.home.label, to: ROUTES.home.path },
  {
    label: ROUTES.healthcare.label,
    to: ROUTES.healthcare.path,
    children: [
      { label: 'Doctor Consultation', to: '/healthcare#doctor-consultation', image: 'doctor-consultation' },
      { label: 'Pharmacy', to: '/healthcare#pharmacy', image: 'pharmacy' },
      { label: 'Lab Tests', to: '/healthcare#lab-tests', image: 'lab-tests' },
      { label: 'Health Camps', to: '/healthcare#health-camps', image: 'health-camps' },
      { label: 'Diet & Nutrition', to: '/healthcare#diet-nutrition', image: 'diet-nutrition' },
    ],
  },
  {
    label: ROUTES.wellness.label,
    to: ROUTES.wellness.path,
    children: [
      { label: 'Yoga', to: '/wellness#yoga', image: 'yoga' },
      { label: 'Meditation', to: '/wellness#meditation', image: 'meditation' },
      { label: 'Sound Therapy', to: '/wellness#sound-therapy', image: 'sound-therapy' },
      { label: 'Fitness', to: '/wellness#fitness', image: 'fitness' },
      { label: 'Mental Well-being', to: '/wellness#mental-well-being', image: 'mental-well-being' },
      { label: 'Nutrition', to: '/wellness#diet-nutrition', image: 'diet-nutrition' },
      { label: 'Lifestyle & Engagement', to: '/wellness#lifestyle-engagement', image: 'lifestyle-engagement' },
    ],
  },
  {
    label: ROUTES.corporate.label,
    to: ROUTES.corporate.path,
    children: [
      { label: 'Wellness Activities', to: '/corporate-wellness#wellness-sessions', image: 'wellness-sessions' },
      { label: 'Health Awareness', to: '/corporate-wellness#health-awareness', image: 'health-awareness' },
      { label: 'Employee Wellness', to: '/corporate-wellness#program-areas', image: 'mental-well-being' },
      { label: 'Training & Workshops', to: '/corporate-wellness#professional-awareness', image: 'professional-awareness' },
      { label: 'Preventive Health Camps', to: '/corporate-wellness#preventive-camps', image: 'preventive-camps' },
      { label: 'Team Building', to: '/corporate-wellness#team-building', image: 'team-building' },
    ],
  },
  { label: ROUTES.experts.label, to: ROUTES.experts.path },
  { label: ROUTES.about.label, to: ROUTES.about.path },
  { label: ROUTES.contact.label, to: ROUTES.contact.path },
]

export const FOOTER_LINKS: NavChild[] = [
  { label: 'Healthcare', to: ROUTES.healthcare.path },
  { label: 'Wellness', to: ROUTES.wellness.path },
  { label: 'Corporate Wellness', to: ROUTES.corporate.path },
  { label: 'Experts', to: ROUTES.experts.path },
  { label: 'About', to: ROUTES.about.path },
  { label: 'Contact', to: ROUTES.contact.path },
]
