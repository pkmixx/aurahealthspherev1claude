import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  title: ReactNode
  meta?: ReactNode
  icon?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onToggle?: (open: boolean) => void
  children: ReactNode
  /** Always expanded from the `md` breakpoint up (mobile-only accordion). */
  mobileOnly?: boolean
  headingLevel?: 'h2' | 'h3' | 'h4'
  id?: string
  className?: string
}

export function AccordionItem({
  title,
  meta,
  icon,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  children,
  mobileOnly = false,
  headingLevel: H = 'h3',
  id,
  className = '',
}: AccordionItemProps) {
  const [internal, setInternal] = useState(defaultOpen)
  const open = controlledOpen ?? internal
  const uid = useId()
  const panelId = `${uid}-panel`

  const toggle = () => {
    const next = !open
    if (controlledOpen === undefined) setInternal(next)
    onToggle?.(next)
  }

  return (
    <div id={id} className={className}>
      <H className="font-sans">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className={`flex min-h-14 w-full items-center gap-4 py-4 text-left ${mobileOnly ? 'md:pointer-events-none md:cursor-default' : ''}`}
          tabIndex={undefined}
        >
          {icon}
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[1.125rem] font-semibold text-inherit sm:text-xl">{title}</span>
            {meta && <span className="mt-0.5 block text-sm font-normal text-muted">{meta}</span>}
          </span>
          <ChevronDown
            aria-hidden
            className={`size-5 shrink-0 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''} ${mobileOnly ? 'md:hidden' : ''}`}
          />
        </button>
      </H>
      <div id={panelId} className={open ? 'block' : mobileOnly ? 'hidden md:block' : 'hidden'}>
        {children}
      </div>
    </div>
  )
}
