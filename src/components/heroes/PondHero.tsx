"use client";

// Pond — captured cards on the left, a day column on the right
export function PondHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />
      <text x="40" y="46" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">CAPTURED</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(40 ${64 + i * 54})`}>
          <rect width="248" height="44" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
          <rect x="12" y="12" width="20" height="20" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="44" y="14" width={150 - i * 22} height="6" rx="3" fill="rgba(255,255,255,0.18)" />
          <rect x="44" y="26" width={110 - i * 14} height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
      <path d="M300 170h70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M362 164l8 6-8 6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="380" y="46" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">TODAY</text>
      <rect x="380" y="62" width="102" height="246" rx="4" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="392" y={76 + i * 46} width="78" height="34" rx="3" fill="rgba(255,255,255,0.07)" />
      ))}
      <text x="40" y="326" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">SAVE IT · THEN SCHEDULE IT</text>
    </svg>
  );
}
