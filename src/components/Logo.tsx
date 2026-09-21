import { BRAND } from '@/config/images'

interface LogoProps {
  className?: string
  /** Rendered width hint for responsive image selection. */
  sizes?: string
  /**
   * `dark` (default) — logo sits directly on dark backgrounds.
   * `light` — logo is placed on a navy plate so it stays legible on light surfaces.
   */
  variant?: 'dark' | 'light'
  priority?: boolean
}

/** The client-supplied AURASPHERE Wellness 360 logo. Never redrawn — only framed. */
export function Logo({ className = '', sizes = '180px', variant = 'dark', priority = false }: LogoProps) {
  const { logo } = BRAND
  const img = (
    <picture>
      <source type="image/webp" srcSet={logo.srcSet} sizes={sizes} />
      <img
        src={logo.fallback}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="block h-auto w-full"
      />
    </picture>
  )

  if (variant === 'light') {
    return (
      <span className={`inline-block rounded-2xl bg-navy-950 px-4 py-3 shadow-[0_10px_30px_-12px_rgb(13_20_36/0.5)] ${className}`}>
        {img}
      </span>
    )
  }
  return <span className={`inline-block ${className}`}>{img}</span>
}
