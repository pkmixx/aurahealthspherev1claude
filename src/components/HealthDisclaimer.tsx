import { Link } from 'react-router-dom'
import { Info, Siren } from 'lucide-react'
import { EMERGENCY_NOTE, SHORT_DISCLAIMER } from '@/data/disclaimers'

interface HealthDisclaimerProps {
  /** Extra context-specific note (e.g. wellness or expert note). */
  note?: string
  showEmergency?: boolean
  className?: string
  compact?: boolean
}

/** Reusable health disclaimer block. Links to the full /disclaimer page. */
export function HealthDisclaimer({ note, showEmergency = true, className = '', compact = false }: HealthDisclaimerProps) {
  return (
    <aside
      aria-label="Health disclaimer"
      className={`rounded-2xl border border-line-soft bg-navy-900/70 text-[0.9375rem] leading-relaxed text-silver/85 ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      } ${className}`}
    >
      <div className="flex gap-3">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-cyan" />
        <div className="space-y-2">
          <p>
            <strong className="font-semibold text-white">Health disclaimer: </strong>
            {SHORT_DISCLAIMER}
          </p>
          {note && <p>{note}</p>}
          <p>
            <Link to="/disclaimer" className="font-medium text-cyan underline-offset-4 hover:text-white hover:underline">
              Read the full disclaimer
            </Link>
          </p>
        </div>
      </div>
      {showEmergency && (
        <div className="mt-4 flex gap-3 rounded-xl border border-[#ff7a8a]/30 bg-[#ff7a8a]/[0.07] p-3.5">
          <Siren aria-hidden className="mt-0.5 size-5 shrink-0 text-[#ff9aa6]" />
          <p>
            <strong className="font-semibold text-white">Emergency? </strong>
            {EMERGENCY_NOTE}
          </p>
        </div>
      )}
    </aside>
  )
}
