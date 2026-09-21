import { useState } from 'react'
import { ROUTES } from '@/config/routes'
import { EXPERT_CATEGORIES, EXPERTS, expertsInCategory, type ExpertCategory } from '@/data/experts'
import { useDocumentMeta } from '@/lib/hooks'
import { contactHref } from '@/lib/contact'
import { useExpertModal } from '@/lib/useExpertModal'
import { PageHero } from '@/components/PageHero'
import { ButtonLink } from '@/components/Button'
import { ExpertCard } from '@/components/ExpertCard'
import { ExpertModal } from '@/components/ExpertModal'
import { CTASection } from '@/components/CTASection'
import { HealthDisclaimer } from '@/components/HealthDisclaimer'
import { EXPERT_NOTE } from '@/data/disclaimers'

type Filter = ExpertCategory | 'All'

export default function Experts() {
  useDocumentMeta(ROUTES.experts.title, ROUTES.experts.description)
  const [filter, setFilter] = useState<Filter>('All')
  const { expert, open, close } = useExpertModal()
  const list = expertsInCategory(filter)

  const count = (c: Filter) => expertsInCategory(c).length

  return (
    <>
      <PageHero
        eyebrow="Our experts"
        title={
          <>
            Qualified people. <span className="text-gradient">Human care.</span>
          </>
        }
        description="Doctors and wellness professionals supporting AURASPHERE healthcare, wellness and corporate programs."
        actions={
          <ButtonLink to={contactHref({ interest: 'Doctor Consultation' })} size="lg" arrow>
            Contact Us
          </ButtonLink>
        }
      />

      <div className="sticky top-[4.25rem] z-30 border-y border-line-soft/70 bg-navy-950/90 backdrop-blur-xl lg:top-20">
        <div
          role="group"
          aria-label="Filter experts by category"
          className="container-x hide-scrollbar flex gap-2 overflow-x-auto py-3"
        >
          {(['All', ...EXPERT_CATEGORIES] as Filter[]).map((c) => {
            const active = filter === c
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c)}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.875rem] font-medium whitespace-nowrap transition-colors ${
                  active ? 'border-cyan/60 bg-cyan/10 text-white' : 'border-line-soft text-silver/80 hover:border-cyan/30 hover:text-white'
                }`}
              >
                {c}
                <span className={`rounded-full px-1.5 text-xs ${active ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-muted'}`}>{count(c)}</span>
              </button>
            )
          })}
        </div>
      </div>

      <section aria-label="Expert directory" className="container-x py-10 sm:py-16">
        <p className="sr-only" aria-live="polite">
          Showing {list.length} of {EXPERTS.length} experts
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {list.map((e) => (
            <li key={e.id}>
              <ExpertCard expert={e} onViewProfile={open} />
            </li>
          ))}
        </ul>
        <HealthDisclaimer note={EXPERT_NOTE} className="mt-12" />
      </section>

      <ExpertModal expert={expert} onClose={close} />

      <CTASection
        title="Not sure who to speak to?"
        description="Tell us what you need and we'll point you to the right expert or program."
        secondary={{ label: 'Healthcare services', to: ROUTES.healthcare.path }}
      />
    </>
  )
}
