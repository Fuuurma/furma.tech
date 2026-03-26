'use client';

import { useState, useTransition } from 'react';
import { Button } from './Button';
import { trackEvent } from '@/components/Analytics';

interface WaitlistFormProps {
  action: (formData: FormData) => Promise<{
    success: boolean;
    error?: string;
    data?: unknown;
  }>;
  variant?: 'default' | 'inline' | 'minimal';
}

export function WaitlistForm({ action, variant = 'default' }: WaitlistFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setStatus('submitting');

      try {
        const result = await action(formData);

        if (result.success) {
          setStatus('success');
          setMessage('You\'re on the list! We\'ll notify you when access opens.');
          trackEvent('waitlist_signup', { success: true });
        } else {
          setStatus('error');
          setMessage(result.error || 'Something went wrong. Please try again.');
          trackEvent('waitlist_signup', { success: false, error: result.error });
        }
      } catch (error) {
        setStatus('error');
        setMessage('Please check your email and try again.');
        trackEvent('waitlist_signup', { success: false, error: 'network_error' });
      }
    });
  }

  if (variant === 'inline') {
    return (
      <form action={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          disabled={isPending || status === 'success'}
          className="flex-1 px-4 py-3 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-fg placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="premium"
          disabled={isPending || status === 'success'}
          className="whitespace-nowrap"
        >
          {isPending ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Waitlist'}
        </Button>
        {status === 'success' && (
          <p className="text-sm text-green-600 dark:text-green-400 w-full">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400 w-full">{message}</p>
        )}
      </form>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="waitlist-email"
          name="email"
          placeholder="Enter your work email"
          required
          disabled={isPending || status === 'success'}
          className="w-full px-4 py-3 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-fg placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50"
        />
      </div>
      
      <Button
        type="submit"
        variant="premium"
        size="lg"
        disabled={isPending || status === 'success'}
        className="w-full"
      >
        {isPending ? (
          <span className="flex items-center gap-2 justify-center">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Joining...
          </span>
        ) : status === 'success' ? (
          '✓ You\'re on the list!'
        ) : (
          'Join Waitlist →'
        )}
      </Button>

      {status === 'success' && (
        <p className="text-sm text-center text-green-600 dark:text-green-400">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-center text-red-600 dark:text-red-400">{message}</p>
      )}
    </form>
  );
}
