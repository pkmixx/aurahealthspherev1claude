/**
 * Shared content types.
 *
 * Data is kept serialisable (icons are string keys, not components) so it can
 * later come from a CMS or API without changing UI components. Optional
 * Stage 2 fields are declared but unused in Stage 1.
 */
import type { IconName } from '@/lib/icons'
import type { ImageKey } from '@/config/images'
import type { EnquiryInterest } from './enquiry'

export type CtaLabel = 'Contact Us'

/** Reserved for Stage 2 (booking, pricing, availability). Never populated in Stage 1. */
export interface FutureCommerceFields {
  bookingEnabled?: false
  price?: never
  availability?: never
}

export interface HealthcareService extends FutureCommerceFields {
  id: string
  name: string
  icon: IconName
  image: ImageKey
  summary: string
  description: string
  features: string[]
  interest: EnquiryInterest
  cta: CtaLabel
}

export type WellnessCategoryId =
  | 'mind-well-being'
  | 'fitness-lifestyle'
  | 'health-prevention'
  | 'awareness-professional'

export type ActivityFormat =
  | 'Session'
  | 'Group session'
  | 'Workshop'
  | 'Training'
  | 'Camp'
  | 'Talk'
  | '1:1 consultation'
  | 'Activity'
  | 'Event'

export interface WellnessActivity extends FutureCommerceFields {
  id: string
  name: string
  category: WellnessCategoryId
  subcategory?: string
  description: string
  format: ActivityFormat[]
  icon: IconName
  interest: EnquiryInterest
  cta: CtaLabel
}

export interface WellnessCategory {
  id: WellnessCategoryId
  name: string
  shortName: string
  icon: IconName
  intro: string
}

export interface CorporateArea {
  id: string
  name: string
  icon: IconName
  description: string
  includes: string[]
}

export interface ProgramFormat {
  id: string
  name: string
  icon: IconName
  description: string
}

export interface Feature {
  title: string
  description: string
  icon: IconName
}
