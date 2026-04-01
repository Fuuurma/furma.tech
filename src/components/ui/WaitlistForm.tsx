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

  const inputStyles = "flex-1 px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder-grey-400 focus:outline-none focus:border-foreground transition-all disabled:opacity-50";

  if (variant === 'inline') {
    return (
      <div className="flex flex-col gap-4">
        <form action={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            disabled={isPending || status === 'success'}
            className={inputStyles}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isPending || status === 'success'}
            className="whitespace-nowrap h-auto py-3 px-6"
          >
            {isPending ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Waitlist'}
          </Button>
        </form>
        {status === 'success' && (
          <p className="text-[12px] font-bold text-foreground uppercase tracking-widest">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-[12px] font-bold text-foreground opacity-50 uppercase tracking-widest">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <form action={handleSubmit} className="space-y-0">
        <input
          type="email"
          name="email"
          placeholder="Enter your work email"
          required
          disabled={isPending || status === 'success'}
          className={`${inputStyles} w-full text-center border-b-0`}
        />
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isPending || status === 'success'}
          className="w-full h-16"
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
      </form>

      {status === 'success' && (
        <p className="text-[12px] font-bold text-foreground uppercase tracking-widest text-center">{message}</p>
      ) || status === 'error' && (
        <p className="text-[12px] font-bold text-foreground opacity-50 uppercase tracking-widest text-center">{message}</p>
      )}
    </div>
  );
}
