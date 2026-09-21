import type { ReactNode } from 'react'

interface ContactCardProps {
  icon: ReactNode
  label: string
  value: string | null
  href?: string
  placeholder?: string
  external?: boolean
}

/** A single contact channel. Shows a neutral placeholder until the client supplies the value. */
export function ContactCard({ icon, label, value, href, placeholder = 'To be announced', external }: ContactCardProps) {
  const content = (
    <>
      <span className="icon-badge">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm text-muted">{label}</span>
        <span className={`mt-0.5 block font-display text-[1.0625rem] font-medium break-words ${value ? 'text-white' : 'text-silver/60'}`}>
          {value ?? placeholder}
        </span>
      </span>
    </>
  )
  const cls = 'card flex min-h-[5.5rem] items-center gap-4 rounded-2xl p-4 sm:p-5'
  return value && href ? (
    <a href={href} className={`${cls} card-hover`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  )
}
