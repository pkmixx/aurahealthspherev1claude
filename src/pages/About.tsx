import { Compass, Eye } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { IMAGES } from '@/config/images'
import { useDocumentMeta } from '@/lib/hooks'
import { PageHero } from '@/components/PageHero'
import { SectionHeading } from '@/components/SectionHeading'
import { IconCard } from '@/components/IconCard'
import { Reveal } from '@/components/Reveal'
import { Visual } from '@/components/Visual'
import { CTASection } from '@/components/CTASection'
import { Logo } from '@/components/Logo'

const PILLARS = [
  {
    icon: 'stethoscope' as const,
    title: 'Healthcare',
    description:
      'Helping people access doctor consultation, pharmacy support, lab tests, health camps and nutrition guidance — connected rather than fragmented.',
    to: ROUTES.healthcare.path,
  },
  {
    icon: 'flower' as const,
    title: 'Wellness',
    description:
      'Mind, movement, lifestyle and awareness experiences that make well-being part of everyday life, not an afterthought.',
    to: ROUTES.wellness.path,
  },
  {
    icon: 'building' as const,
    title: 'Corporate Wellness',
    description:
      'Programs for workplaces that bring health awareness, prevention, well-being and team engagement together.',
    to: ROUTES.corporate.path,
  },
]

export default function About() {
  useDocumentMeta(ROUTES.about.title, ROUTES.about.description)
  return (
    <>
      <PageHero
        eyebrow="About AURASPHERE"
        title={
          <>
            Health, seen in <span className="text-gradient">full circle.</span>
          </>
        }
        description="AURASPHERE Wellness 360 is envisioned as an integrated platform bringing healthcare, wellness, preventive care and workplace well-being together."
      />

      <section aria-labelledby="vision-heading" className="section-y border-t border-line-soft/60">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Visual image={IMAGES.aboutVision} icon="orbit" className="aspect-[4/3] rounded-[1.75rem]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <div className="space-y-10">
            <div>
              <SectionHeading
                id="vision-heading"
                eyebrow="Our vision"
                title="Complete care, in one sphere"
                description="We believe health is more than treating illness. It is prevention, awareness, movement, nutrition, mental well-being and the places where we spend our days — including work. AURASPHERE aims to bring these together into one connected experience."
              />
            </div>
            <Reveal delay={80} className="grid gap-4 xs:grid-cols-2">
              <div className="card rounded-2xl p-5">
                <Eye aria-hidden className="size-6 text-cyan" strokeWidth={1.6} />
                <h3 className="mt-3 text-lg font-semibold">Our vision</h3>
                <p className="mt-1.5 text-[0.9375rem] text-muted">An integrated 360° approach to health and well-being for people and organisations.</p>
              </div>
              <div className="card rounded-2xl p-5">
                <Compass aria-hidden className="size-6 text-cyan" strokeWidth={1.6} />
                <h3 className="mt-3 text-lg font-semibold">Our approach</h3>
                <p className="mt-1.5 text-[0.9375rem] text-muted">Human-centred, expert-supported and focused on prevention and everyday habits.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="surface-light section-y">
        <div className="container-x">
          <SectionHeading
            id="approach-heading"
            eyebrow="Our approach"
            title="Three pillars. One ecosystem."
            description="Each pillar stands on its own — together they cover the full circle of health."
            align="center"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <IconCard icon={p.icon} title={p.title} description={p.description} to={p.to} tone="light" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="principles-heading" eyebrow="What guides us" title="Aspirational, and grounded in facts" />
            <Reveal delay={80} className="mt-8 hidden lg:block">
              <Logo className="w-[260px] opacity-90" sizes="260px" />
            </Reveal>
          </div>
          <ul className="divide-y divide-line-soft/70 border-y border-line-soft/70">
            {[
              ['People first', 'Designed around real people, real workplaces and real wellness needs.'],
              ['Prevention matters', 'Encouraging healthier habits, awareness and early action.'],
              ['Qualified support', 'Programs supported by qualified healthcare and wellness professionals.'],
              ['Honest communication', 'Clear information, with no exaggerated claims.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 60} className="flex gap-5 py-6">
                <span className="font-display text-sm font-semibold text-cyan">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold">{t}</h3>
                  <p className="mt-1.5 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

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
