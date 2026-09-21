import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE } from '@/config/site'

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const match = selector.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/)
    if (match) el.setAttribute(match[1], match[2])
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Per-route title, description, canonical and Open Graph tags. */
export function useDocumentMeta(title: string, description: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title
    const origin = SITE.url || window.location.origin
    const canonical = `${origin}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', canonical)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[property="og:image"]', 'content', `${origin}${SITE.ogImage}`)
  }, [title, description, pathname])
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Adds `is-visible` once the element scrolls into view (CSS handles motion). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/** Locks body scroll while `locked` is true (menus, modals). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
