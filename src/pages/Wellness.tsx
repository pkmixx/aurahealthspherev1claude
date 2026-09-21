import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { WELLNESS_ACTIVITIES, WELLNESS_CATEGORIES } from '@/data/services'
import type { WellnessCategoryId } from '@/data/types'
import { useDocumentMeta } from '@/lib/hooks'
import { contactHref } from '@/lib/contact'
import { getIcon } from '@/lib/icons'
import { PageHero } from '@/components/PageHero'
import { ButtonLink } from '@/components/Button'
import { ServiceCategory } from '@/components/ServiceCategory'
import { CTASection } from '@/components/CTASection'

type Filter = 'all' | WellnessCategoryId

const slug = (s: string) => s.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** Which category contains a given #hash (category, subcategory or activity id). */
function categoryForHash(hash: string): WellnessCategoryId | null {
  const id = hash.replace(/^#/, '')
  if (!id) return null
  const cat = WELLNESS_CATEGORIES.find((c) => c.id === id)
  if (cat) return cat.id
  const act = WELLNESS_ACTIVITIES.find((a) => a.id === id || (a.subcategory && slug(a.subcategory) === id))
  return act?.category ?? null
}

export default function Wellness() {
  useDocumentMeta(ROUTES.wellness.title, ROUTES.wellness.description)
  const { hash } = useLocation()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [openIds, setOpenIds] = useState<Set<WellnessCategoryId>>(
    () => new Set([categoryForHash(hash) ?? WELLNESS_CATEGORIES[0].id]),
  )

  // Deep links (e.g. /wellness#yoga from the nav) open the right accordion.
  useEffect(() => {
    const cat = categoryForHash(hash)
    if (cat) {
      setFilter('all')
      setQuery('')
      setOpenIds((prev) => new Set(prev).add(cat))
    }
  }, [hash])

  const q = query.trim().toLowerCase()
  const visible = useMemo(
    () =>
      WELLNESS_ACTIVITIES.filter(
        (a) =>
          (filter === 'all' || a.category === filter) &&
          (!q || a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.format.some((f) => f.toLowerCase().includes(q))),
      ),
    [filter, q],
  )
  const categories = WELLNESS_CATEGORIES.map((c) => ({ category: c, items: visible.filter((a) => a.category === c.id) })).filter(
    (g) => g.items.length > 0,
  )
  const searching = q.length > 0

  return (
    <>
      <PageHero
        eyebrow="Wellness"
        title={
          <>
            Wellness Beyond <span className="text-gradient">the Workplace.</span>
          </>
        }
        description={`${WELLNESS_ACTIVITIES.length} activities across mind, movement, prevention and awareness — available for individuals, groups and organisations.`}
        actions={
          <ButtonLink to={contactHref({ interest: 'Wellness Activity' })} size="lg" arrow>
            Contact Us
          </ButtonLink>
        }
      />

      {/* Filters */}
      <div className="sticky top-[4.25rem] z-30 border-y border-line-soft/70 bg-navy-950/90 backdrop-blur-xl lg:top-20">
        <div className="container-x flex flex-col gap-3 py-3 md:flex-row md:items-center">
          <div className="relative md:w-72 md:shrink-0">
            <label htmlFor="activity-search" className="sr-only">
              Search wellness activities
            </label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              id="activity-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search activities"
              autoComplete="off"
              className="field min-h-11! rounded-full! py-2! pr-11 pl-11"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-white"
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
          <div role="group" aria-label="Filter by category" className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 xs:-mx-5 xs:px-5 md:mx-0 md:px-0">
            {(['all', ...WELLNESS_CATEGORIES.map((c) => c.id)] as Filter[]).map((id) => {
              const cat = WELLNESS_CATEGORIES.find((c) => c.id === id)
              const Icon = cat ? getIcon(cat.icon) : null
              const active = filter === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(id)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.875rem] font-medium whitespace-nowrap transition-colors ${
                    active ? 'border-cyan/60 bg-cyan/10 text-white' : 'border-line-soft text-silver/80 hover:border-cyan/30 hover:text-white'
                  }`}
                >
                  {Icon && <Icon aria-hidden className={`size-4 ${active ? 'text-cyan' : ''}`} />}
                  {cat ? cat.shortName : 'All'}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <section aria-label="Wellness activities" className="container-x py-8 sm:py-14">
        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'activity' : 'activities'} shown
        </p>
        {categories.length === 0 ? (
          <div className="card mx-auto max-w-lg rounded-3xl p-8 text-center">
            <p className="font-display text-xl text-white">No activities match “{query}”.</p>
            <p className="mt-2 text-muted">Tell us what you're looking for — we may still be able to help.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 xs:flex-row">
              <ButtonLink to={contactHref({ interest: 'Wellness Activity', topic: query })} arrow>
                Contact Us
              </ButtonLink>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setFilter('all')
                }}
                className="min-h-12 rounded-full px-5 font-display font-semibold text-cyan hover:text-white"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-0 md:space-y-14">
            {categories.map(({ category, items }) => (
              <ServiceCategory
                key={category.id}
                category={category}
                activities={items}
                open={searching || filter !== 'all' || openIds.has(category.id)}
                onToggle={(isOpen) =>
                  setOpenIds((prev) => {
                    const next = new Set(prev)
                    if (isOpen) next.add(category.id)
                    else next.delete(category.id)
                    return next
                  })
                }
              />
            ))}
          </div>
        )}
      </section>

      <CTASection
        eyebrow="Tailored for you"
        title="Looking for something specific?"
        description="Tell us about the people, the occasion and the goal — we'll help you choose the right wellness experience."
        intent={{ interest: 'Wellness Activity' }}
        secondary={{ label: 'Corporate programs', to: ROUTES.corporate.path }}
      />
    </>
  )
}
