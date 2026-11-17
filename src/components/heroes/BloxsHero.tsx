"use client";

// Bloxs — a grid of component tiles, each with its provenance line
export function BloxsHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />
      <text x="40" y="44" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">CATALOGUE</text>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 40 + (i % 3) * 152;
        const y = 62 + Math.floor(i / 3) * 112;
        return (
          <g key={i}>
            <rect x={x} y={y} width="136" height="96" rx="4" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x={x + 12} y={y + 12} width="60" height="8" rx="4" fill="rgba(255,255,255,0.16)" />
            <rect x={x + 12} y={y + 28} width="96" height="6" rx="3" fill="rgba(255,255,255,0.07)" />
            <rect x={x + 12} y={y + 40} width="80" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x={x + 12} y={y + 62} width="34" height="18" rx="3" fill="rgba(255,255,255,0.1)" />
            <text x={x + 12} y={y + 88} fontSize="6" fill="rgba(255,255,255,0.28)" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8">studied · rebuilt</text>
          </g>
        );
      })}
      <text x="40" y="326" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">EVERY PIECE NAMES ITS SOURCE</text>
    </svg>
  );
}
