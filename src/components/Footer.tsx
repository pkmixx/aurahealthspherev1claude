import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT, SITE, SOCIAL_LINKS } from '@/config/site'
import { FOOTER_LINKS } from '@/data/navigation'
import { HEALTHCARE_SERVICES } from '@/data/services'
import { contactHref } from '@/lib/contact'
import { Logo } from './Logo'
import { ButtonLink } from './Button'

export function Footer() {
  const year = new Date().getFullYear()
  const hasContact = CONTACT.phone || CONTACT.email || CONTACT.address

  return (
    <footer className="relative overflow-hidden border-t border-line-soft/70 bg-navy-950">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-electric/10 blur-3xl" />
      <div className="container-x relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo className="w-[190px] sm:w-[210px]" sizes="210px" />
            <p className="mt-5 font-display text-[1.0625rem] leading-snug text-white">{SITE.tagline}</p>
            <p className="mt-3 text-[0.9375rem] text-muted">
              Integrated healthcare, wellness and corporate well-being solutions designed around people.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-silver uppercase">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-11 items-center text-[0.9375rem] text-muted transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-silver uppercase">Healthcare</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
              {HEALTHCARE_SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/healthcare#${s.id}`}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-muted transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-silver uppercase">Get in touch</h2>
            {hasContact ? (
              <ul className="mt-4 space-y-3 text-[0.9375rem]">
                {CONTACT.phone && (
                  <li>
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center gap-3 text-muted hover:text-white">
                      <Phone className="size-4 text-cyan" aria-hidden /> {CONTACT.phone}
                    </a>
                  </li>
                )}
                {CONTACT.email && (
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center gap-3 break-all text-muted hover:text-white">
                      <Mail className="size-4 shrink-0 text-cyan" aria-hidden /> {CONTACT.email}
                    </a>
                  </li>
                )}
                {CONTACT.address && (
                  <li className="flex gap-3 text-muted">
                    <MapPin className="mt-1 size-4 shrink-0 text-cyan" aria-hidden /> {CONTACT.address}
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-4 text-[0.9375rem] text-muted">Share your requirement and our team will get back to you.</p>
            )}
            <ButtonLink to={contactHref()} className="mt-5" arrow>
              Contact Us
            </ButtonLink>
          </div>
        </div>

        <div className="rule mt-14" />
        <div className="mt-6 flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          {SOCIAL_LINKS.length > 0 && (
            <ul className="flex flex-wrap gap-4" aria-label="Social media">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
