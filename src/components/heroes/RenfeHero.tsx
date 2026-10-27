"use client";

// Renfe — a departure board with measured delay bars
export function RenfeHero({ className = "" }: { className?: string }) {
  const trains = [
    { time: "08:12", route: "Barcelona · Tarragona", delay: 4 },
    { time: "08:26", route: "Sants · Girona", delay: 0 },
    { time: "08:41", route: "Barcelona · Tarragona", delay: 17 },
    { time: "09:03", route: "Girona · Barcelona", delay: 0 },
    { time: "09:18", route: "Barcelona · Reus", delay: 31 },
  ];
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />
      <text x="40" y="44" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">DEPARTURES · MEASURED TODAY</text>
      {trains.map((train, i) => (
        <g key={train.time} transform={`translate(40 ${62 + i * 48})`}>
          <text x="0" y="14" fontSize="12" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace">{train.time}</text>
          <rect x="72" y="4" width={version(train.route)} height="10" rx="2" fill="rgba(255,255,255,0.08)" />
          <rect x="330" y="4" width={Math.min(120, train.delay * 3.2)} height="10" rx="2" fill={train.delay === 0 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.42)"} />
          <text x="460" y="14" fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace" textAnchor="end">
            {train.delay === 0 ? "on time" : `+${train.delay}m`}
          </text>
          <line x1="0" y1="26" x2="440" y2="26" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </g>
      ))}
      <text x="40" y="326" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">SOURCE: RENFE OPEN DATA · ADIF</text>
    </svg>
  );
}

// A deterministic stand-in for the route name's width, so the drawing is stable.
function version(route: string) {
  return Math.min(230, 8 + route.length * 6.4);
}
