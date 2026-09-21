import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  id?: string
  className?: string
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  id,
  className = '',
  children,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${centered ? 'justify-center' : ''}`}>
          <span aria-hidden className="h-px w-6 bg-current opacity-70" />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className="text-[1.875rem] font-semibold xs:text-[2rem] sm:text-[2.5rem] lg:text-[3rem]">
        {title}
      </Tag>
      {description && (
        <p className="surface-text mt-4 text-[1.0625rem] leading-relaxed text-muted sm:mt-5 sm:text-lg">{description}</p>
      )}
      {children}
    </Reveal>
  )
}
