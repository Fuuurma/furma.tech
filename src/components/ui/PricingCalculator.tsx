"use client";

import { useState } from "react";

interface PricingCalculatorProps {
  className?: string;
}

export default function PricingCalculator({ className = "" }: PricingCalculatorProps) {
  const [tweets, setTweets] = useState(10);
  const [documents, setDocuments] = useState(50);
  const [searches] = useState(20);
  const [agentsHired] = useState(0);

  // Pricing
  const F_TWYT_COST = 1; // per query
  const F_LIBRARY_COST_INGEST = 2; // per document
  const F_LIBRARY_COST_SEARCH = 1; // per search
  const NEXIS_TASK_COST = 1; // per task
  const NEXIS_HOURLY_RATE = 2; // credits per hour

  const monthlyEstimate =
    tweets * F_TWYT_COST +
    documents * F_LIBRARY_COST_INGEST +
    searches * F_LIBRARY_COST_SEARCH +
    (agentsHired > 0 ? NEXIS_TASK_COST + (NEXIS_HOURLY_RATE * 160) : 0);

  const dollarEstimate = monthlyEstimate * 0.01; // 1 credit ≈ $0.01

  const inputStyles = "w-24 px-3 py-2 border border-border rounded-none bg-background text-foreground text-sm focus:outline-none focus:border-foreground transition-colors";

  return (
    <div className={`bg-background border border-border rounded-none p-10 ${className}`}>
      <h3 className="font-serif text-[28px] font-bold text-foreground mb-8">
        Compute Calculator.
      </h3>
      <p className="text-[14px] text-grey-500 mb-12 leading-relaxed">
        Estimate your monthly compute credits based on projected system load.
      </p>

      <div className="space-y-10">
        {/* Twitter Intelligence */}
        <div className="group">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[11px] font-bold uppercase tracking-widest text-grey-400 group-hover:text-foreground transition-colors">
              f.twyt queries / mo
            </label>
            <input
              type="number"
              value={tweets}
              onChange={(e) => setTweets(Math.max(0, parseInt(e.target.value) || 0))}
              className={inputStyles}
              min="0"
            />
          </div>
          <div className="text-[10px] font-mono text-grey-400 uppercase tracking-tighter">
            {tweets * F_TWYT_COST} credits · ${(tweets * F_TWYT_COST * 0.01).toFixed(2)} USD
          </div>
        </div>

        {/* Vector Knowledge */}
        <div className="group">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[11px] font-bold uppercase tracking-widest text-grey-400 group-hover:text-foreground transition-colors">
              f.library uploads / mo
            </label>
            <input
              type="number"
              value={documents}
              onChange={(e) => setDocuments(Math.max(0, parseInt(e.target.value) || 0))}
              className={inputStyles}
              min="0"
            />
          </div>
          <div className="text-[10px] font-mono text-grey-400 uppercase tracking-tighter">
            {documents * F_LIBRARY_COST_INGEST} ingestion credits
          </div>
        </div>

        {/* Total */}
        <div className="pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-grey-400">
              Projected Monthly Load
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
          <div className="text-[14px] font-bold text-foreground mt-4">
            ≈ ${dollarEstimate.toFixed(2)} USD
          </div>
          <p className="text-[11px] text-grey-400 mt-10 leading-relaxed uppercase tracking-tighter">
            * Estimates generated from base hardware costs. Individual task complexity may vary.
          </p>
        </div>
      </div>
    </div>
  );
}
