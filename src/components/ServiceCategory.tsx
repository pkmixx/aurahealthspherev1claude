import type { WellnessActivity, WellnessCategory } from '@/data/types'
import { getIcon } from '@/lib/icons'
import { miniFor } from '@/config/images'
import { AccordionItem } from './Accordion'
import { ActivityCard } from './ActivityCard'

interface ServiceCategoryProps {
  category: WellnessCategory
  activities: WellnessActivity[]
  open: boolean
  onToggle: (open: boolean) => void
}

const slug = (s: string) => s.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/**
 * A wellness category: accordion on mobile, always-expanded section from md up.
 * Activities with a `subcategory` are grouped under anchored sub-headings.
 */
export function ServiceCategory({ category, activities, open, onToggle }: ServiceCategoryProps) {
  const Icon = getIcon(category.icon)
  const mini = miniFor(category.id)
  const groups = new Map<string, WellnessActivity[]>()
  for (const a of activities) {
    const key = a.subcategory ?? ''
    groups.set(key, [...(groups.get(key) ?? []), a])
  }

  return (
    <AccordionItem
      id={category.id}
      mobileOnly
      open={open}
      onToggle={onToggle}
      headingLevel="h2"
      className="scroll-mt-40 border-b border-line-soft/70 md:border-none"
      icon={
        mini ? (
          <span className="relative size-12 shrink-0 overflow-hidden rounded-2xl border border-line-soft sm:size-14">
            <img src={mini} alt="" width={96} height={96} loading="lazy" decoding="async" className="size-full object-cover" />
            <span className="absolute right-0.5 bottom-0.5 grid size-5 place-items-center rounded-md bg-navy-950/80 text-cyan">
              <Icon aria-hidden className="size-3" strokeWidth={2} />
            </span>
          </span>
        ) : (
          <span className="icon-badge">
            <Icon aria-hidden className="size-6" strokeWidth={1.6} />
          </span>
        )
      }
      title={category.name}
      meta={`${activities.length} ${activities.length === 1 ? 'activity' : 'activities'} · ${category.intro}`}
    >
      <div className="space-y-8 pt-2 pb-8 md:pt-4 md:pb-4">
        {[...groups.entries()].map(([sub, items]) => (
          <div key={sub || 'all'}>
            {sub && (
              <h3
                id={slug(sub)}
                className="mb-4 flex scroll-mt-40 items-center gap-3 font-sans text-sm font-semibold tracking-[0.14em] text-silver/80 uppercase"
              >
                {miniFor(slug(sub)) && (
                  <img
                    src={miniFor(slug(sub))!}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="size-8 rounded-full border border-line-soft object-cover"
                  />
                )}
                {sub}
              </h3>
            )}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {items.map((a) => (
                <ActivityCard key={a.id} activity={a} headingLevel={sub ? 'h4' : 'h3'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AccordionItem>
  )
}
