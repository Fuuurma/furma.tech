"use client";

// GuideTours — Linear-style: split map view + booking feed
// Dark (#08090a), thin white borders, monospace labels
export function GuideToursHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Map panel */}
      <rect x="20" y="20" width="300" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="300" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="300" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="170" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">gps — barcelona old town</text>

      {/* Map grid */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`h${i}`} x1="20" y1={80 + i * 38} x2="320" y2={80 + i * 38} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`v${i}`} x1={62 + i * 50} y1="52" x2={62 + i * 50} y2="320" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      ))}

      {/* Route path */}
      <path
        d="M 80 100 Q 100 140 140 160 Q 180 180 200 220 Q 220 250 260 270"
        fill="none"
        stroke="rgba(113,112,255,0.4)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 80 100 Q 100 140 140 160 Q 180 180 200 220 Q 220 250 260 270"
        fill="none"
        stroke="rgba(113,112,255,0.15)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Route waypoints */}
      {[
        { cx: 80, cy: 100, label: "Start", type: "start" },
        { cx: 140, cy: 160, label: "P1", type: "stop" },
        { cx: 200, cy: 220, label: "P2", type: "stop" },
        { cx: 260, cy: 270, label: "End", type: "end" },
      ].map((wp) => (
        <g key={wp.label}>
          <circle cx={wp.cx} cy={wp.cy} r={wp.type === "start" ? 8 : 5}
            fill={wp.type === "start" ? "rgba(113,112,255,0.3)" : "rgba(255,255,255,0.05)"}
            stroke={wp.type === "start" ? "rgba(113,112,255,0.7)" : "rgba(255,255,255,0.2)"}
            strokeWidth="1.5" />
          <text x={wp.cx} y={wp.cy + 1} fontSize="4.5" fill="rgba(255,255,255,0.6)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">{wp.label}</text>
        </g>
      ))}

      {/* POI markers */}
      {[
        { cx: 170, cy: 130, icon: "▲", name: "La Sagrada Familia" },
        { cx: 230, cy: 180, icon: "◉", name: "Gothic Quarter" },
        { cx: 120, cy: 240, icon: "★", name: "La Boqueria" },
      ].map((poi) => (
        <g key={poi.name}>
          <circle cx={poi.cx} cy={poi.cy} r="10" fill="rgba(255,185,62,0.08)" stroke="rgba(255,185,62,0.25)" strokeWidth="0.75" />
          <text x={poi.cx} y={poi.cy + 3} fontSize="6" fill="rgba(255,185,62,0.7)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">{poi.icon}</text>
        </g>
      ))}

      {/* GPS indicator */}
      <circle cx="160" cy="188" r="12" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.75" className="animate-pulse" />
      <circle cx="160" cy="188" r="5" fill="rgba(16,185,129,0.5)" />
      <circle cx="160" cy="188" r="2" fill="rgba(16,185,129,0.9)" />

      {/* Bottom stats on map */}
      <rect x="32" y="292" width="276" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <text x="48" y="305" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">ETA 14:32</text>
      <text x="120" y="305" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">·</text>
      <text x="136" y="305" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">2.4 km walked</text>
      <text x="230" y="305" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">·</text>
      <text x="246" y="305" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">ES +2</text>

      {/* Booking feed */}
      <rect x="336" y="20" width="164" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="336" y="20" width="164" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="336" y="44" width="164" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="418" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">bookings</text>

      {/* Booking entries */}
      {[
        { id: "#8841", guide: "Maria S.", tour: "Gothic Quarter", time: "14:00", lang: "EN", status: "confirmed" },
        { id: "#8842", guide: "Jordi P.", tour: " Gaudí Tour", time: "15:30", lang: "DE", status: "pending" },
        { id: "#8843", guide: "Anna L.", tour: "Food Market", time: "16:00", lang: "FR", status: "confirmed" },
        { id: "#8844", guide: "Pol R.", tour: "Old Town", time: "17:00", lang: "EN", status: "confirmed" },
      ].map((b, i) => (
        <g key={b.id} transform={`translate(344, ${i * 64 + 60})`}>
          <rect x="0" y="0" width="148" height="56" rx="4"
            fill="rgba(255,255,255,0.02)"
            stroke={b.status === "pending" ? "rgba(255,185,62,0.15)" : "rgba(255,255,255,0.05)"}
            strokeWidth="0.5" />
          <text x="8" y="14" fontSize="6.5" fill="rgba(255,255,255,0.45)" fontFamily="JetBrains Mono, monospace">{b.id}</text>
          <text x="44" y="14" fontSize="6.5" fill="rgba(255,255,255,0.65)" fontFamily="JetBrains Mono, monospace" fontWeight="600">{b.guide}</text>
          <text x="8" y="28" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">{b.tour}</text>
          <text x="8" y="42" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">{b.time} · {b.lang}</text>
          <rect x="104" y="32" width="36" height="16" rx="8"
            fill={b.status === "confirmed" ? "rgba(16,185,129,0.12)" : "rgba(255,185,62,0.1)"}
            stroke={b.status === "confirmed" ? "rgba(16,185,129,0.25)" : "rgba(255,185,62,0.2)"}
            strokeWidth="0.5" />
          <text x="122" y="43" fontSize="5.5" fill={b.status === "confirmed" ? "rgba(16,185,129,0.8)" : "rgba(255,185,62,0.7)"} fontFamily="JetBrains Mono, monospace" textAnchor="middle">{b.status}</text>
        </g>
      ))}

      {/* Viator sync badge */}
      <rect x="344" y="296" width="140" height="18" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <text x="360" y="308" fontSize="5.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">viator · getyourguide</text>
      <circle cx="470" cy="305" r="4" fill="#10b981" fillOpacity="0.5" />
    </svg>
  );
}
