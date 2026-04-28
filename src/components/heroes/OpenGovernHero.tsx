"use client";

// OpenGovern — Linear-style: civic democracy UI with radial graph + proposals
export function OpenGovernHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Agora radial */}
      <rect x="20" y="20" width="280" height="280" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="280" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="280" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="160" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">agora — barcelona district 1</text>

      {/* Radial nodes */}
      {[
        { cx: 160, cy: 170, label: "Transit", votes: "987", active: false },
        { cx: 240, cy: 120, label: "Budget", votes: "1.8k", active: false },
        { cx: 270, cy: 190, label: "Zoning", votes: "3.1k", active: true },
        { cx: 230, cy: 250, label: "Schools", votes: "4.2k", active: false },
        { cx: 160, cy: 260, label: "Parks", votes: "2.6k", active: false },
        { cx: 90, cy: 220, label: "Health", votes: "1.4k", active: false },
        { cx: 80, cy: 140, label: "Safety", votes: "892", active: false },
      ].map((node) => (
        <g key={node.label}>
          <line x1="160" y1="170" x2={node.cx} y2={node.cy}
            stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" strokeDasharray="2 4" />
          <circle cx={node.cx} cy={node.cy} r="28"
            fill={node.active ? "rgba(113,112,255,0.08)" : "rgba(255,255,255,0.02)"}
            stroke={node.active ? "rgba(113,112,255,0.2)" : "rgba(255,255,255,0.08)"}
            strokeWidth="0.75" />
          <text x={node.cx} y={node.cy - 6} fontSize="6" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">{node.label}</text>
          <text x={node.cx} y={node.cy + 6} fontSize="5.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">{node.votes}</text>
        </g>
      ))}

      {/* Center — agora hub */}
      <circle cx="160" cy="170" r="22"
        fill="rgba(113,112,255,0.06)"
        stroke="rgba(113,112,255,0.2)"
        strokeWidth="1" />
      <text x="160" y="166" fontSize="5" fill="rgba(113,112,255,0.5)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">AGORA</text>
      <text x="160" y="178" fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="700">48%</text>

      {/* Proposals panel */}
      <rect x="316" y="20" width="184" height="180" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="20" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="44" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">active proposals</text>

      {[
        { title: "Bike Lane Expansion", area: "Transit", votes: "1,234", pct: 67, up: true },
        { title: "School Lunch Program", area: "Schools", votes: "892", pct: 54, up: true },
        { title: "Park Hours Extension", area: "Parks", votes: "445", pct: 41, up: false },
      ].map((p, i) => (
        <g key={p.title} transform={`translate(324, ${i * 52 + 60})`}>
          <rect x="0" y="0" width="168" height="44" rx="4"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5" />
          <text x="8" y="13" fontSize="6.5" fill="rgba(255,255,255,0.6)" fontFamily="JetBrains Mono, monospace" fontWeight="600">{p.title}</text>
          <text x="8" y="25" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">{p.area}</text>
          <rect x="8" y="30" width="152" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
          <rect x="8" y="30" width={Math.round(152 * p.pct / 100)} height="4" rx="2"
            fill={p.up ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"} />
          <text x="152" y="40" fontSize="5.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" textAnchor="end">{p.pct}%</text>
        </g>
      ))}

      {/* Civic stats */}
      <rect x="316" y="216" width="184" height="104" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="216" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="240" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="236" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">civic stats</text>

      {[
        { label: "Citizens", val: "12.4K" },
        { label: "Proposals", val: "7 active" },
        { label: "Polls", val: "23 open" },
      ].map((s, i) => (
        <g key={s.label} transform={`translate(324, ${i * 26 + 254})`}>
          <text x="0" y="0" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">{s.label}</text>
          <text x="168" y="0" fontSize="8" fill="rgba(255,255,255,0.65)" fontFamily="JetBrains Mono, monospace" textAnchor="end" fontWeight="600">{s.val}</text>
        </g>
      ))}
    </svg>
  );
}
