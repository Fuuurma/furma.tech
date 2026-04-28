"use client";

// OneToMany — Linear-style: goals, habits, community validation
export function OneToManyHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Mission card */}
      <rect x="20" y="20" width="300" height="200" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="300" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="300" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="170" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">active mission</text>

      {/* Mission info */}
      <text x="36" y="72" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">MISSION</text>
      <text x="36" y="94" fontSize="11" fill="rgba(255,255,255,0.75)" fontFamily="JetBrains Mono, monospace" fontWeight="600">Run 500km in 30 days</text>

      {/* Progress */}
      <text x="36" y="122" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">PROGRESS</text>
      <rect x="36" y="128" width="268" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
      <rect x="36" y="128" width={Math.round(268 * 326 / 500)} height="6" rx="3" fill="rgba(113,112,255,0.5)" />
      <text x="36" y="150" fontSize="6.5" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace">326 / 500 km · 22 days left</text>

      {/* Evidence */}
      <text x="36" y="172" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">EVIDENCE</text>
      {[1,2,3,4,5,6,7].map(i => (
        <rect key={i}
          x={36 + (i-1) * 34}
          y="180"
          width="28"
          height="28"
          rx="3"
          fill={i <= 5 ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.03)"}
          stroke={i <= 5 ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.06)"}
          strokeWidth="0.5"
        />
      ))}
      {[1,2,3,4,5].map(i => (
        <text key={`c${i}`} x={36 + (i-1) * 34 + 14} y={180 + 18} fontSize="8" fill="rgba(16,185,129,0.7)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">✓</text>
      ))}

      {/* Streaks sidebar */}
      <rect x="336" y="20" width="164" height="130" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="336" y="20" width="164" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="336" y="44" width="164" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="418" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">streaks</text>

      {[
        { habit: "Morning run", streak: "22d" },
        { habit: "Read 30min", streak: "15d" },
      ].map((h, i) => (
        <g key={h.habit} transform={`translate(344, ${i * 52 + 62})`}>
          <rect x="0" y="0" width="148" height="42" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="10" y="16" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">{h.habit}</text>
          <text x="10" y="34" fontSize="14" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontWeight="700">{h.streak}</text>
          <circle cx="132" cy="26" r="8" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.75" />
          <text x="132" y="29" fontSize="6" fill="rgba(16,185,129,0.7)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">🔥</text>
        </g>
      ))}

      {/* Community panel */}
      <rect x="20" y="236" width="480" height="84" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="236" width="480" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="260" width="480" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="260" y="256" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">community validation</text>

      {[
        { label: "Validators", val: "47" },
        { label: "Votes cast", val: "124" },
        { label: "Your rank", val: "#3" },
        { label: "Community", val: "156 members" },
      ].map((stat, i) => (
        <g key={stat.label} transform={`translate(${20 + i * 120}, 268)}`}>
          <text x="0" y="0" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">{stat.label}</text>
          <text x="0" y="18" fontSize="13" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontWeight="700">{stat.val}</text>
        </g>
      ))}

      {/* All goals overview */}
      <rect x="336" y="166" width="164" height="154" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="336" y="166" width="164" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="336" y="190" width="164" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="418" y="186" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">all goals</text>

      {[
        { name: "Run 500km", status: "in_progress", pct: 65 },
        { name: "Read 20 books", status: "completed", pct: 100 },
        { name: "Learn Spanish", status: "paused", pct: 40 },
        { name: "Meditate 100d", status: "in_progress", pct: 72 },
      ].map((g, i) => (
        <g key={g.name} transform={`translate(344, ${i * 32 + 206})`}>
          <text x="0" y="0" fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace">{g.name}</text>
          <rect x="0" y="6" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
          <rect x="0" y="6" width={g.pct} height="3" rx="1.5"
            fill={g.status === "completed" ? "rgba(16,185,129,0.5)" : g.status === "paused" ? "rgba(255,255,255,0.15)" : "rgba(113,112,255,0.5)"}
          />
          <text x="140" y="0" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="end">{g.pct}%</text>
        </g>
      ))}
    </svg>
  );
}
