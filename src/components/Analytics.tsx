'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Analytics Component
 * 
 * Wraps Vercel Analytics and Speed Insights
 * Add to root layout for site-wide tracking
 */
export function Analytics() {
  return (
    <>
      {/* Vercel Analytics - Page views, events, user insights */}
      <VercelAnalytics />
      
      {/* Vercel Speed Insights - Core Web Vitals monitoring */}
      <SpeedInsights />
    </>
  );
}
