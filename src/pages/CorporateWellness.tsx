import { Check } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { IMAGES, thumbFor } from '@/config/images'
import { CORPORATE_AREAS, PROGRAM_FORMATS } from '@/data/services'
import { useDocumentMeta } from '@/lib/hooks'
import { contactHref } from '@/lib/contact'
import { getIcon } from '@/lib/icons'
import { PageHero } from '@/components/PageHero'
import { ButtonLink } from '@/components/Button'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { Visual } from '@/components/Visual'
import { CTASection } from '@/components/CTASection'
import { HealthDisclaimer } from '@/components/HealthDisclaimer'
import { WELLNESS_NOTE } from '@/data/disclaimers'

const APPROACH = [
  { title: 'Understand', text: 'We learn about your people, workplace and goals.' },
  { title: 'Plan', text: 'We suggest a mix of sessions, camps and activities that fit.' },
  { title: 'Deliver', text: 'Qualified professionals run the sessions with your teams.' },
]

export default function CorporateWellness() {
  useDocumentMeta(ROUTES.corporate.title, ROUTES.corporate.description)
  const corporateIntent = { interest: 'Corporate Wellness' as const, topic: 'Corporate wellness program' }

  return (
    <>
      <PageHero
        eyebrow="Corporate wellness"
        title={
          <>
            Healthier Teams.
            <br />
            <span className="text-gradient">Stronger Workplaces.</span>
          </>
        }
        description="AURASPHERE corporate wellness brings sessions, awareness programs, preventive camps and engagement activities together, planned around how your people actually work."
        actions={
          <>
            <ButtonLink to={contactHref(corporateIntent)} size="lg" arrow>
              Contact Us
            </ButtonLink>
            <ButtonLink to="#program-areas" size="lg" variant="secondary">
              Explore program areas
            </ButtonLink>
          </>
        }
        aside={
          <Visual
            image={IMAGES.corporateHero}
            icon="building"
            priority
            className="aspect-[4/3] rounded-[1.75rem] border border-line-soft"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        }
      />

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="section-y border-t border-line-soft/60 pt-14! sm:pt-20!">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="approach-heading"
            eyebrow="Our approach"
            title="Wellness that works at work"
            description="One partner for healthcare awareness, mental well-being, fitness, nutrition, preventive camps and team engagement — from a single session to an ongoing program."
          />
          <ol className="grid gap-4 sm:grid-cols-3">
            {APPROACH.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="card p-6">
                <span className="font-display text-sm font-semibold text-cyan">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Program areas */}
      <section id="program-areas" aria-labelledby="areas-heading" className="surface-light section-y scroll-mt-16">
        <div className="container-x">
          <SectionHeading
            id="areas-heading"
            eyebrow="Program areas"
            title="Everything your workplace wellness needs"
            description="Mix and match areas to build the right program for your teams."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5 xl:grid-cols-5">
            {CORPORATE_AREAS.map((area, i) => {
              const Icon = getIcon(area.icon)
              const thumb = thumbFor(area.id)
              return (
                <Reveal
                  as="article"
                  key={area.id}
                  id={area.id}
                  delay={(i % 5) * 60}
                  className="card-light card-hover group flex scroll-mt-28 flex-col overflow-hidden"
                >
                  {thumb && (
                    <div className="relative aspect-[3/2] overflow-hidden bg-paper-2">
                      <img
                        src={thumb}
                        alt=""
                        width={480}
                        height={320}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className={`flex flex-1 flex-col p-6 ${thumb ? 'pt-0' : ''}`}>
                  <span className={`icon-badge ${thumb ? 'relative -mt-6 border-white shadow-md' : ''}`}>
                    <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{area.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed">{area.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${area.name} includes`}>
                    {area.includes.map((x) => (
                      <li key={x} className="chip text-[0.75rem]!">
                        {x}
                      </li>
                    ))}
                  </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Program formats */}
      <section id="formats" aria-labelledby="formats-heading" className="section-y scroll-mt-16">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                id="formats-heading"
                eyebrow="Sample program formats"
                title="Start small or go all in"
                description="Choose a format that suits your calendar, team size and goals — or combine them into a custom program."
              />
              <Reveal delay={100} className="mt-8 hidden lg:block">
                <ButtonLink to={contactHref(corporateIntent)} arrow>
                  Contact Us
                </ButtonLink>
              </Reveal>
            </div>
            <ul className="space-y-3">
              {PROGRAM_FORMATS.map((f, i) => {
                const Icon = getIcon(f.icon)
                return (
                  <Reveal as="li" key={f.id} delay={i * 70} className="card card-hover flex items-center gap-4 rounded-2xl p-4 sm:gap-5 sm:p-5">
                    <span className="icon-badge">
                      <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.0625rem] font-semibold sm:text-lg">{f.name}</h3>
                      <p className="text-[0.9375rem] text-muted">{f.description}</p>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Why teams */}
      <section aria-labelledby="benefit-heading" className="section-y bg-navy-900/60 pt-0! sm:pt-0!">
        <div className="container-x">
          <div className="rule mb-16 sm:mb-20" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Visual image={IMAGES.organisations} icon="users" className="aspect-[16/10] rounded-[1.75rem]" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div>
              <SectionHeading id="benefit-heading" eyebrow="Designed for organisations" title="What a program can include" />
              <ul className="mt-8 grid gap-3 xs:grid-cols-2">
                {[
                  'Sessions at your office or venue',
                  'Awareness talks and trainings',
                  'Preventive health camps',
                  'Nutrition and mental well-being',
                  'Fitness and movement',
                  'Team building and celebrations',
                ].map((x) => (
                  <li key={x} className="flex gap-3 text-silver">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-cyan" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x pt-14 sm:pt-20">
        <HealthDisclaimer note={WELLNESS_NOTE} showEmergency={false} className="mx-auto max-w-4xl" />
      </div>

      <CTASection
        eyebrow="Let's plan together"
        title="Build Your Corporate Wellness Program"
        description="Tell us about your teams and goals. We'll help you shape a program that fits."
        intent={corporateIntent}
        secondary={{ label: 'Browse all activities', to: ROUTES.wellness.path }}
      />
    </>
  )
}
