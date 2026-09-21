/**
 * Centralised image registry.
 *
 * Every visual slot on the site reads from here. When `src` is null (or the
 * file fails to load) the UI renders an elegant abstract placeholder
 * (see components/Visual.tsx) instead of a broken image.
 */

export type VisualTheme =
  | 'healthcare'
  | 'wellness'
  | 'corporate'
  | 'prevention'
  | 'nutrition'
  | 'mind'
  | 'fitness'
  | 'awareness'

export interface ImageSlot {
  src: string | null
  /** Optional responsive sources, e.g. "/images/x-640.webp 640w, /images/x-1280.webp 1280w" */
  srcSet?: string
  alt: string
  theme: VisualTheme
}

export const BRAND = {
  logo: {
    src: '/brand/logo-640.webp',
    srcSet: '/brand/logo-320.webp 320w, /brand/logo-640.webp 640w, /brand/logo-1100.webp 1100w',
    fallback: '/brand/logo-640.png',
    width: 2120,
    height: 715,
    alt: 'AURASPHERE Wellness 360',
  },
} as const

/**
 * Photos are auto-discovered from src/assets/photos as <name>-640.webp and
 * <name>-1200.webp (see scripts/generate-images.py). A missing photo simply
 * falls back to the abstract placeholder � no broken images, no 404s.
 */
const PHOTO_FILES = import.meta.glob<string>('../assets/photos/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

function photoUrl(file: string): string | undefined {
  return PHOTO_FILES[`../assets/photos/${file}`]
}

function photo(name: string, alt: string, theme: VisualTheme): ImageSlot {
  const large = photoUrl(`${name}-1200.webp`)
  const small = photoUrl(`${name}-640.webp`)
  return {
    src: large ?? small ?? null,
    srcSet: large && small ? `${small} 640w, ${large} 1200w` : undefined,
    alt,
    theme,
  }
}

export const IMAGES = {
  // Healthcare services
  doctorConsultation: photo('doctor-consultation', 'Doctor in conversation with a patient in a consultation room', 'healthcare'),
  pharmacy: photo('pharmacy', 'Pharmacist arranging medicine boxes on shelves', 'healthcare'),
  labTests: photo('lab-tests', 'Lab technician placing sample tubes in a rack', 'prevention'),
  healthCamps: photo('health-camps', 'Nurse checking blood pressure at a workplace health camp', 'prevention'),
  dietNutrition: photo('diet-nutrition', 'Balanced Indian meal with dal, roti, salad and fruit', 'nutrition'),

  // Wellness categories
  mind: photo('mind', 'Hands playing a singing bowl during a sound therapy session', 'mind'),
  fitness: photo('fitness', 'Group dance fitness class in a bright studio', 'fitness'),
  prevention: photo('prevention', 'Eye check-up at an on-site workplace camp', 'prevention'),
  awareness: photo('awareness', 'Participants practising CPR on training manikins', 'awareness'),

  // Page features
  corporateHero: photo('corporate', 'Office colleagues doing a seated stretch together at their desks', 'corporate'),
  aboutVision: photo('about-vision', 'Woman meditating beside a window at sunrise', 'wellness'),
  individuals: photo('individuals', 'Person on a morning walk in a green city park', 'mind'),
  organisations: photo('organisations', 'Facilitator leading a wellness workshop for a team', 'corporate'),
} satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof IMAGES
