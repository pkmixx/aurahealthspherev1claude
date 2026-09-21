import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '@/lib/hooks'

interface RevealProps {
  as?: ElementType
  className?: string
  delay?: number
  children: ReactNode
  id?: string
}

/** Subtle fade/slide-in on scroll. Disabled automatically for reduced motion. */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, id }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}
