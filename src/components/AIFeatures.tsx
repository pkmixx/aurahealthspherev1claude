import { ShieldCheck } from 'lucide-react'
import { AI_FEATURES, AI_PRINCIPLES } from '@/data/upcoming'
import { getIcon } from '@/lib/icons'
import { contactHref } from '@/lib/contact'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { ButtonLink } from './Button'

/**
 * "Coming soon" AI section. Everything here is explicitly labelled as planned —
 * nothing is interactive or implied to work in Stage 1.
 */
export function AIFeatures() {
  return (
    <section aria-labelledby="ai-heading" className="section-y relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_100%_0%,rgb(21_92_255/0.18),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(0_217_255/0.08),transparent_70%)]"
      />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <SectionHeading
              id="ai-heading"
              eyebrow="Coming soon"
              title={
                <>
                  AI-enabled wellness, <span className="text-gradient">on the horizon.</span>
                </>
              }
              description="We're planning thoughtful AI features to make healthcare and wellness easier to navigate — for individuals and for organisations."
            />
            <Reveal delay={80} className="mt-8">
              <ul className="space-y-3" aria-label="Our AI principles">
                {AI_PRINCIPLES.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-silver">
                    <ShieldCheck aria-hidden className="size-5 shrink-0 text-cyan" strokeWidth={1.7} />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center">
                <ButtonLink to={contactHref({ interest: 'Other', topic: 'upcoming AI features' })} variant="secondary" arrow>
                  Register interest
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {AI_FEATURES.map((f, i) => {
              const Icon = getIcon(f.icon)
              return (
                <Reveal
                  as="article"
                  key={f.id}
                  delay={(i % 2) * 90}
                  className="card relative flex flex-col overflow-hidden border-dashed p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-badge">
                      <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                    </span>
                    <span className="rounded-full border border-cyan/35 bg-cyan/10 px-2.5 py-1 font-display text-[0.6875rem] font-semibold tracking-[0.12em] text-cyan uppercase">
                      Planned
                    </span>
                  </div>
                  <h3 className="mt-6 text-[1.1875rem] font-semibold">{f.title}</h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{f.description}</p>
                  <p className="mt-5 text-xs font-medium tracking-wide text-silver/60 uppercase">For {f.audience.toLowerCase()}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
        <Reveal as="p" className="mt-10 max-w-3xl text-sm text-muted">
          These features are in planning and are not yet available. When introduced, they will support — not replace — qualified
          healthcare professionals and will not provide medical diagnosis.
        </Reveal>
      </div>
    </section>
  )
}
