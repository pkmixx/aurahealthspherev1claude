import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-display font-semibold tracking-[-0.005em] whitespace-nowrap select-none transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'text-navy-950 bg-[linear-gradient(135deg,#155CFF_0%,#00D9FF_100%)] shadow-[0_10px_30px_-12px_rgb(0_217_255/0.55)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgb(0_217_255/0.7)]',
  secondary:
    'text-white border border-silver/35 bg-white/[0.02] hover:-translate-y-0.5 hover:border-cyan/60 hover:bg-white/[0.05] hover:shadow-[0_0_24px_-8px_rgb(0_217_255/0.45)]',
  ghost: 'text-cyan hover:text-white px-0! min-h-11',
  light:
    'text-ink border border-ink/15 bg-white hover:-translate-y-0.5 hover:border-electric/50 hover:shadow-[0_10px_24px_-12px_rgb(21_92_255/0.45)]',
}

const sizes: Record<Size, string> = {
  md: 'px-5 text-[0.9375rem]',
  lg: 'px-7 text-base min-h-[3.25rem]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
  children: ReactNode
}

function classes(variant: Variant, size: Size, className = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  )
}

type ButtonLinkProps = CommonProps & { to: string } & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className' | 'children'>

/** Internal navigation styled as a button. */
export function ButtonLink({ to, variant = 'primary', size = 'md', arrow, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link to={to} className={classes(variant, size, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  )
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

export function Button({ variant = 'primary', size = 'md', arrow, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  )
}

type AnchorProps = CommonProps & Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'>

/** External links (tel:, mailto:, https:). */
export function ButtonAnchor({ variant = 'primary', size = 'md', arrow, className, children, ...rest }: AnchorProps) {
  return (
    <a className={classes(variant, size, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  )
}
