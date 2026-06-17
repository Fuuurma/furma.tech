"use client";

// Aitlas — Linear-style: Nova workspace split panel + MCP node graph
// Dark (#08090a), thin white borders, monospace labels, no illustration
export function AitlasHero({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 340"
      className={`w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background panel */}
      <rect width="520" height="340" fill="#08090a" />

      {/* Left panel — Nova workspace */}
      <rect x="20" y="20" width="220" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Title bar */}
      <rect x="20" y="20" width="220" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="20" y="44" width="220" height="8" fill="rgba(255,255,255,0.04)" />
      {/* Traffic lights */}
      <circle cx="36" cy="36" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="52" cy="36" r="5" fill="rgba(255,255,255,0.07)" />
      <circle cx="68" cy="36" r="5" fill="rgba(255,255,255,0.04)" />
      {/* Window title */}
      <text x="110" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">nova — workspace</text>

      {/* Sidebar */}
      <rect x="20" y="52" width="36" height="268" rx="0" fill="rgba(255,255,255,0.025)" />
      {/* Sidebar items */}
      {[{ y: 72, label: "N" }, { y: 96, label: "A" }, { y: 120, label: "▼" }, { y: 144, label: "⚙" }].map((item) => (
        <rect key={item.label} x="28" y={item.y} width="20" height="16" rx="3" fill="rgba(255,255,255,0.05)" />
      ))}

      {/* Content area — MCP actions list */}
      <text x="68" y="76" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">AGENTS</text>

      {/* Action rows */}
      {[
        { y: 86, name: "claude-code", status: "active", icon: "●" },
        { y: 108, name: "aider", status: "idle", icon: "○" },
        { y: 130, name: "deepagents", status: "idle", icon: "○" },
        { y: 152, name: " Roo Code", status: "idle", icon: "○" },
      ].map((row) => (
        <g key={row.name}>
          <rect x="64" y={row.y} width="164" height="18" rx="3" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x="74" y={row.y + 12} fontSize="7" fill={row.status === "active" ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)"} fontFamily="JetBrains Mono, monospace">{row.name}</text>
          <circle cx="214" cy={row.y + 9} r="3" fill={row.status === "active" ? "#10b981" : "rgba(255,255,255,0.15)"} fillOpacity={row.status === "active" ? "0.8" : "1"} />
        </g>
      ))}

      <text x="68" y="192" fontSize="6" fill="rgba(255,255,255,0.25)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">LIBRARY</text>
      {[
        { y: 202, name: "research", count: "2.4k" },
        { y: 220, name: "deploy", count: "891" },
        { y: 238, name: "health", count: "444" },
      ].map((row) => (
        <g key={row.name}>
          <rect x="64" y={row.y} width="164" height="14" rx="2" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          <text x="74" y={row.y + 10} fontSize="6.5" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace">{row.name}</text>
          <text x="214" y={row.y + 10} fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="end">{row.count}</text>
        </g>
      ))}

      {/* Nexus status bar */}
      <rect x="20" y="290" width="220" height="30" rx="0 0 8 8" fill="rgba(255,255,255,0.025)" />
      <rect x="20" y="290" width="220" height="1" fill="rgba(255,255,255,0.05)" />
      <text x="36" y="308" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace">nexus</text>
      <text x="36" y="316" fontSize="5.5" fill="rgba(255,255,255,0.12)" fontFamily="JetBrains Mono, monospace">elixir · phoenix · liveview</text>
      <circle cx="222" cy="306" r="4" fill="#10b981" fillOpacity="0.7" className="animate-pulse" />

      {/* Right panel — MCP node graph */}
      <rect x="260" y="20" width="240" height="300" rx="8" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="260" y="20" width="240" height="32" rx="8" fill="rgba(255,255,255,0.04)" />
      <rect x="260" y="44" width="240" height="8" fill="rgba(255,255,255,0.04)" />
      <text x="380" y="40" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">MCP Graph</text>

      {/* Node connections */}
      <line x1="380" y1="100" x2="310" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="380" y1="100" x2="450" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="310" y1="160" x2="310" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="450" y1="160" x2="450" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="310" y1="220" x2="380" y2="270" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="450" y1="220" x2="380" y2="270" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 3" />

      {/* Center node — root */}
      <circle cx="380" cy="100" r="22" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <circle cx="380" cy="100" r="14" fill="rgba(113,112,255,0.15)" stroke="rgba(113,112,255,0.35)" strokeWidth="1" />
      <text x="380" y="104" fontSize="6" fill="rgba(113,112,255,0.9)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">MCP</text>

      {/* Left branch */}
      <circle cx="310" cy="160" r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="310" y="156" fontSize="5.5" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">nova</text>
      <text x="310" y="167" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">workspace</text>

      {/* Right branch */}
      <circle cx="450" cy="160" r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="450" y="156" fontSize="5.5" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">nexus</text>
      <text x="450" y="167" fontSize="5" fill="rgba(255,255,255,0.2)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">runtime</text>

      {/* Bottom nodes */}
      <circle cx="310" cy="220" r="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="310" y="224" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">BYOK</text>

      <circle cx="450" cy="220" r="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="450" y="224" fontSize="5.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">MCP</text>

      {/* Bottom tip */}
      <circle cx="380" cy="270" r="16" fill="rgba(113,112,255,0.08)" stroke="rgba(113,112,255,0.2)" strokeWidth="1" />
      <text x="380" y="267" fontSize="5" fill="rgba(113,112,255,0.6)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Agents</text>
      <text x="380" y="276" fontSize="5" fill="rgba(113,112,255,0.4)" fontFamily="JetBrains Mono, monospace" textAnchor="middle">store</text>
    </svg>
  );
}
