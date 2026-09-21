import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import { NAV_ITEMS } from '@/data/navigation'
import { contactHref } from '@/lib/contact'
import { useScrollLock } from '@/lib/hooks'
import { ButtonLink } from './Button'
import { Logo } from './Logo'
import { MenuThumb } from './MenuThumb'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    setExpanded(null)
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panel) return
      // Simple focus trap
      const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const visible = [...focusables].filter((el) => el.offsetParent !== null)
      const first = visible[0]
      const last = visible[visible.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-[70] lg:hidden ${open ? 'visible' : 'invisible'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-line-soft bg-navy-950 shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-electric/25 blur-3xl"
        />
        <div className="relative flex h-[4.25rem] items-center justify-between px-4 xs:px-5">
          <Logo className="w-[150px] xs:w-[164px]" sizes="164px" />
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-12 place-items-center rounded-full border border-line-soft bg-navy-900 text-white hover:border-cyan/50"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="rule mx-5" />

        <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-3 py-4 xs:px-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isOpen = expanded === item.to
              return (
                <li key={item.to}>
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex min-h-13 flex-1 items-center rounded-2xl px-3 font-display text-[1.125rem] font-medium transition-colors ${
                          isActive ? 'text-cyan' : 'text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`Show ${item.label} services`}
                        aria-expanded={isOpen}
                        aria-controls={`m-${item.to.replace(/\W/g, '')}`}
                        onClick={() => setExpanded(isOpen ? null : item.to)}
                        className="grid size-12 place-items-center rounded-2xl text-silver hover:bg-white/5"
                      >
                        <ChevronDown aria-hidden className={`size-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {item.children && (
                    <ul
                      id={`m-${item.to.replace(/\W/g, '')}`}
                      hidden={!isOpen}
                      className="mt-1 mb-2 ml-3 grid grid-cols-1 gap-0.5 border-l border-line-soft pl-2"
                    >
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className="flex min-h-12 items-center gap-3 rounded-xl px-2 text-[0.9375rem] text-silver/90 hover:bg-white/5 hover:text-white"
                          >
                            <MenuThumb id={child.image} />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative border-t border-line-soft/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] xs:p-5">
          <p className="mb-3 text-sm text-muted">Tell us what you need — we'll help you find the right solution.</p>
          <ButtonLink to={contactHref()} size="lg" className="w-full" arrow>
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
