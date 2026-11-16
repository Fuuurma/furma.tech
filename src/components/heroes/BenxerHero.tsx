"use client";

// Benxer — one benchmark cohort: profiles plotted against each other
export function BenxerHero({ className = "" }: { className?: string }) {
  const dots = [
    { x: 96, y: 92 }, { x: 148, y: 130 }, { x: 178, y: 76 }, { x: 214, y: 152 },
    { x: 246, y: 104 }, { x: 282, y: 168 }, { x: 318, y: 88 }, { x: 356, y: 138 },
  ];
  const rows = [
    { name: "MODEL-A / HIGH", score: "87.2", ci: "±1.4" },
    { name: "MODEL-B / MED", score: "84.6", ci: "±2.1" },
    { name: "MODEL-C / LOW", score: "81.9", ci: "±1.8" },
    { name: "MODEL-D / MAX", score: "79.4", ci: "±3.0" },
  ];
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />
      <text x="40" y="44" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">COHORT · SWE-BENCH · Q3 SNAPSHOT</text>
      <rect x="40" y="62" width="300" height="176" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="40" y1={62 + (i + 1) * 35.2} x2="340" y2={62 + (i + 1) * 35.2} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      <rect x="52" y="118" width="276" height="58" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="4 3" />
      <text x="60" y="110" fontSize="6" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8">95% INTERVAL OVERLAP — NO RANK CLAIM</text>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={i === 2 ? 4 : 2.5} fill={i === 2 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)"} />
      ))}
      <text x="40" y="256" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">SCORE →</text>
      <text x="40" y="322" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">EFFORT × SCORE · ONE PUBLICATION AT A TIME</text>
      <text x="356" y="64" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">PROFILES</text>
      <rect x="356" y="74" width="124" height="164" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {rows.map((row, i) => (
        <g key={row.name} transform={`translate(364 ${86 + i * 36})`}>
          <text x="0" y="6" fontSize="5.5" fill="rgba(255,255,255,0.6)" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">{row.name}</text>
          <rect x="0" y="14" width="108" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
          <rect x="0" y="14" width={86 - i * 8} height="4" rx="2" fill="rgba(255,255,255,0.4)" />
          <text x="112" y="6" fontSize="6" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace" textAnchor="end">{row.score}</text>
        </g>
      ))}
      <text x="480" y="322" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" textAnchor="end">LOCAL-FIRST · SOURCES SHOWN</text>
    </svg>
  );
}
