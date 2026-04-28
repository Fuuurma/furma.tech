"use client";

// PicksTracker — Linear-style: leaderboard + prediction panel
export function PicksTrackerHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Leaderboard panel */}
      <rect x="20" y="20" width="280" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="280" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="280" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="160" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">leaderboard — NBA</text>

      {/* Column headers */}
      <rect x="20" y="52" width="280" height="20" fill="rgba(255,255,255,0.02)" />
      {[["#", 36],["User", 70],["WR", 180],["Picks", 224],["+/-", 268]].map(([h,x]) => (
        <text key={String(h)} x={x} y="65" fontSize="5.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">{String(h)}</text>
      ))}

      {/* Rank rows */}
      {[
        { rank: "1", user: "marcos_k", wr: "89%", picks: "142", delta: "+12", highlight: true },
        { rank: "2", user: "crypto_whale", wr: "84%", picks: "98", delta: "+8", highlight: false },
        { rank: "3", user: "sporty_mike", wr: "81%", picks: "211", delta: "+3", highlight: false },
        { rank: "4", user: "bet_master", wr: "78%", picks: "89", delta: "-2", highlight: false },
        { rank: "5", user: "hoops_pro", wr: "74%", picks: "163", delta: "+1", highlight: false },
      ].map((row, i) => (
        <g key={row.user} transform={`translate(20, ${72 + i * 42})`}>
          <rect x="0" y="0" width="280" height="36" rx="0"
            fill={row.highlight ? "rgba(113,112,255,0.06)" : "rgba(255,255,255,0.01)"}
            stroke={row.highlight ? "rgba(113,112,255,0.12)" : "rgba(255,255,255,0.03)"}
            strokeWidth="0.5" />
          <rect x="28" y="8" width="20" height="20" rx="10"
            fill={row.highlight ? "rgba(113,112,255,0.2)" : "rgba(255,255,255,0.04)"}
            stroke={row.highlight ? "rgba(113,112,255,0.4)" : "rgba(255,255,255,0.08)"}
            strokeWidth="0.75" />
          <text x="38" y="22" fontSize="7" fill={row.highlight ? "rgba(113,112,255,0.9)" : "rgba(255,255,255,0.3)"} fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">{row.rank}</text>
          <text x="64" y="17" fontSize="7.5" fill={row.highlight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)"} fontFamily="JetBrains Mono, monospace" fontWeight="600">{row.user}</text>
          <text x="64" y="28" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">{row.wr} win rate</text>
          <text x="214" y="22" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace" textAnchor="end">{row.picks}</text>
          <text x="268" y="22" fontSize="7" fill={row.delta.startsWith("+") ? "rgba(16,185,129,0.7)" : "rgba(239,68,68,0.7)"} fontFamily="JetBrains Mono, monospace" textAnchor="end">{row.delta}</text>
        </g>
      ))}

      {/* Prediction input panel */}
      <rect x="316" y="20" width="184" height="160" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="20" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="44" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">new pick</text>

      {/* Market selector */}
      <text x="328" y="70" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">MARKET</text>
      <rect x="328" y="76" width="160" height="28" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
      <text x="336" y="93" fontSize="6.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">Select market...</text>

      {/* Odds */}
      <text x="328" y="124" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">ODDS</text>
      <rect x="328" y="130" width="72" height="28" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
      <text x="336" y="148" fontSize="7.5" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace">+140</text>

      {/* Submit */}
      <rect x="408" y="130" width="80" height="28" rx="6" fill="rgba(113,112,255,0.15)" stroke="rgba(113,112,255,0.3)" strokeWidth="0.75" />
      <text x="448" y="148" fontSize="7" fill="rgba(113,112,255,0.9)" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">submit</text>

      {/* Your picks mini */}
      <rect x="316" y="196" width="184" height="124" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="196" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="220" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="216" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">your record</text>

      {/* Win/loss bars */}
      <rect x="328" y="236" width="160" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
      <rect x="328" y="236" width={Math.round(160 * 0.76)} height="8" rx="4" fill="rgba(113,112,255,0.5)" />
      <text x="328" y="256" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">W  L  W  W  W  W  L</text>

      <text x="328" y="276" fontSize="12" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontWeight="700">76%</text>
      <text x="370" y="276" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">win rate · 19 picks</text>
    </svg>
  );
}
