import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { WellnessActivity } from '@/data/types'
import { getIcon } from '@/lib/icons'
import { contactHref } from '@/lib/contact'

export function ActivityCard({ activity, headingLevel: H = 'h3' }: { activity: WellnessActivity; headingLevel?: 'h3' | 'h4' }) {
  const Icon = getIcon(activity.icon)
  return (
    <article id={activity.id} className="card card-hover group flex h-full scroll-mt-28 flex-col rounded-2xl p-5">
      <div className="flex items-start gap-3.5">
        <span className="icon-badge size-11! rounded-xl!">
          <Icon aria-hidden className="size-5" strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <H className="text-[1.0625rem] font-semibold">{activity.name}</H>
          <p className="mt-1 text-[0.9375rem] leading-snug text-muted">{activity.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-1">
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
    </article>
  )
}
