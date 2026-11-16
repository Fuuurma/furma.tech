"use client";

// Software Factory — the fleet board: claimed work moving lane to lane
export function SoftwareFactoryHero({ className = "" }: { className?: string }) {
  const lanes = [
    { label: "CLAIMED", x: 40, cards: [0, 1] },
    { label: "WORKING", x: 196, cards: [0, 1, 2] },
    { label: "LANDED", x: 352, cards: [0, 1, 2, 3] },
  ];
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />
      <text x="40" y="44" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">CONTROL PLANE · PRIVATE</text>
      {lanes.map((lane) => (
        <g key={lane.label}>
          <text x={lane.x} y="66" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">{lane.label}</text>
          {lane.cards.map((i) => (
            <g key={i} transform={`translate(${lane.x} ${84 + i * 56})`}>
              <rect width="140" height="46" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <rect x="10" y="10" width="72" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
              <rect x="10" y="24" width="104" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
              <rect x="10" y="34" width="52" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
            </g>
          ))}
        </g>
      ))}
      {[188, 344].map((x) => (
        <path key={x} d={`M${x} 106h8m-4-4 4 4-4 4`} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      ))}
      <line x1="40" y1="300" x2="480" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="40" y="322" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">CLAIM → WORK → VERIFY → LAND</text>
      <text x="480" y="322" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" textAnchor="end">PRIVATE · AGENT-RUN</text>
    </svg>
  );
}
