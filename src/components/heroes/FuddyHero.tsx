"use client";

// FUDDY — the week at a glance: meals in the grid, the list on the right
export function FuddyHero({ className = "" }: { className?: string }) {
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const meals = [
    ["TOMATO SOUP", "PAELLA"],
    ["SALMOREJO", "GRILLED FISH"],
    ["LENTILS", "ROAST CHICKEN"],
    ["COLD SOUP", "PAELLA"],
    ["TOSTADA", "TAPAS"],
    ["BRUNCH", "SLOW ROAST"],
    ["FIDEUA", "—"],
  ];
  const list = ["tomatoes", "rice 1kg", "saffron", "stock", "lemons"];
  return (
    <svg viewBox="0 0 520 340" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="520" height="340" fill="#08090a" />
      <text x="40" y="44" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">THIS WEEK · 4 AT THE TABLE</text>
      {days.map((day, i) => {
        const x = 40 + i * 56;
        return (
          <g key={day}>
            <text x={x} y="64" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">{day}</text>
            <rect x={x} y="74" width="48" height="150" rx="4" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
            {meals[i].map((meal, j) => (
              <g key={meal} transform={`translate(${x + 6} ${88 + j * 62})`}>
                <rect width="36" height="52" rx="3" fill={j === 0 ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)"} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <rect x="4" y="8" width="28" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
                <rect x="4" y="18" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.14)" />
                <rect x="4" y="26" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.09)" />
                <text x="4" y="44" fontSize="4.5" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">{j === 0 ? "LUNCH" : "DINNER"}</text>
              </g>
            ))}
          </g>
        );
      })}
      <text x="432" y="64" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">SHOPPING</text>
      <rect x="432" y="74" width="48" height="150" rx="4" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {list.map((item, i) => (
        <g key={item} transform={`translate(440 ${86 + i * 26})`}>
          <rect width="8" height="8" rx="1.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x="16" y="8" fontSize="5" fill="rgba(255,255,255,0.55)" fontFamily="JetBrains Mono, monospace" letterSpacing="0.2">{item.toUpperCase()}</text>
        </g>
      ))}
      <line x1="40" y1="252" x2="480" y2="252" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <text x="40" y="276" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">MEALS BECOME THE LIST · EVERYONE SEES IT LIVE</text>
      <text x="480" y="276" fontSize="7" fill="rgba(255,255,255,0.22)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" textAnchor="end">PRE-DEMO</text>
    </svg>
  );
}
