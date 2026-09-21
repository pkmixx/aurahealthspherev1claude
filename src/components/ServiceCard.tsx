import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { HealthcareService } from '@/data/types'
import { IMAGES } from '@/config/images'
import { getIcon } from '@/lib/icons'
import { contactHref } from '@/lib/contact'
import { Visual } from './Visual'

interface ServiceCardProps {
  service: HealthcareService
  className?: string
}

/** Compact healthcare service card: image, icon, name, 1-line summary, Contact CTA. */
export function ServiceCard({ service, className = '' }: ServiceCardProps) {
  const Icon = getIcon(service.icon)
  return (
    <article className={`card card-hover group flex h-full flex-col overflow-hidden ${className}`}>
      <Visual image={IMAGES[service.image]} icon={service.icon} className="aspect-[16/10] w-full" sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 80vw" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="icon-badge size-10! rounded-xl!">
          <Icon aria-hidden className="size-5" strokeWidth={1.7} />
        </span>
        <h3 className="mt-4 text-[1.125rem] font-semibold">{service.name}</h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
        <Link
          to={contactHref({ interest: service.interest, topic: service.name })}
          className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-full font-display text-[0.9375rem] font-semibold text-cyan transition-colors hover:text-white"
          aria-label={`Contact us about ${service.name}`}
        >
          {service.cta}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
