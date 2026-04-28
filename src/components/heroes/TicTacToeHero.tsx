"use client";

// Tic-Tac-Toe Disappear — Linear-style: game board + state panels
export function TicTacToeHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />

      {/* Board panel */}
      <rect x="20" y="20" width="280" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="20" y="20" width="280" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="280" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="160" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">tic-tac-toe — disappear</text>

      {/* Board */}
      {/* Grid lines */}
      <line x1="113" y1="60" x2="113" y2="280" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <line x1="207" y1="60" x2="207" y2="280" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <line x1="40" y1="133" x2="280" y2="133" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <line x1="40" y1="207" x2="280" y2="207" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* X marks */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round">
        {/* X at top-left */}
        <line x1="56" y1="72" x2="96" y2="108" />
        <line x1="96" y1="72" x2="56" y2="108" />
        {/* X at center-right (fading) */}
        <line x1="220" y1="145" x2="285" y2="195" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" className="animate-pulse" />
        <line x1="285" y1="145" x2="220" y2="195" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" className="animate-pulse" />
      </g>

      {/* O marks */}
      <g fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5">
        {/* O at top-right */}
        <circle cx="253" cy="96" r="22" />
        {/* O at bottom-left */}
        <circle cx="76" cy="232" r="22" />
        {/* O at center (vanished/fading) */}
        <circle cx="160" cy="170" r="22" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" className="animate-pulse" />
      </g>

      {/* Vanish countdown rings */}
      <circle cx="160" cy="170" r="30" fill="none" stroke="rgba(113,112,255,0.15)" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="253" cy="96" r="30" fill="none" stroke="rgba(113,112,255,0.1)" strokeWidth="1" strokeDasharray="2 4" />

      {/* Bottom panel — game state */}
      <rect x="20" y="290" width="280" height="30" rx="0 0 8 8" fill="rgba(255,255,255,0.02)" />
      <rect x="20" y="290" width="280" height="1" fill="rgba(255,255,255,0.04)" />

      <text x="40" y="307" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">TURN</text>
      <text x="76" y="307" fontSize="7" fill="rgba(255,255,255,0.7)" fontFamily="JetBrains Mono, monospace" fontWeight="600">O</text>

      <text x="130" y="307" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">VANISH</text>
      <text x="176" y="307" fontSize="7" fill="rgba(113,112,255,0.8)" fontFamily="JetBrains Mono, monospace" fontWeight="600">3 → 0</text>

      <text x="230" y="307" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace">MODE</text>
      <text x="262" y="307" fontSize="7" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace">online</text>

      {/* Match info panel */}
      <rect x="316" y="20" width="184" height="160" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="20" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="44" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">match #2847</text>

      {/* Player rows */}
      {[
        { label: "You", symbol: "O", score: "3", status: "active" },
        { label: "Opponent", symbol: "X", score: "2", status: "idle" },
      ].map((p, i) => (
        <g key={p.label} transform={`translate(324, ${i * 44 + 60})`}>
          <rect x="0" y="0" width="168" height="36" rx="4"
            fill={p.status === "active" ? "rgba(113,112,255,0.06)" : "rgba(255,255,255,0.02)"}
            stroke={p.status === "active" ? "rgba(113,112,255,0.15)" : "rgba(255,255,255,0.05)"}
            strokeWidth="0.5" />
          <text x="12" y="16" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">{p.label}</text>
          <text x="12" y="29" fontSize="11" fill={p.status === "active" ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)"} fontFamily="JetBrains Mono, monospace" fontWeight="600">{p.symbol}</text>
          <text x="140" y="22" fontSize="7" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" textAnchor="end">score</text>
          <text x="156" y="24" fontSize="14" fill={p.status === "active" ? "rgba(113,112,255,0.9)" : "rgba(255,255,255,0.4)"} fontFamily="JetBrains Mono, monospace" fontWeight="700" textAnchor="end">{p.score}</text>
        </g>
      ))}

      {/* Rules panel */}
      <rect x="316" y="196" width="184" height="124" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="316" y="196" width="184" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="316" y="220" width="184" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="408" y="216" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">vanish rules</text>

      {[
        { rule: "Piece removed after each turn", icon: "→" },
        { rule: "3 vanish tokens per game", icon: "◆" },
        { rule: "Last piece wins", icon: "★" },
      ].map((r, i) => (
        <g key={r.rule} transform={`translate(324, ${i * 28 + 234})`}>
          <text x="0" y="0" fontSize="5.5" fill="rgba(113,112,255,0.5)" fontFamily="JetBrains Mono, monospace">{r.icon}</text>
          <text x="12" y="0" fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace">{r.rule}</text>
        </g>
      ))}
    </svg>
  );
}
