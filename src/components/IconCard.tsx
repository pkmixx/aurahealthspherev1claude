import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { getIcon, type IconName } from '@/lib/icons'

interface IconCardProps {
  icon: IconName
  title: string
  description: string
  to?: string
  index?: number
  tone?: 'dark' | 'light'
  headingLevel?: 'h3' | 'h4'
}

export function IconCard({ icon, title, description, to, index, tone = 'dark', headingLevel: H = 'h3' }: IconCardProps) {
  const Icon = getIcon(icon)
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="icon-badge">
          <Icon aria-hidden className="size-6" strokeWidth={1.6} />
        </span>
        {typeof index === 'number' && (
          <span aria-hidden className="font-display text-sm font-medium text-muted/70">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        {to && (
          <ArrowUpRight
            aria-hidden
            className="size-5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan"
          />
        )}
      </div>
      <H className="mt-6 text-[1.1875rem] font-semibold">{title}</H>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{description}</p>
    </>
  )
  const cls = `${tone === 'light' ? 'card-light' : 'card'} card-hover group block h-full p-6 sm:p-7`
  return to ? (
    <Link to={to} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}
