"use client";

// restauManager — Linear-style: table floor plan + KDS panel
// Dark (#08090a), thin white borders, monospace labels
export function RestauManagerHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Floor plan panel */}
      <rect x="20" y="20" width="280" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="280" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="280" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="160" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">floor — main dining</text>

      {/* Floor outline */}
      <rect x="48" y="80" width="224" height="200" rx="2" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" strokeDasharray="4 4" />

      {/* Tables */}
      {[
        { x: 60, y: 90, w: 40, h: 40, label: "T1", seats: 4, status: "reserved" },
        { x: 115, y: 90, w: 50, h: 40, label: "T2", seats: 6, status: "occupied" },
        { x: 180, y: 90, w: 40, h: 40, label: "T3", seats: 4, status: "available" },
        { x: 235, y: 90, w: 28, h: 28, label: "B1", seats: 2, status: "available" },
        { x: 60, y: 148, w: 28, h: 28, label: "B2", seats: 2, status: "occupied" },
        { x: 102, y: 148, w: 60, h: 40, label: "T4", seats: 8, status: "reserved" },
        { x: 180, y: 150, w: 40, h: 36, label: "T5", seats: 4, status: "occupied" },
        { x: 235, y: 148, w: 28, h: 28, label: "B3", seats: 2, status: "available" },
        { x: 60, y: 210, w: 40, h: 40, label: "T6", seats: 4, status: "available" },
        { x: 115, y: 210, w: 50, h: 40, label: "T7", seats: 6, status: "reserved" },
        { x: 180, y: 210, w: 40, h: 40, label: "T8", seats: 4, status: "occupied" },
        { x: 235, y: 212, w: 28, h: 26, label: "B4", seats: 2, status: "available" },
      ].map((t) => {
        const colors = {
          available: { fill: "rgba(255,255,255,0.03)", stroke: "rgba(255,255,255,0.12)", text: "rgba(255,255,255,0.45)" },
          occupied: { fill: "rgba(113,112,255,0.08)", stroke: "rgba(113,112,255,0.25)", text: "rgba(113,112,255,0.75)" },
          reserved: { fill: "rgba(255,185,62,0.07)", stroke: "rgba(255,185,62,0.25)", text: "rgba(255,185,62,0.7)" },
        }[t.status]!;
        return (
          <g key={t.label}>
            <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="4"
              fill={colors.fill} stroke={colors.stroke} strokeWidth="1" />
            <text x={t.x + t.w / 2} y={t.y + t.h / 2 - 2}
              fontSize="6" fill={colors.text} fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">{t.label}</text>
            <text x={t.x + t.w / 2} y={t.y + t.h / 2 + 7}
              fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">{t.seats}p</text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(60, 278)">
        {[{ label: "Available", color: "rgba(255,255,255,0.2)" }, { label: "Occupied", color: "rgba(113,112,255,0.75)" }, { label: "Reserved", color: "rgba(255,185,62,0.7)" }].map((item, i) => (
          <g key={item.label} transform={`translate(${i * 90}, 0)`}>
            <circle cx="6" cy="6" r="4" fill="none" stroke={item.color} strokeWidth="1" />
            <text x="16" y="9" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">{item.label}</text>
          </g>
        ))}
      </g>

      {/* KDS panel */}
      <rect x="316" y="20" width="184" height="170" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="20" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="44" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">KDS</text>

      {/* Order tickets */}
      {[
        { id: "#042", time: "2m", items: "Burger · Fries · Coke", priority: "normal" },
        { id: "#043", time: "5m", items: "Steak medium · Salad", priority: "urgent" },
        { id: "#044", time: "1m", items: "Pasta · Garlic bread", priority: "normal" },
      ].map((ticket, i) => (
        <g key={ticket.id} transform={`translate(324, ${i * 48 + 58})`}>
          <rect x="0" y="0" width="168" height="42" rx="4"
            fill="rgba(255,255,255,0.03)"
            stroke={ticket.priority === "urgent" ? "rgba(255,100,100,0.25)" : "rgba(255,255,255,0.06)"}
            strokeWidth="0.75" />
          <text x="8" y="13" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace" fontWeight="600">{ticket.id}</text>
          <text x="44" y="13" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">{ticket.items}</text>
          <text x="152" y="13" fontSize="5.5" fill={ticket.priority === "urgent" ? "rgba(255,100,100,0.7)" : "rgba(255,255,255,0.2)"} fontFamily="JetBrains Mono, monospace" textAnchor="end">{ticket.time}</text>
          <rect x="0" y="30" width={ticket.priority === "urgent" ? "168" : "60"} height="8" rx="1"
            fill={ticket.priority === "urgent" ? "rgba(255,100,100,0.12)" : "rgba(255,255,255,0.05)"} />
          <text x="4" y="37" fontSize="5" fill={ticket.priority === "urgent" ? "rgba(255,100,100,0.5)" : "rgba(255,255,255,0.2)"} fontFamily="JetBrains Mono, monospace">in progress</text>
        </g>
      ))}

      {/* Stats */}
      <rect x="316" y="206" width="184" height="114" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="206" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="230" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="226" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">live stats</text>

      {[
        { label: "Covers tonight", val: "84 / 120", pct: 70 },
        { label: "Avg turn time", val: "62 min", pct: null },
        { label: "Revenue", val: "€3,241", pct: null },
      ].map((stat, i) => (
        <g key={stat.label} transform={`translate(324, ${i * 32 + 244})`}>
          <text x="0" y="0" fontSize="5.5" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">{stat.label}</text>
          <text x="0" y="14" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontWeight="600">{stat.val}</text>
          {stat.pct !== null && (
            <rect x="100" y="4" width="72" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
          )}
          {stat.pct !== null && (
            <rect x="100" y="4" width={72 * stat.pct / 100} height="4" rx="2" fill="rgba(113,112,255,0.5)" />
          )}
        </g>
      ))}

      {/* TheFork badge */}
      <rect x="316" y="294" width="80" height="22" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
      <text x="356" y="308" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">thefork sync</text>
      <circle cx="384" cy="305" r="5" fill="#10b981" fillOpacity="0.6" className="animate-pulse" />
    </svg>
  );
}
