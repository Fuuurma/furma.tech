'use client';

import { useState } from 'react';

interface PricingCalculatorProps {
  className?: string;
}

export default function PricingCalculator({ className = '' }: PricingCalculatorProps) {
  const [novaThreads, setNovaThreads] = useState(500);
  const [nexusTasks, setNexusTasks] = useState(100);
  const [agentsHired, setAgentsHired] = useState(2);

  const NOVA_PER_THREAD = 0.5;
  const NEXUS_PER_TASK = 1;
  const AGENT_BASE = 15;

  const monthlyEstimate =
    novaThreads * NOVA_PER_THREAD +
    nexusTasks * NEXUS_PER_TASK +
    agentsHired * AGENT_BASE;

  const inputStyles = 'w-24 px-3 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-foreground transition-colors';

  return (
    <div className={`bg-background border border-border p-10 ${className}`}>
      <h3 className="font-serif text-[28px] font-bold text-foreground mb-8">
        Compute Calculator.
      </h3>
      <p className="text-[14px] text-grey-500 mb-12 leading-relaxed">
        Estimate your monthly costs based on projected usage across Nova, Nexus, and Agents.
      </p>

      <div className="space-y-10">
        <div className="group">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[11px] font-bold uppercase tracking-widest text-grey-400 group-hover:text-foreground transition-colors">
              Nova threads / mo
            </label>
            <input
              type="number"
              value={novaThreads}
              onChange={(e) => setNovaThreads(Math.max(0, parseInt(e.target.value) || 0))}
              className={inputStyles}
              min="0"
            />
          </div>
          <div className="text-[10px] font-mono text-grey-400 uppercase tracking-tighter">
            {Math.round(novaThreads * NOVA_PER_THREAD)} credits
          </div>
        </div>

        <div className="group">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[11px] font-bold uppercase tracking-widest text-grey-400 group-hover:text-foreground transition-colors">
              Nexus tasks / mo
            </label>
            <input
              type="number"
              value={nexusTasks}
              onChange={(e) => setNexusTasks(Math.max(0, parseInt(e.target.value) || 0))}
              className={inputStyles}
              min="0"
            />
          </div>
          <div className="text-[10px] font-mono text-grey-400 uppercase tracking-tighter">
            {Math.round(nexusTasks * NEXUS_PER_TASK)} credits
          </div>
        </div>

        <div className="group">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[11px] font-bold uppercase tracking-widest text-grey-400 group-hover:text-foreground transition-colors">
              Agents hired
            </label>
            <input
              type="number"
              value={agentsHired}
              onChange={(e) => setAgentsHired(Math.max(0, parseInt(e.target.value) || 0))}
              className={inputStyles}
              min="0"
            />
          </div>
          <div className="text-[10px] font-mono text-grey-400 uppercase tracking-tighter">
            {agentsHired > 0 ? `${agentsHired * AGENT_BASE} credits/mo per agent` : 'No agents'}
          </div>
        </div>

        <div className="pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-grey-400">
              Projected Monthly
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[48px] font-bold text-foreground leading-none">
              {monthlyEstimate.toLocaleString()}
            </span>
            <span className="text-[12px] font-mono uppercase tracking-widest opacity-40">
              credits
            </span>
          </div>
          <p className="text-[11px] text-grey-400 mt-10 leading-relaxed uppercase tracking-tighter">
            * Estimates based on base compute costs. BYOK — you pay your own provider directly.
          </p>
        </div>
      </div>
    </div>
  );
}
