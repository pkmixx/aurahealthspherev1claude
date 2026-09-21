import { useState } from 'react'
import type { ImageSlot, VisualTheme } from '@/config/images'
import { getIcon, type IconName } from '@/lib/icons'

const THEME: Record<VisualTheme, { a: string; b: string; icon: IconName }> = {
  healthcare: { a: '#155CFF', b: '#00D9FF', icon: 'stethoscope' },
  wellness: { a: '#1B4FD8', b: '#39E0F5', icon: 'flower' },
  corporate: { a: '#2A4BA8', b: '#00B8E6', icon: 'building' },
  prevention: { a: '#155CFF', b: '#6FE7FF', icon: 'shieldPlus' },
  nutrition: { a: '#1767E0', b: '#3FE0D0', icon: 'apple' },
  mind: { a: '#3246C8', b: '#00D9FF', icon: 'brain' },
  fitness: { a: '#155CFF', b: '#22C3FF', icon: 'activity' },
  awareness: { a: '#1D3F82', b: '#00D9FF', icon: 'graduation' },
}

interface VisualProps {
  image: ImageSlot
  className?: string
  /** Icon override for the abstract placeholder. */
  icon?: IconName
  sizes?: string
  priority?: boolean
}

/**
 * Renders the configured photo, or an abstract orbital composition when no
 * photo is configured (or it fails to load). Never shows a broken image.
 */
export function Visual({ image, className = '', icon, sizes = '(min-width: 1024px) 50vw, 100vw', priority }: VisualProps) {
  const [failed, setFailed] = useState(false)
  const t = THEME[image.theme]

  if (image.src && !failed) {
    return (
      <div className={`relative overflow-hidden bg-navy-850 ${className}`}>
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(7_11_20/0.45))]" />
      </div>
    )
  }

  const Icon = getIcon(icon ?? t.icon)
  return (
    <div
      role="img"
      aria-label={image.alt}
      className={`relative isolate overflow-hidden bg-navy-900 ${className}`}
      style={{
        backgroundImage: `radial-gradient(90% 80% at 85% 10%, ${t.b}33, transparent 60%), radial-gradient(80% 90% at 10% 100%, ${t.a}40, transparent 60%)`,
      }}
    >
      <svg aria-hidden viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id={`g-${image.theme}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={t.a} />
            <stop offset="1" stopColor={t.b} />
          </linearGradient>
        </defs>
        <g fill="none" stroke={`url(#g-${image.theme})`} strokeOpacity="0.5">
          <ellipse cx="290" cy="130" rx="150" ry="52" transform="rotate(-18 290 130)" />
          <ellipse cx="290" cy="130" rx="110" ry="110" strokeOpacity="0.25" />
          <ellipse cx="290" cy="130" rx="70" ry="70" strokeOpacity="0.35" />
        </g>
        <circle cx="384" cy="92" r="4" fill={t.b} opacity="0.9" />
        <circle cx="175" cy="178" r="3" fill={t.b} opacity="0.7" />
        <path d="M0 210 C 90 180, 160 240, 260 205 S 400 190, 400 190" stroke={t.b} strokeOpacity="0.25" fill="none" />
      </svg>
      <div className="absolute top-1/2 right-[27.5%] grid size-16 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/30 bg-navy-950/60 text-cyan shadow-[0_0_40px_-6px_rgb(0_217_255/0.45)] backdrop-blur-sm sm:size-20">
        <Icon aria-hidden className="size-7 sm:size-8" strokeWidth={1.6} />
      </div>
    </div>
  )
}
