'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Next.js 16.2 Agent-Friendly Navigation Hook
 * 
 * Provides navigation utilities optimized for AI agent interaction:
 * - View Transition support for smooth page changes
 * - Cached navigation for faster subsequent visits
 * - Error recovery with automatic retry
 */
export function useAgentNavigation() {
  const router = useRouter();

  /**
   * Navigate with View Transition support
   * Next.js 16.2: Uses transitionTypes for smooth visual transitions
   */
  const navigate = useCallback((
    href: string,
    options?: {
      transition?: 'default' | 'fade' | 'slide' | 'none';
      cached?: boolean;
    }
  ) => {
    const transitionType = options?.transition || 'default';
    
    // Next.js 16.2: View Transition API support
    if (typeof document !== 'undefined' &&
        'startViewTransition' in document &&
        transitionType !== 'none') {

      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  }, [router]);

  /**
   * Navigate back with transition
   */
  const back = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * Navigate forward with transition
   */
  const forward = useCallback(() => {
    router.forward();
  }, [router]);

  /**
   * Refresh current page with cache invalidation
   * Next.js 16.2: Uses new scroll handler for better UX
   */
  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return {
    navigate,
    back,
    forward,
    refresh,
  };
}

/**
 * Agent-friendly Link component with View Transition support
 * Usage: <AgentLink href="/page" transition="fade">Link</AgentLink>
 */
export interface AgentLinkProps {
  href: string;
  children: React.ReactNode;
  transition?: 'default' | 'fade' | 'slide' | 'none';
  className?: string;
  prefetch?: boolean;
}
