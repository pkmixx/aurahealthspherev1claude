import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu } from 'lucide-react'
import { NAV_ITEMS, type NavItem } from '@/data/navigation'
import { contactHref } from '@/lib/contact'
import { Logo } from './Logo'
import { ButtonLink } from './Button'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || menuOpen
            ? 'border-b border-line-soft/70 bg-navy-950/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-cyan px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <nav aria-label="Primary" className="container-x flex h-[4.25rem] items-center justify-between gap-4 lg:h-20">
          <Link to="/" aria-label="AURASPHERE Wellness 360 — Home" className="-ml-1 shrink-0 rounded-lg p-1">
            <Logo className="w-[132px] xs:w-[148px] lg:w-[150px] xl:w-[172px]" sizes="172px" priority />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {NAV_ITEMS.filter((i) => i.to !== '/contact').map((item) => (
              <DesktopItem key={item.to} item={item} />
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink to={contactHref()} size="md" className="hidden lg:inline-flex">
              Contact Us
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              className="grid size-12 place-items-center rounded-full border border-line-soft bg-navy-900/70 text-white transition-colors hover:border-cyan/50 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false)
          menuButtonRef.current?.focus()
        }}
      />
    </>
  )
}

function DesktopItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLLIElement>(null)
  const location = useLocation()
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-flex min-h-11 items-center rounded-full px-2.5 text-[0.875rem] font-medium whitespace-nowrap transition-colors xl:px-3 xl:text-[0.9375rem] ${
      isActive ? 'text-white' : 'text-silver/80 hover:text-white'
    }`

  if (!item.children) {
    return (
      <li>
        <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
          {({ isActive }) => (
            <>
              {item.label}
              <ActiveDot active={isActive} />
            </>
          )}
        </NavLink>
      </li>
    )
  }

  const menuId = `menu-${item.to.replace(/\W/g, '')}`
  return (
    <li
      ref={wrapRef}
      className="relative flex items-center"
      onMouseEnter={() => {
        window.clearTimeout(closeTimer.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 120)
      }}
    >
      <NavLink to={item.to} className={(s) => `${linkClass(s)} pr-1!`}>
        {({ isActive }) => (
          <>
            {item.label}
            <ActiveDot active={isActive} />
          </>
        )}
      </NavLink>
      <button
        type="button"
        className="grid size-7 place-items-center rounded-full text-silver/70 hover:text-white"
        aria-label={`${item.label} menu`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-1/2 z-50 w-64 -translate-x-1/2 pt-3"
      >
        <ul className="card overflow-hidden rounded-2xl border-line bg-navy-900/95 p-2 backdrop-blur-xl">
          {item.children.map((child) => (
            <li key={child.to}>
              <Link
                to={child.to}
                className="flex min-h-11 items-center rounded-xl px-3.5 text-[0.9375rem] text-silver transition-colors hover:bg-white/5 hover:text-white"
              >
                {child.label}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-line-soft/70 pt-1">
            <Link
              to={item.to}
              className="flex min-h-11 items-center rounded-xl px-3.5 text-[0.875rem] font-medium text-cyan hover:bg-white/5"
            >
              View all {item.label.toLowerCase()} →
            </Link>
          </li>
        </ul>
      </div>
    </li>
  )
}

function ActiveDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan transition-opacity ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
