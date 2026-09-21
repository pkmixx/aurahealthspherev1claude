import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { WellnessActivity } from '@/data/types'
import { getIcon } from '@/lib/icons'
import { contactHref } from '@/lib/contact'
import { thumbFor } from '@/config/images'

/**
 * Wellness activity card.
 * Mobile: compact row with a small square thumbnail. sm+: image on top.
 * Falls back to an icon badge when no image exists for the activity.
 */
export function ActivityCard({ activity, headingLevel: H = 'h3' }: { activity: WellnessActivity; headingLevel?: 'h3' | 'h4' }) {
  const Icon = getIcon(activity.icon)
  const thumb = thumbFor(activity.id)

  return (
    <article
      id={activity.id}
      className="card card-hover group flex h-full scroll-mt-28 overflow-hidden rounded-2xl sm:flex-col"
    >
      {thumb && (
        <div className="relative w-28 shrink-0 overflow-hidden bg-navy-850 xs:w-32 sm:aspect-[3/2] sm:w-full">
          <img
            src={thumb}
            alt=""
            width={480}
            height={320}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-navy-900/60 to-transparent sm:block" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col p-4 xs:p-5">
        <div className="flex items-start gap-3.5">
          {!thumb && (
            <span className="icon-badge size-11! rounded-xl!">
              <Icon aria-hidden className="size-5" strokeWidth={1.7} />
            </span>
          )}
          <div className="min-w-0">
            <H className="flex items-center gap-2 text-[1.0625rem] font-semibold">
              {thumb && <Icon aria-hidden className="size-4 shrink-0 text-cyan" strokeWidth={1.8} />}
              {activity.name}
            </H>
            <p className="mt-1 text-[0.9375rem] leading-snug text-muted">{activity.description}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3">
          <p className="flex flex-wrap gap-1.5">
            <span className="sr-only">Format:</span>
            {activity.format.map((f) => (
              <span key={f} className="chip px-2.5! py-0.5! text-[0.75rem]!">
                {f}
              </span>
            ))}
          </p>
          <Link
            to={contactHref({ interest: activity.interest, topic: activity.name })}
            className="inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-semibold text-cyan hover:text-white"
            aria-label={`Contact us about ${activity.name}`}
          >
            {activity.cta}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
