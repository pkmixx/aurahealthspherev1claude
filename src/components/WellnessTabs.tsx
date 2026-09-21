import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { IMAGES, type ImageKey } from '@/config/images'
import { WELLNESS_CATEGORIES, activitiesByCategory } from '@/data/services'
import type { WellnessCategoryId } from '@/data/types'
import { getIcon } from '@/lib/icons'
import { contactHref } from '@/lib/contact'
import { Visual } from './Visual'
import { ButtonLink } from './Button'

const CATEGORY_IMAGE: Record<WellnessCategoryId, ImageKey> = {
  'mind-well-being': 'mind',
  'fitness-lifestyle': 'fitness',
  'health-prevention': 'prevention',
  'awareness-professional': 'awareness',
}

/** Homepage wellness explorer: accessible tabs instead of a wall of cards. */
export function WellnessTabs() {
  const [active, setActive] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const category = WELLNESS_CATEGORIES[active]
  const activities = activitiesByCategory(category.id)

  const onKeyDown = (e: KeyboardEvent) => {
    const n = WELLNESS_CATEGORIES.length
    let next = active
    if (e.key === 'ArrowRight') next = (active + 1) % n
    else if (e.key === 'ArrowLeft') next = (active - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    setActive(next)
    tabsRef.current[next]?.focus()
    tabsRef.current[next]?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Wellness categories"
        onKeyDown={onKeyDown}
        className="hide-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 xs:-mx-5 xs:px-5 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {WELLNESS_CATEGORIES.map((c, i) => {
          const Icon = getIcon(c.icon)
          const selected = i === active
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabsRef.current[i] = el
              }}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={selected}
              aria-controls={`panel-${c.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`inline-flex min-h-12 shrink-0 snap-start items-center gap-2 rounded-full border px-4 font-display text-[0.9375rem] font-medium whitespace-nowrap transition-all duration-300 ${
                selected
                  ? 'border-cyan/60 bg-cyan/10 text-white shadow-[0_0_24px_-10px_rgb(0_217_255/0.8)]'
                  : 'border-line-soft bg-navy-900 text-silver/80 hover:border-cyan/30 hover:text-white'
              }`}
            >
              <Icon aria-hidden className={`size-4 ${selected ? 'text-cyan' : ''}`} />
              {c.name}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${category.id}`}
        aria-labelledby={`tab-${category.id}`}
        tabIndex={0}
        className="card mt-6 grid overflow-hidden rounded-[1.75rem] lg:grid-cols-[0.9fr_1.1fr]"
      >
        <Visual
          image={IMAGES[CATEGORY_IMAGE[category.id]]}
          icon={category.icon}
          className="aspect-[16/9] lg:aspect-auto lg:min-h-full"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="p-5 xs:p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-medium text-cyan">
            {activities.length} activities
          </p>
          <h3 className="mt-1.5 text-2xl font-semibold sm:text-[1.75rem]">{category.name}</h3>
          <p className="mt-2 text-muted">{category.intro}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {activities.map((a) => {
              const Icon = getIcon(a.icon)
              return (
                <li key={a.id}>
                  <Link
                    to={`/wellness#${a.id}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-soft bg-navy-950/50 px-3.5 text-[0.875rem] text-silver transition-colors hover:border-cyan/50 hover:text-white"
                  >
                    <Icon aria-hidden className="size-3.5 text-cyan" />
                    {a.name}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center">
            <ButtonLink to={contactHref({ interest: 'Wellness Activity', topic: category.name })} arrow>
              Contact Us
            </ButtonLink>
            <Link
              to={`/wellness#${category.id}`}
              className="inline-flex min-h-11 items-center gap-2 px-1 font-display text-[0.9375rem] font-semibold text-silver hover:text-white"
            >
              View details <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
