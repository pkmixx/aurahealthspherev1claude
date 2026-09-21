import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Check, User } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { IMAGES } from '@/config/images'
import { AUDIENCES, CORPORATE_OFFERINGS, HEALTHCARE_SERVICES, PILLARS, WHY_US } from '@/data/services'
import { EXPERTS } from '@/data/experts'
import { useDocumentMeta } from '@/lib/hooks'
import { contactHref } from '@/lib/contact'
import { useExpertModal } from '@/lib/useExpertModal'
import { Hero } from '@/components/Hero'
import { SectionHeading } from '@/components/SectionHeading'
import { IconCard } from '@/components/IconCard'
import { ServiceCard } from '@/components/ServiceCard'
import { WellnessTabs } from '@/components/WellnessTabs'
import { ExpertCard } from '@/components/ExpertCard'
import { ExpertModal } from '@/components/ExpertModal'
import { CTASection } from '@/components/CTASection'
import { ButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { Visual } from '@/components/Visual'
import { OrbitRings } from '@/components/OrbitRings'

export default function Home() {
  useDocumentMeta(ROUTES.home.title, ROUTES.home.description)
  const { expert, open, close } = useExpertModal()

  return (
    <>
      <Hero />

      {/* 1 — Complete Wellness. One Sphere. */}
      <section aria-labelledby="one-sphere" className="section-y relative">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-end lg:gap-16">
            <SectionHeading
              id="one-sphere"
              eyebrow="The AURASPHERE ecosystem"
              title={
                <>
                  Complete Wellness.
                  <br />
                  <span className="text-gradient">One Sphere.</span>
                </>
              }
            />
            <Reveal delay={100}>
              <p className="text-[1.0625rem] leading-relaxed text-silver/85 sm:text-xl sm:leading-relaxed">
                From preventive healthcare to workplace wellness, AURASPHERE brings healthcare, wellness, awareness and
                lifestyle experiences together under one integrated ecosystem — so people and organisations can look
                after health as a whole, not in parts.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <IconCard icon={p.icon} title={p.title} description={p.description} to={p.to} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Healthcare When You Need It */}
      <section id="services" aria-labelledby="healthcare-heading" className="section-y relative scroll-mt-16 bg-navy-900/60">
        <div aria-hidden className="rule absolute inset-x-0 top-0" />
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="healthcare-heading"
              eyebrow="Healthcare"
              title="Healthcare When You Need It"
              description="Connected healthcare services for individuals, families and workplaces."
            />
            <Reveal className="shrink-0">
              <ButtonLink to={ROUTES.healthcare.path} variant="secondary" arrow>
                All healthcare
              </ButtonLink>
            </Reveal>
          </div>
        </div>
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="container-x mt-10 lg:mt-14">
          <ul
            className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 xs:-mx-5 xs:px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5"
            aria-label="Healthcare services"
          >
            {HEALTHCARE_SERVICES.map((s) => (
              <li key={s.id} className="w-[78%] max-w-[320px] shrink-0 snap-start xs:w-[70%] sm:w-auto sm:max-w-none">
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-center text-sm text-muted sm:hidden" aria-hidden>
            Swipe to see all services →
          </p>
        </div>
      </section>

      {/* 3 — Wellness That Fits Your Life */}
      <section aria-labelledby="wellness-heading" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="wellness-heading"
            eyebrow="Wellness"
            title="Wellness That Fits Your Life"
            description="Forty experiences across mind, movement, prevention and awareness — for individuals, groups and workplaces."
            className="mb-10 lg:mb-12"
          />
          <Reveal>
            <WellnessTabs />
          </Reveal>
        </div>
      </section>

      {/* 4 — Wellness For Modern Workplaces */}
      <section aria-labelledby="corporate-heading" className="surface-light section-y relative overflow-hidden">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="corporate-heading"
              eyebrow="Corporate wellness"
              title="Wellness For Modern Workplaces"
              description="Practical sessions, awareness programs, preventive camps and engagement activities that help teams feel better and work well together — planned around your workplace."
            />
            <Reveal delay={80}>
              <Visual image={IMAGES.corporateHero} icon="building" className="mt-10 aspect-[16/10] rounded-3xl" sizes="(min-width: 1024px) 45vw, 100vw" />
            </Reveal>
          </div>

          <Reveal delay={120} className="flex flex-col">
            <ul className="grid grid-cols-1 gap-x-6 xs:grid-cols-2" aria-label="Corporate wellness offerings">
              {CORPORATE_OFFERINGS.map((o) => (
                <li key={o} className="flex min-h-12 items-center gap-3 border-b border-[#dbe3ee] text-[0.9875rem] text-ink">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-electric/10 text-electric">
                    <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
            <div className="card mt-10 rounded-3xl border-line bg-navy-950 p-6 sm:p-8">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">Plan a Corporate Wellness Program</p>
              <p className="mt-2 text-silver/80">
                Share your team size, goals and preferred formats — we'll help shape the right program.
              </p>
              <div className="mt-6 flex flex-col gap-3 xs:flex-row">
                <ButtonLink to={contactHref({ interest: 'Corporate Wellness', topic: 'Corporate wellness program' })} arrow>
                  Contact Us
                </ButtonLink>
                <ButtonLink to={ROUTES.corporate.path} variant="secondary">
                  Explore programs
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — Meet Our Experts */}
      <section aria-labelledby="experts-heading" className="section-y">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="experts-heading"
              eyebrow="Our experts"
              title="Meet Our Experts"
              description="Qualified doctors and wellness professionals supporting AURASPHERE programs."
            />
            <Reveal className="shrink-0">
              <ButtonLink to={ROUTES.experts.path} variant="secondary" arrow>
                All experts
              </ButtonLink>
            </Reveal>
          </div>
          <ul
            className="hide-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 xs:-mx-5 xs:px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14 lg:grid-cols-3 lg:gap-5"
            aria-label="Experts"
          >
            {EXPERTS.map((e) => (
              <li key={e.id} className="w-[80%] max-w-[330px] shrink-0 snap-start xs:w-[72%] sm:w-auto sm:max-w-none">
                <ExpertCard expert={e} onViewProfile={open} />
              </li>
            ))}
          </ul>
        </div>
        <ExpertModal expert={expert} onClose={close} />
      </section>

      {/* 6 — Why AURASPHERE? */}
      <section aria-labelledby="why-heading" className="section-y relative overflow-hidden bg-navy-900/60">
        <div aria-hidden className="rule absolute inset-x-0 top-0" />
        <OrbitRings className="absolute top-10 -left-80 w-[700px] opacity-40" />
        <div className="container-x relative">
          <SectionHeading id="why-heading" eyebrow="Why us" title="Why AURASPHERE?" align="center" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {WHY_US.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80}>
                <IconCard icon={f.icon} title={f.title} description={f.description} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Built For People. Designed For Organisations. */}
      <section aria-labelledby="audience-heading" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="audience-heading"
            eyebrow="Who we serve"
            title={
              <>
                Built For People.
                <br className="hidden sm:block" /> Designed For Organisations.
              </>
            }
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2">
            <AudienceCard
              title="For Individuals"
              icon={<User aria-hidden className="size-6" strokeWidth={1.6} />}
              items={AUDIENCES.individuals}
              image={IMAGES.individuals}
              to={contactHref({ interest: 'Other', topic: 'Individual enquiry' })}
            />
            <AudienceCard
              title="For Organisations"
              icon={<Building2 aria-hidden className="size-6" strokeWidth={1.6} />}
              items={AUDIENCES.organisations}
              image={IMAGES.organisations}
              to={contactHref({ interest: 'Corporate Wellness', topic: 'Organisation enquiry' })}
              delay={100}
            />
          </div>
          <Reveal className="mt-10 flex justify-center">
            <ButtonLink to={contactHref()} size="lg" arrow>
              Talk to AURASPHERE
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* 8 — Final CTA */}
      <CTASection
        title={
          <>
            Let's Build a Healthier <span className="text-gradient">360°</span>
          </>
        }
        description="Tell us what you need. We'll help you find the right healthcare or wellness solution."
      />
    </>
  )
}

function AudienceCard({
  title,
  icon,
  items,
  image,
  to,
  delay = 0,
}: {
  title: string
  icon: React.ReactNode
  items: string[]
  image: (typeof IMAGES)[keyof typeof IMAGES]
  to: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="card card-hover group overflow-hidden">
      <Visual image={image} className="aspect-[16/7] w-full" sizes="(min-width: 1024px) 50vw, 100vw" />
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="icon-badge">{icon}</span>
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <ul className="mt-6 grid gap-x-6 gap-y-3 xs:grid-cols-2">
          {items.map((i) => (
            <li key={i} className="flex items-center gap-3 text-silver">
              <Check aria-hidden className="size-4 shrink-0 text-cyan" />
              {i}
            </li>
          ))}
        </ul>
        <Link to={to} className="mt-7 inline-flex min-h-11 items-center gap-2 font-display font-semibold text-cyan hover:text-white">
          Contact Us <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Reveal>
  )
}
