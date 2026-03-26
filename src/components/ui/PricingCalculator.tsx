"use client";

import { useState } from "react";

interface PricingCalculatorProps {
  className?: string;
}

export default function PricingCalculator({ className = "" }: PricingCalculatorProps) {
  const [tweets, setTweets] = useState(10);
  const [documents, setDocuments] = useState(50);
  const [searches, setSearches] = useState(20);
  const [agentsHired, setAgentsHired] = useState(0);

  // Pricing from FURMA_MASTER.md
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

  return (
    <div className={`bg-background border border-grey-200 dark:border-grey-800 rounded-lg p-8 ${className}`}>
      <h3 className="font-serif text-[24px] font-semibold text-foreground mb-6">
        Pricing Calculator
      </h3>
      <p className="text-[14px] text-grey-600 mb-6">
        Estimate your monthly compute costs based on your usage.
      </p>

      <div className="space-y-6">
        {/* Twitter Intelligence */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              f.twyt queries per month
            </label>
            <input
              type="number"
              value={tweets}
              onChange={(e) => setTweets(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 px-3 py-2 border border-grey-200 rounded text-foreground text-sm dark:border-grey-800 dark:bg-grey-900"
              min="0"
            />
          </div>
          <div className="text-xs text-grey-500">
            {tweets * F_TWYT_COST} credits/month (${(tweets * F_TWYT_COST * 0.01).toFixed(2)}/mo)
          </div>
        </div>

        {/* Vector Knowledge */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              Documents to upload (f.library)
            </label>
            <input
              type="number"
              value={documents}
              onChange={(e) => setDocuments(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 px-3 py-2 border border-grey-200 rounded text-foreground text-sm dark:border-grey-800 dark:bg-grey-900"
              min="0"
            />
          </div>
          <div className="text-xs text-grey-500">
            {documents * F_LIBRARY_COST_INGEST + searches * F_LIBRARY_COST_SEARCH} credits/month
          </div>
        </div>

        {/* Document Searches */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="sm font-medium text-foreground">
              Knowledge base searches per month
            </label>
            <input
              type="number"
              value={searches}
              onChange={(e) => setSearches(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 px-3 py-2 border border-grey-200 rounded text-foreground text-sm dark:border-grey-800 dark:bg-grey-900"
              min="0"
            />
          </div>
          <div className="text-xs text-grey-500">
            {searches * F_LIBRARY_COST_SEARCH} credits/month
          </div>
        </div>

        {/* Agent Runtime */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="sm font-medium text-foreground">
              Long-running agent tasks (Nexus)
            </label>
            <input
              type="number"
              value={agentsHired}
              onChange={(e) => setAgentsHired(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 px-3 py-2 border border-grey-200 rounded text-foreground text-sm dark:border-grey-800 dark:bg-grey-900"
              min="0"
            />
          </div>
          <div className="text-xs text-grey-500">
            {agentsHired > 0 ? `${NEXIS_TASK_COST} + (NEXIS_HOURLY_RATE * 160)} credits/month` : '0 credits/month'}
          </div>
        </div>

        {/* Total */}
        <div className="pt-6 border-t border-grey-200">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-grey-600">
              Estimated Monthly Total
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[32px] font-semibold text-foreground">
              {monthlyEstimate.toLocaleString()}
            </span>
            <span className="text-sm text-grey-500">
              credits
            </span>
          </div>
          <div className="text-xs text-grey-500 mt-1">
            ≈ ${dollarEstimate.toFixed(2)}/month
          </div>
          <p className="text-[12px] text-grey-400 mt-4">
            * Estimates only. Actual costs vary based on model pricing and task complexity.
          </p>
        </div>
      </div>
    </div>
  );
}
