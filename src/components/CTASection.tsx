import type { ReactNode } from 'react'
import { contactHref, type ContactIntent } from '@/lib/contact'
import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { OrbitRings } from './OrbitRings'

interface CTASectionProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  buttonLabel?: string
  intent?: ContactIntent
  secondary?: { label: string; to: string }
}

/** Large premium closing CTA. Always routes to Contact. */
export function CTASection({
  eyebrow,
  title,
  description,
  buttonLabel = 'Contact Us',
  intent,
  secondary,
}: CTASectionProps) {
  return (
    <section className="section-y relative">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-navy-900 px-5 py-14 text-center xs:px-6 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(21_92_255/0.35),transparent_70%),radial-gradient(40%_60%_at_50%_110%,rgb(0_217_255/0.18),transparent_70%)]"
          />
          <OrbitRings className="absolute top-1/2 left-1/2 -z-10 w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-60 sm:w-[900px]" />
          {eyebrow && <p className="eyebrow mb-4 justify-center">{eyebrow}</p>}
          <h2 className="mx-auto max-w-3xl text-[2rem] font-semibold xs:text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">{title}</h2>
          {description && <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] text-silver/85 sm:text-lg">{description}</p>}
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 xs:flex-row xs:items-center">
            <ButtonLink to={contactHref(intent)} size="lg" arrow>
              {buttonLabel}
            </ButtonLink>
            {secondary && (
              <ButtonLink to={secondary.to} size="lg" variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
