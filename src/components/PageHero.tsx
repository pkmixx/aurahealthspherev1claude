import type { ReactNode } from 'react'
import { OrbitRings } from './OrbitRings'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
}

/** Hero for inner pages — compact on mobile, editorial on desktop. */
export function PageHero({ eyebrow, title, description, actions, aside }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-[6.5rem] pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_0%,rgb(21_92_255/0.28),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(0_217_255/0.08),transparent_70%)]"
      />
      <OrbitRings className="absolute -top-40 -right-64 -z-10 w-[720px] opacity-70 sm:-right-40 lg:-right-24 lg:w-[860px]" />
      <div className={`container-x ${aside ? 'grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14' : ''}`}>
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow mb-5">
            <span aria-hidden className="h-px w-6 bg-current opacity-70" />
            {eyebrow}
          </p>
          <h1 className="text-[2.25rem] leading-[1.08] font-semibold xs:text-[2.5rem] sm:text-5xl lg:text-[3.75rem]">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-[1.0625rem] text-silver/80 sm:mt-6 sm:text-lg">{description}</p>}
          {actions && <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">{actions}</div>}
        </div>
        {aside && <div className="animate-fade-up [animation-delay:150ms]">{aside}</div>}
      </div>
    </section>
  )
}
