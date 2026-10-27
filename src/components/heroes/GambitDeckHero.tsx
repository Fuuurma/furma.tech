"use client";

// Gambit Deck — a chessboard with cards laid over it
export function GambitDeckHero({ className = "" }: { className?: string }) {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 4; col++) {
      const dark = (row + col) % 2 === 0;
      squares.push(
        <rect
          key={`${row}-${col}`}
          x={40 + col * 34}
          y={38 + row * 34}
          width="34"
          height="34"
          fill={dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.015)"}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />
      {squares}
      <rect x="38" y="36" width="140" height="276" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {/* two cards laid on the board */}
      <g transform="translate(224 96) rotate(-7)">
        <rect width="118" height="164" rx="6" fill="#0d0e10" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <text x="12" y="26" fontSize="7" fill="rgba(255,255,255,0.45)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">GAMBIT</text>
        <path d="M22 96h18l10 26 10-26h18l-22 46h-12z" fill="rgba(255,255,255,0.14)" />
        <text x="12" y="150" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">knight · 1 turn</text>
      </g>
      <g transform="translate(330 74) rotate(6)">
        <rect width="118" height="164" rx="6" fill="#0d0e10" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        <text x="12" y="26" fontSize="7" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">DECK</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="12" y={44 + i * 26} width="94" height="18" rx="3" fill="rgba(255,255,255,0.05)" />
        ))}
      </g>
      <text x="40" y="330" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">CHESS × CARDS</text>
    </svg>
  );
}
