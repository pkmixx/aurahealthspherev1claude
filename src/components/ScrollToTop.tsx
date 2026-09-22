import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'

/**
 * 1. Resets scroll on route change, or scrolls to the #hash target.
 * 2. Renders a floating "back to top" button after scrolling.
 */
export function ScrollToTop() {
  const { pathname, hash, search } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      // Targets may render after lazy-loaded pages mount; retry briefly.
      const attempt = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ block: 'start' })
          if (el.tabIndex < 0 && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
            el.setAttribute('tabindex', '-1')
          }
          el.focus({ preventScroll: true })
        } else if (tries++ < 20) {
          window.setTimeout(attempt, 50)
        }
      }
      attempt()
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash, search])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.25rem)] z-40 grid size-12 place-items-center rounded-full border border-line bg-navy-900/90 text-cyan shadow-lg backdrop-blur transition-all duration-300 hover:border-cyan/60 hover:text-white sm:right-6 sm:bottom-[5.75rem] ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  )
}
