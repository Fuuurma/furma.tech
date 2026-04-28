"use client";

// QArt — Linear-style: QR code preview + generation panel
export function QArtHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* QR preview panel */}
      <rect x="20" y="20" width="260" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="260" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="260" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="150" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">preview</text>

      {/* QR code — stylized grid */}
      {/* Outer frame */}
      <rect x="70" y="70" width="160" height="160" rx="6" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Position patterns — top-left */}
      <rect x="78" y="78" width="40" height="40" rx="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <rect x="86" y="86" width="24" height="24" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="92" y="92" width="12" height="12" rx="1" fill="rgba(255,255,255,0.25)" />

      {/* Position patterns — top-right */}
      <rect x="142" y="78" width="40" height="40" rx="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <rect x="150" y="86" width="24" height="24" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="156" y="92" width="12" height="12" rx="1" fill="rgba(255,255,255,0.25)" />

      {/* Position patterns — bottom-left */}
      <rect x="78" y="182" width="40" height="40" rx="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <rect x="86" y="190" width="24" height="24" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="92" y="196" width="12" height="12" rx="1" fill="rgba(255,255,255,0.25)" />

      {/* Data modules — 6x6 center grid */}
      {[
        [1,0,1,0,1,1],
        [0,1,0,1,0,0],
        [1,0,1,1,0,1],
        [0,1,1,0,1,0],
        [1,0,0,1,1,0],
        [0,1,1,0,0,1],
      ].map((row, ri) =>
        row.map((cell, ci) =>
          cell === 1 ? (
            <rect
              key={`${ri}-${ci}`}
              x={130 + ci * 11}
              y={90 + ri * 11}
              width="9"
              height="9"
              rx="1"
              fill="rgba(255,255,255,0.25)"
            />
          ) : null
        )
      )}

      {/* Alignment pattern — center bottom-right */}
      <rect x="175" y="175" width="20" height="20" rx="2" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="179" y="179" width="12" height="12" rx="1" fill="rgba(255,255,255,0.1)" />
      <rect x="182" y="182" width="6" height="6" rx="0.5" fill="rgba(255,255,255,0.2)" />

      {/* Scan line */}
      <line x1="70" y1="150" x2="230" y2="150" stroke="rgba(113,112,255,0.4)" strokeWidth="1" strokeDasharray="3 3" className="animate-[scan_2.5s_ease-in-out_infinite]" />
      <style>{`
        @keyframes scan { 0%,100%{transform:translateY(-40px)} 50%{transform:translateY(40px)} }
      `}</style>

      {/* Result badge */}
      <rect x="98" y="248" width="104" height="24" rx="12" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.25)" strokeWidth="0.75" />
      <text x="150" y="263" fontSize="6.5" fill="rgba(16,185,129,0.9)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">100% scannable</text>

      {/* Generation panel */}
      <rect x="296" y="20" width="204" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="296" y="20" width="204" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="296" y="44" width="204" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="398" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">qart — generate</text>

      {/* URL input */}
      <text x="308" y="72" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">URL</text>
      <rect x="308" y="78" width="180" height="26" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
      <text x="316" y="95" fontSize="6.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">https://furma.tech</text>

      {/* Style selector */}
      <text x="308" y="124" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">STYLE</text>
      <rect x="308" y="130" width="180" height="26" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
      <rect x="316" y="136" width="52" height="14" rx="2" fill="rgba(113,112,255,0.15)" stroke="rgba(113,112,255,0.3)" strokeWidth="0.5" />
      <text x="342" y="146" fontSize="6" fill="rgba(113,112,255,0.8)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">geometric</text>
      {["minimal", "organic", "mosaic"].map((s, i) => (
        <text key={s} x={378 + i * 32} y="146" fontSize="5.5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">{s}</text>
      ))}

      {/* Color */}
      <text x="308" y="176" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">COLOR</text>
      {["#08090a", "#1a1a2e", "#0f3460", "#533483"].map((c, i) => (
        <rect key={c} x={308 + i * 44} y="182" width="36" height="20" rx="3"
          fill={c}
          stroke={i === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}
          strokeWidth="0.75"
        />
      ))}
      <rect x="308" y="182" width="36" height="20" rx="3" fill="none" stroke="rgba(113,112,255,0.6)" strokeWidth="1.5" />

      {/* Logo type */}
      <text x="308" y="226" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">LOGO</text>
      <rect x="308" y="232" width="180" height="26" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
      <text x="316" y="249" fontSize="6.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">furma · text only</text>

      {/* Generate button */}
      <rect x="308" y="276" width="180" height="32" rx="6" fill="rgba(113,112,255,0.2)" stroke="rgba(113,112,255,0.35)" strokeWidth="0.75" />
      <text x="398" y="296" fontSize="7.5" fill="rgba(113,112,255,0.9)" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">generate</text>
    </svg>
  );
}
