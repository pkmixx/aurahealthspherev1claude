/** Decorative orbital line motif drawn from the AURASPHERE mark. */
export function OrbitRings({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 800 800" fill="none" className={`pointer-events-none ${className}`}>
      <defs>
        <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#155CFF" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#00D9FF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#155CFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g className="origin-center animate-orbit motion-reduce:animate-none" style={{ transformBox: 'fill-box' }}>
        <ellipse cx="400" cy="400" rx="380" ry="130" stroke="url(#orbit-stroke)" transform="rotate(-16 400 400)" />
        <circle cx="765" cy="300" r="4" fill="#00D9FF" />
      </g>
      <g className="origin-center animate-orbit-rev motion-reduce:animate-none" style={{ transformBox: 'fill-box' }}>
        <ellipse cx="400" cy="400" rx="300" ry="300" stroke="#1D3F82" strokeOpacity="0.6" strokeDasharray="2 10" />
        <circle cx="100" cy="400" r="3" fill="#155CFF" />
      </g>
      <circle cx="400" cy="400" r="220" stroke="#1D3F82" strokeOpacity="0.45" />
    </svg>
  )
}
