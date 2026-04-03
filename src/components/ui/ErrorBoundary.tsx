'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Next.js 16.2: Use unstable_retry for automatic recovery attempts
  const handleRetry = () => {
    if (typeof (reset as any).unstable_retry === 'function') {
      (reset as any).unstable_retry();
    } else {
      reset();
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="font-serif text-[28px] font-semibold text-fg mb-4">
          Something went wrong
        </h2>
        
        <p className="text-[14px] text-grey-600 dark:text-grey-400 mb-6 leading-relaxed">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {error.digest && (
          <p className="text-[11px] font-mono text-grey-400 mb-6">
            Error ID: {error.digest}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleRetry} variant="premium" size="md">
            Try again
          </Button>
          <Button href="/" variant="outline" size="md">
            Go home
          </Button>
        </div>
        
        {isClient && (
          <details className="mt-8 text-left">
            <summary className="text-[12px] text-grey-500 cursor-pointer hover:text-grey-700 dark:hover:text-grey-300">
              Error details
            </summary>
            <pre className="mt-2 p-4 bg-grey-100 dark:bg-grey-800 rounded-lg text-[11px] text-grey-600 dark:text-grey-400 overflow-auto max-h-48">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
