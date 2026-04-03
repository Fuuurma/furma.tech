'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
      } catch {
        setStatus('error');
        setMessage('Please check your email and try again.');
        trackEvent('waitlist_signup', { success: false, error: 'network_error' });
      }
    });
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-col gap-3">
        <form action={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            disabled={isPending || status === 'success'}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isPending || status === 'success'}
            className="whitespace-nowrap"
          >
            {isPending ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join'}
          </Button>
        </form>
        {status === 'success' && (
          <p className="text-[12px] font-medium text-foreground">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-[12px] font-medium text-destructive">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-md">
      <form action={handleSubmit} className="space-y-3">
        <Input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={isPending || status === 'success'}
        />
        
        <Button
          type="submit"
          disabled={isPending || status === 'success'}
          className="w-full"
        >
          {isPending ? 'Joining...' : status === 'success' ? '✓ You\'re on the list!' : 'Join Waitlist'}
        </Button>
      </form>

      {status === 'success' && (
        <p className="text-[12px] font-medium text-foreground">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-[12px] font-medium text-destructive">{message}</p>
      )}
    </div>
  );
}
