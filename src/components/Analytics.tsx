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

/**
 * Track custom events
 * Usage: trackEvent('contact_form_submit', { product: 'restauManager' })
 */
export function trackEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    if (window.va) {
      window.va('event', { eventName, data });
    }
  }
}
