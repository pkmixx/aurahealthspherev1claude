/**
 * Planned AI-enabled features ("coming soon").
 * NONE of these are implemented in Stage 1. The UI must always label them as
 * planned, and they must never be presented as diagnosis or medical advice.
 */
import type { IconName } from '@/lib/icons'

export interface UpcomingFeature {
  id: string
  title: string
  description: string
  icon: IconName
  audience: 'Individuals' | 'Organisations' | 'Everyone'
}

export const AI_FEATURES: UpcomingFeature[] = [
  {
    id: 'ai-assistant',
    title: 'AI Wellness Assistant',
    description: 'A conversational guide to help you find the right healthcare service, wellness activity or expert.',
    icon: 'bot',
    audience: 'Everyone',
  },
  {
    id: 'personalised-plans',
    title: 'Personalised Wellness Journeys',
    description: 'Suggestions for sessions and habits based on the goals and preferences you choose to share.',
    icon: 'route',
    audience: 'Individuals',
  },
  {
    id: 'program-planner',
    title: 'Smart Corporate Program Planner',
    description: 'Help for HR and people teams to plan a balanced wellness calendar around team size, goals and formats.',
    icon: 'calendarDot',
    audience: 'Organisations',
  },
  {
    id: 'engagement-insights',
    title: 'Engagement Insights',
    description: 'Aggregated, privacy-first views of program participation to help organisations plan what comes next.',
    icon: 'chart',
    audience: 'Organisations',
  },
]

export const AI_PRINCIPLES = [
  'Supports qualified professionals — never replaces them',
  'No diagnosis or medical decisions',
  'Privacy-first and consent-based',
]
