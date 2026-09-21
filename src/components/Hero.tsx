import { Building2, Flower2, ShieldPlus, Stethoscope } from 'lucide-react'
import { contactHref } from '@/lib/contact'
import { ButtonLink } from './Button'

const NODES = [
  { label: 'Healthcare', Icon: Stethoscope, pos: 'top-[6%] left-1/2 -translate-x-1/2' },
  { label: 'Wellness', Icon: Flower2, pos: 'top-1/2 right-[-2%] -translate-y-1/2' },
  { label: 'Prevention', Icon: ShieldPlus, pos: 'bottom-[6%] left-1/2 -translate-x-1/2' },
  { label: 'Corporate', Icon: Building2, pos: 'top-1/2 left-[-2%] -translate-y-1/2' },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[6.25rem] pb-16 sm:pt-32 lg:flex lg:min-h-[min(100svh,900px)] lg:items-center lg:pt-28 lg:pb-20">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_55%_at_80%_20%,rgb(21_92_255/0.30),transparent_70%),radial-gradient(45%_40%_at_10%_90%,rgb(0_217_255/0.10),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(220_227_234)_1px,transparent_1px),linear-gradient(90deg,rgb(220_227_234)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_60%_at_60%_30%,black,transparent_75%)]"
      />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 animate-fade-up">
            <span aria-hidden className="h-px w-6 bg-current opacity-70" />
            Healthcare · Wellness · Workplace
          </p>
          <h1 className="animate-fade-up text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.03em] [animation-delay:80ms] xs:text-[2.75rem] sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
            Your Health.
            <br />
            Your Wellness.
            <br />
            <span className="text-gradient">Your Complete 360° Care.</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-[1.0625rem] text-silver/85 [animation-delay:160ms] sm:text-xl sm:leading-relaxed">
            Integrated healthcare, wellness and corporate well-being solutions designed around people.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] xs:flex-row">
            <ButtonLink to="/#services" size="lg" arrow>
              Explore Services
            </ButtonLink>
            <ButtonLink to={contactHref()} size="lg" variant="secondary">
              Contact Us
            </ButtonLink>
          </div>
        </div>

        <HeroSphere />
      </div>
    </section>
  )
}

function HeroSphere() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[340px] animate-fade-up [animation-delay:200ms] xs:max-w-[380px] sm:max-w-[460px] lg:max-w-[540px]">
      {/* Glow */}
      <div className="absolute inset-[18%] rounded-full bg-electric/40 blur-[70px]" />

      <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 size-full">
        <defs>
          <radialGradient id="sphere-fill" cx="0.38" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#3C7BFF" />
            <stop offset="0.45" stopColor="#1447C8" />
            <stop offset="1" stopColor="#070B14" />
          </radialGradient>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#155CFF" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#00D9FF" stopOpacity="0.8" />
            <stop offset="1" stopColor="#155CFF" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Outer guide circles */}
        <circle cx="250" cy="250" r="226" stroke="#1D3F82" strokeOpacity="0.55" />
        <g className="origin-center animate-orbit-rev motion-reduce:animate-none" style={{ transformBox: 'fill-box' }}>
          <circle cx="250" cy="250" r="190" stroke="#1D3F82" strokeDasharray="2 9" />
        </g>

        {/* Sphere */}
        <circle cx="250" cy="250" r="118" fill="url(#sphere-fill)" />
        <circle cx="250" cy="250" r="118" stroke="#00D9FF" strokeOpacity="0.35" />
        {/* Meridians */}
        <g stroke="#DCE3EA" strokeOpacity="0.14">
          <ellipse cx="250" cy="250" rx="118" ry="40" />
          <ellipse cx="250" cy="250" rx="118" ry="82" />
          <ellipse cx="250" cy="250" rx="44" ry="118" />
          <ellipse cx="250" cy="250" rx="88" ry="118" />
        </g>
        {/* Highlight */}
        <ellipse cx="208" cy="200" rx="46" ry="26" fill="#FFFFFF" opacity="0.10" transform="rotate(-30 208 200)" />

        {/* Tilted orbits */}
        <g className="origin-center animate-orbit motion-reduce:animate-none" style={{ transformBox: 'fill-box' }}>
          <ellipse cx="250" cy="250" rx="200" ry="70" stroke="url(#ring)" strokeWidth="1.5" transform="rotate(-22 250 250)" />
          <circle cx="436" cy="178" r="5" fill="#00D9FF" />
        </g>
        <ellipse cx="250" cy="250" rx="165" ry="52" stroke="#155CFF" strokeOpacity="0.45" transform="rotate(28 250 250)" />

        {/* Subtle healthcare cross */}
        <g transform="translate(250 250)" fill="#FFFFFF">
          <rect x="-5" y="-22" width="10" height="44" rx="3" opacity="0.92" />
          <rect x="-22" y="-5" width="44" height="10" rx="3" opacity="0.92" />
        </g>
      </svg>

      {/* 360 label */}
      <div className="absolute top-[61%] left-1/2 -translate-x-1/2 font-display text-[0.8rem] font-semibold tracking-[0.3em] text-white/85 sm:text-sm">
        360°
      </div>

      {/* Pillar nodes */}
      {NODES.map(({ label, Icon, pos }) => (
        <div key={label} className={`absolute ${pos}`}>
          <div className="flex items-center gap-2 rounded-full border border-line bg-navy-900/85 py-1.5 pr-3.5 pl-1.5 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.8)] backdrop-blur-md">
            <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#155CFF,#00D9FF)] text-navy-950 sm:size-9">
              <Icon className="size-4 sm:size-[1.125rem]" strokeWidth={2} />
            </span>
            <span className="font-display text-[0.8125rem] font-medium whitespace-nowrap text-white sm:text-sm">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
