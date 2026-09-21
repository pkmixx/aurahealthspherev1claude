import { Siren } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import { DISCLAIMER_SECTIONS, EMERGENCY_NOTE } from '@/data/disclaimers'
import { useDocumentMeta } from '@/lib/hooks'
import { PageHero } from '@/components/PageHero'
import { ButtonLink } from '@/components/Button'
import { contactHref } from '@/lib/contact'

export default function Disclaimer() {
  useDocumentMeta(ROUTES.disclaimer.title, ROUTES.disclaimer.description)
  return (
    <>
      <PageHero
        eyebrow="Health disclaimer"
        title="Important health information"
        description="Please read this before using the information or services described on this website."
      />
      <section className="container-x pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-3 rounded-2xl border border-[#ff7a8a]/35 bg-[#ff7a8a]/[0.08] p-5 text-[1.0625rem] text-silver">
            <Siren aria-hidden className="mt-1 size-5 shrink-0 text-[#ff9aa6]" />
            <p>
              <strong className="text-white">Emergency: </strong>
              {EMERGENCY_NOTE}
            </p>
          </div>

          <nav aria-label="On this page" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {DISCLAIMER_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="chip min-h-10 hover:border-cyan/50 hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 divide-y divide-line-soft/70 border-y border-line-soft/70">
            {DISCLAIMER_SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 py-8">
                <h2 id={`${s.id}-h`} className="flex items-baseline gap-3 text-xl font-semibold sm:text-2xl">
                  <span className="font-display text-sm text-cyan">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-[1.0625rem] text-silver/85">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">
            This disclaimer may be updated from time to time. For questions, please contact us.
          </p>
          <ButtonLink to={contactHref()} className="mt-6" arrow>
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
