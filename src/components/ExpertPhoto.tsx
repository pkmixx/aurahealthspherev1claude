import { useState } from 'react'
import type { Expert } from '@/data/experts'

/** Expert portrait with a monogram fallback if no photo is available. */
export function ExpertPhoto({ expert, className = '' }: { expert: Expert; className?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = expert.name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  return (
    <div className={`relative overflow-hidden bg-[#eef2f6] ${className}`}>
      {expert.photo && !failed ? (
        <img
          src={expert.photo}
          alt={expert.photoAlt}
          width={480}
          height={480}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover object-[50%_18%]"
        />
      ) : (
        <div
          role="img"
          aria-label={expert.photoAlt}
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(0_217_255/0.25),transparent_60%),#0d1424] font-display text-4xl font-semibold text-silver"
        >
          {initials}
        </div>
      )}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/60 to-transparent" />
    </div>
  )
}
