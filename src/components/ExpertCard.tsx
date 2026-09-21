import { Link } from 'react-router-dom'
import type { Expert } from '@/data/experts'
import { contactHref } from '@/lib/contact'
import { ExpertPhoto } from './ExpertPhoto'

interface ExpertCardProps {
  expert: Expert
  onViewProfile: (expert: Expert) => void
  className?: string
}

export function ExpertCard({ expert, onViewProfile, className = '' }: ExpertCardProps) {
  const tags = expert.tags.slice(0, 3)
  const more = expert.tags.length - tags.length
  return (
    <article className={`card card-hover group flex h-full flex-col overflow-hidden ${className}`}>
      <div className="relative">
        <ExpertPhoto expert={expert} className="aspect-[5/4] w-full" />
        <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-navy-950/75 px-3 py-1 text-xs font-medium text-silver backdrop-blur">
          {expert.role}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[1.1875rem] font-semibold">{expert.name}</h3>
        <p className="mt-1.5 text-[0.875rem] leading-snug text-cyan/90">{expert.credentials}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Areas of expertise">
          {tags.map((t) => (
            <li key={t} className="chip text-[0.75rem]!">
              {t}
            </li>
          ))}
          {more > 0 && <li className="chip text-[0.75rem]! text-muted">+{more} more</li>}
        </ul>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <button
            type="button"
            onClick={() => onViewProfile(expert)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-silver/30 px-3 font-display text-sm font-semibold text-white transition-colors hover:border-cyan/60 hover:bg-white/5"
            aria-label={`View profile of ${expert.name}`}
          >
            View Profile
          </button>
          <Link
            to={contactHref({ interest: expert.interest, topic: expert.name })}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#155CFF_0%,#00D9FF_100%)] px-3 font-display text-sm font-semibold text-navy-950 transition-shadow hover:shadow-[0_10px_28px_-10px_rgb(0_217_255/0.7)]"
            aria-label={`Contact us about ${expert.name}`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </article>
  )
}
