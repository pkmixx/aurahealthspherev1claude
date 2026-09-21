import { Link } from 'react-router-dom'
import { Check, MessageSquareText, PhoneCall, Route as RouteIcon } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { IMAGES } from '@/config/images'
import { HEALTHCARE_SERVICES } from '@/data/services'
import { useDocumentMeta } from '@/lib/hooks'
import { contactHref } from '@/lib/contact'
import { getIcon } from '@/lib/icons'
import { PageHero } from '@/components/PageHero'
import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { Visual } from '@/components/Visual'
import { SectionHeading } from '@/components/SectionHeading'
import { CTASection } from '@/components/CTASection'

const STEPS = [
  { title: 'Tell us what you need', text: 'Share your requirement through the contact form.', Icon: MessageSquareText },
  { title: 'We get in touch', text: 'Our team reaches out to understand your needs.', Icon: PhoneCall },
  { title: 'We guide the next step', text: 'We help you with the right healthcare option.', Icon: RouteIcon },
]

export default function Healthcare() {
  useDocumentMeta(ROUTES.healthcare.title, ROUTES.healthcare.description)

  return (
    <>
      <PageHero
        eyebrow="Healthcare"
        title={
          <>
            Healthcare, <span className="text-gradient">Connected</span> Around You.
          </>
        }
        description="Doctor consultation, pharmacy support, lab tests, health camps and nutrition — brought together so healthcare feels simpler."
        actions={
          <>
            <ButtonLink to={contactHref({ interest: 'Doctor Consultation' })} size="lg" arrow>
              Contact Us
            </ButtonLink>
            <ButtonLink to="#doctor-consultation" size="lg" variant="secondary">
              View services
            </ButtonLink>
          </>
        }
      />

      {/* Quick service index — horizontally scrollable on mobile */}
      <nav aria-label="Healthcare services" className="sticky top-[4.25rem] z-30 border-y border-line-soft/70 bg-navy-950/85 backdrop-blur-xl lg:top-20">
        <ul className="container-x hide-scrollbar flex gap-1 overflow-x-auto py-2">
          {HEALTHCARE_SERVICES.map((s) => {
            const Icon = getIcon(s.icon)
            return (
              <li key={s.id} className="shrink-0">
                <Link
                  to={`#${s.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 text-[0.9375rem] whitespace-nowrap text-silver/85 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Icon aria-hidden className="size-4 text-cyan" />
                  {s.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="container-x space-y-6 py-14 sm:space-y-8 sm:py-20 lg:space-y-10">
        {HEALTHCARE_SERVICES.map((s, i) => {
          const Icon = getIcon(s.icon)
          const flip = i % 2 === 1
          return (
            <Reveal
              as="article"
              key={s.id}
              id={s.id}
              className="card grid scroll-mt-40 overflow-hidden rounded-[1.75rem] md:grid-cols-2"
            >
              <Visual
                image={IMAGES[s.image]}
                icon={s.icon}
                className={`aspect-[16/10] md:aspect-auto md:min-h-[360px] ${flip ? 'md:order-2' : ''}`}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="flex flex-col p-6 xs:p-7 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="icon-badge">
                    <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-sm font-medium text-muted">{String(i + 1).padStart(2, '0')} / {String(HEALTHCARE_SERVICES.length).padStart(2, '0')}</span>
                </div>
                <h2 className="mt-5 text-[1.75rem] font-semibold sm:text-[2rem]">{s.name}</h2>
                <p className="mt-3 text-[1.0625rem] text-silver/85">{s.description}</p>
                <ul className="mt-6 space-y-3" aria-label={`${s.name} — what we can help with`}>
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-3 text-silver">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 text-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2 md:mt-auto">
                  <ButtonLink to={contactHref({ interest: s.interest, topic: s.name })} arrow aria-label={`Contact us about ${s.name}`}>
                    {s.cta}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <section aria-labelledby="how-heading" className="surface-light section-y">
        <div className="container-x">
          <SectionHeading id="how-heading" eyebrow="How it works" title="Simple, human and guided" align="center" />
          <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
            {STEPS.map(({ title, text, Icon }, i) => (
              <Reveal as="li" key={title} delay={i * 90} className="card-light p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="icon-badge">
                    <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-3xl font-semibold text-[#c9d6ea]">{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-2">{text}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm">
            Online booking isn't available yet — for now, every request is handled personally by our team.
          </p>
        </div>
      </section>

      <CTASection
        title="Need healthcare support?"
        description="Tell us what you need and we'll help you find the right healthcare option."
        intent={{ interest: 'Doctor Consultation' }}
        secondary={{ label: 'Meet our experts', to: ROUTES.experts.path }}
      />
    </>
  )
}
