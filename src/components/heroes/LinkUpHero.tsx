"use client";

// LinkUp — Linear-style: professional matching UI with profile cards
export function LinkUpHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Main card stack */}
      <rect x="20" y="20" width="320" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="320" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="320" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="180" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">linkup — match feed</text>

      {/* Profile cards — overlapping stack */}
      {/* Card 3 (back) */}
      <g transform="translate(50, 90)">
        <rect x="0" y="0" width="160" height="200" rx="8" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" />
        <rect x="0" y="0" width="160" height="120" rx="8" fill="rgba(255,255,255,0.03)" />
        <rect x="0" y="100" width="160" height="20" fill="rgba(255,255,255,0.03)" />
        {/* Avatar placeholder */}
        <rect x="55" y="30" width="50" height="50" rx="25" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
        <text x="80" y="60" fontSize="12" fill="rgba(255,255,255,0.15)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">JM</text>
        <text x="80" y="132" fontSize="8" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">Jordi M.</text>
        <text x="80" y="146" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Founder · Barcelona</text>
        {/* Skill tags */}
        <rect x="24" y="158" width="36" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="42" y="168" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">B2B</text>
        <rect x="64" y="158" width="36" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="82" y="168" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">SaaS</text>
        <rect x="104" y="158" width="36" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="122" y="168" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">AI</text>
        {/* Match score */}
        <text x="130" y="50" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="end">87%</text>
      </g>

      {/* Card 2 (middle) */}
      <g transform="translate(110, 70)">
        <rect x="0" y="0" width="160" height="200" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(113,112,255,0.12)" strokeWidth="1" />
        <rect x="0" y="0" width="160" height="120" rx="8" fill="rgba(113,112,255,0.04)" />
        <rect x="0" y="100" width="160" height="20" fill="rgba(255,255,255,0.03)" />
        <rect x="55" y="30" width="50" height="50" rx="25" fill="rgba(113,112,255,0.1)" stroke="rgba(113,112,255,0.2)" strokeWidth="0.75" />
        <text x="80" y="60" fontSize="12" fill="rgba(113,112,255,0.5)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">SL</text>
        <text x="80" y="132" fontSize="8" fill="rgba(255,255,255,0.75)" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">Sara L.</text>
        <text x="80" y="146" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Designer · Remote</text>
        <rect x="24" y="158" width="44" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="46" y="168" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Design</text>
        <rect x="72" y="158" width="44" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="94" y="168" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Product</text>
        <rect x="120" y="158" width="20" height="14" rx="3" fill="rgba(113,112,255,0.1)" stroke="rgba(113,112,255,0.15)" strokeWidth="0.5" />
        <text x="130" y="168" fontSize="5.5" fill="rgba(113,112,255,0.6)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">+2</text>
        <text x="130" y="50" fontSize="6" fill="rgba(113,112,255,0.5)" fontFamily="JetBrains Mono, monospace" textAnchor="end">94%</text>
        {/* Active badge */}
        <rect x="0" y="0" width="44" height="18" rx="9" fill="rgba(113,112,255,0.15)" stroke="rgba(113,112,255,0.25)" strokeWidth="0.5" />
        <text x="22" y="12" fontSize="5.5" fill="rgba(113,112,255,0.8)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">top pick</text>
      </g>

      {/* Connection line between cards */}
      <path d="M 180 170 Q 240 140 270 170" fill="none" stroke="rgba(113,112,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />

      {/* Action buttons */}
      <g transform="translate(50, 276)">
        <rect x="0" y="0" width="80" height="30" rx="6" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.2)" strokeWidth="0.75" />
        <text x="40" y="19" fontSize="7" fill="rgba(239,68,68,0.7)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">pass</text>
        <rect x="96" y="0" width="80" height="30" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
        <text x="136" y="19" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">save</text>
        <rect x="192" y="0" width="80" height="30" rx="6" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.25)" strokeWidth="0.75" />
        <text x="232" y="19" fontSize="7" fill="rgba(16,185,129,0.8)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">connect</text>
      </g>

      {/* Filters sidebar */}
      <rect x="356" y="20" width="144" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="356" y="20" width="144" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="356" y="44" width="144" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="428" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">filters</text>

      {/* Filter rows */}
      {[
        { label: "Location", val: "Barcelona", options: 3 },
        { label: "Skills", val: "Design, B2B, AI", options: 12 },
        { label: "Availability", val: "Remote", options: 2 },
        { label: "Video", val: "With video only", options: 0 },
      ].map((f, i) => (
        <g key={f.label} transform={`translate(364, ${i * 52 + 60})`}>
          <rect x="0" y="0" width="128" height="42" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="8" y="14" fontSize="5.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">{f.label}</text>
          <text x="8" y="30" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace">{f.val}</text>
          {f.options > 0 && (
            <text x="124" y="28" fontSize="5.5" fill="rgba(113,112,255,0.6)" fontFamily="JetBrains Mono, monospace" textAnchor="end">+{f.options}</text>
          )}
        </g>
      ))}

      {/* Results count */}
      <text x="428" y="290" fontSize="6.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">24 matches found</text>
    </svg>
  );
}
