"use client";

// FinanceHub — Linear-style: portfolio dashboard
export function FinanceHubHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Main chart */}
      <rect x="20" y="20" width="320" height="200" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="320" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="320" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="180" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">portfolio — 24h</text>

      {/* Chart grid */}
      {[0,1,2,3,4].map(i => (
        <line key={`h${i}`} x1="40" y1={70+i*28} x2="320" y2={70+i*28} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      ))}

      {/* Area fill */}
      <path d="M 40 196 L 40 160 Q 80 140 120 120 T 180 90 T 240 110 T 300 70 L 300 196 Z"
        fill="rgba(113,112,255,0.06)" />

      {/* Chart line */}
      <path d="M 40 160 Q 80 140 120 120 T 180 90 T 240 110 T 300 70"
        fill="none" stroke="rgba(113,112,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Data points */}
      {[[40,160],[120,120],[180,90],[240,110],[300,70]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#08090a" stroke="rgba(113,112,255,0.6)" strokeWidth="1.5" />
      ))}

      {/* Tip indicator */}
      <circle cx="300" cy="70" r="6" fill="rgba(113,112,255,0.15)" />
      <circle cx="300" cy="70" r="3" fill="rgba(113,112,255,0.8)" className="animate-pulse" />

      {/* Y labels */}
      {([["+20%", 70],["+10%", 126],["0%", 182]] as Array<[string, number]>).map(([t,y]) => (
        <text key={t} x="32" y={y+3} fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="end">{t}</text>
      ))}

      {/* Holdings panel */}
      <rect x="356" y="20" width="144" height="200" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="356" y="20" width="144" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="356" y="44" width="144" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="428" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">holdings</text>

      {/* Asset rows */}
      {[
        { symbol: "BTC", name: "Bitcoin", price: "$67,420", change: "+2.1%", up: true },
        { symbol: "AAPL", name: "Apple", price: "$189.30", change: "+0.4%", up: true },
        { symbol: "TSLA", name: "Tesla", price: "$174.80", change: "-1.2%", up: false },
        { symbol: "NVDA", name: "NVIDIA", price: "$875.20", change: "+4.8%", up: true },
      ].map((row, i) => (
        <g key={row.symbol} transform={`translate(364, ${i * 42 + 60})`}>
          <rect x="0" y="0" width="128" height="34" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="8" y="14" fontSize="7.5" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontWeight="600">{row.symbol}</text>
          <text x="8" y="26" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">{row.name}</text>
          <text x="120" y="14" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace" textAnchor="end">{row.price}</text>
          <text x="120" y="26" fontSize="6" fill={row.up ? "rgba(16,185,129,0.8)" : "rgba(239,68,68,0.8)"} fontFamily="JetBrains Mono, monospace" textAnchor="end">{row.change}</text>
        </g>
      ))}

      {/* Bottom stats */}
      <rect x="20" y="236" width="480" height="84" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="236" width="480" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="260" width="480" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="260" y="256" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">portfolio summary</text>

      {[
        { label: "Total Value", val: "€24,891", sub: "+12.4% today" },
        { label: "Best", val: "NVDA +4.8%", sub: "+$2,140" },
        { label: "Worst", val: "TSLA -1.2%", sub: "-$84" },
        { label: "Alerts", val: "3 active", sub: "2 price · 1 news" },
      ].map((stat, i) => (
        <g key={stat.label} transform={`translate(${20 + i * 120}, 268)`}>
          <text x="0" y="0" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">{stat.label}</text>
          <text x="0" y="16" fontSize="11" fill="rgba(255,255,255,0.75)" fontFamily="JetBrains Mono, monospace" fontWeight="600">{stat.val}</text>
          <text x="0" y="28" fontSize="5.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">{stat.sub}</text>
        </g>
      ))}
    </svg>
  );
}
