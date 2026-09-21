import { useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'
import type { Expert } from '@/data/experts'
import { contactHref } from '@/lib/contact'
import { ExpertPhoto } from './ExpertPhoto'
import { ButtonLink } from './Button'
import { EXPERT_NOTE } from '@/data/disclaimers'

interface ExpertModalProps {
  expert: Expert | null
  onClose: () => void
}

/** Static profile view (Stage 1). Uses native <dialog> for focus management and Esc. */
export function ExpertModal({ expert, onClose }: ExpertModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (expert && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!expert && dialog.open) {
      dialog.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [expert])

  return (
    <dialog
      ref={ref}
      aria-labelledby="expert-modal-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-0 mt-auto h-[92dvh] max-h-none w-full max-w-none overflow-hidden rounded-t-[1.75rem] border border-line bg-navy-950 p-0 text-silver backdrop:bg-navy-950/80 backdrop:backdrop-blur-sm sm:m-auto sm:h-auto sm:max-h-[88vh] sm:w-[min(920px,calc(100%-3rem))] sm:rounded-[1.75rem]"
    >
      {expert && (
        <div className="flex h-full max-h-[inherit] flex-col">
          <div className="flex items-center justify-between border-b border-line-soft/70 px-5 py-3 sm:px-7">
            <p className="eyebrow">Expert profile</p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Close profile"
              className="grid size-11 place-items-center rounded-full border border-line-soft text-white hover:border-cyan/60"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="overflow-y-auto overscroll-contain">
            <div className="grid gap-6 p-5 sm:grid-cols-[240px_1fr] sm:gap-8 sm:p-7">
              <div className="flex gap-4 sm:block">
                <ExpertPhoto expert={expert} className="aspect-square w-28 shrink-0 rounded-2xl sm:w-full" />
                <div className="min-w-0 sm:mt-5">
                  <h2 id="expert-modal-title" className="text-[1.375rem] font-semibold sm:text-2xl">
                    {expert.name}
                  </h2>
                  <p className="mt-1 text-sm text-cyan/90">{expert.role}</p>
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium tracking-wide text-muted uppercase">Credentials</p>
                <p className="mt-1 text-[1.0625rem] text-white">{expert.credentials}</p>

                <p className="mt-6 text-sm font-medium tracking-wide text-muted uppercase">Focus</p>
                <p className="mt-1 text-[1.0625rem] text-silver">{expert.focus}</p>

                {expert.sections.map((section) => (
                  <section key={section.title} className="mt-7">
                    <h3 className="text-[1.0625rem] font-semibold">{section.title}</h3>
                    <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-snug">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
                <p className="mt-8 border-t border-line-soft/70 pt-5 text-[0.8125rem] leading-relaxed text-muted">{EXPERT_NOTE}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line-soft/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] xs:flex-row xs:items-center xs:justify-between sm:px-7">
            <p className="text-sm text-muted">Want to connect? Tell us what you need.</p>
            <ButtonLink to={contactHref({ interest: expert.interest, topic: expert.name })} arrow>
              Contact Us
            </ButtonLink>
          </div>
        </div>
      )}
    </dialog>
  )
}
