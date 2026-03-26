'use client';

import { useState, useTransition } from 'react';
import { Button } from './Button';
import { trackEvent } from '@/components/Analytics';

interface ContactFormProps {
  action: (formData: FormData) => Promise<{
    success: boolean;
    error?: string;
    data?: unknown;
  }>;
}

export function ContactForm({ action }: ContactFormProps) {
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
          setMessage('Thank you! We\'ll be in touch within 48 hours.');
          // Track successful submission
          trackEvent('contact_form_submit', { success: true });
          // Reset form after success
          const form = document.getElementById('contact-form') as HTMLFormElement;
          form?.reset();
        } else {
          setStatus('error');
          setMessage(result.error || 'Something went wrong. Please try again.');
          trackEvent('contact_form_submit', { success: false, error: result.error });
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network error. Please check your connection and try again.');
        trackEvent('contact_form_submit', { success: false, error: 'network_error' });
      }
    });
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-fg mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending || status === 'success'}
            className="w-full px-4 py-3 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-fg placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-fg mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending || status === 'success'}
            className="w-full px-4 py-3 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-fg placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-fg mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            disabled={isPending || status === 'success'}
            className="w-full px-4 py-3 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-fg placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Your company"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-fg mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            disabled={isPending || status === 'success'}
            className="w-full px-4 py-3 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-fg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select a subject</option>
            <option value="product_demo">Product Demo Request</option>
            <option value="aitlas_access">Aitlas Early Access</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-fg mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={isPending || status === 'success'}
          className="w-full px-4 py-3 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-fg placeholder-grey-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          placeholder="Tell us about your needs..."
        />
      </div>

      {/* Newsletter */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          disabled={isPending || status === 'success'}
          className="mt-1 w-4 h-4 rounded border-grey-300 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
        />
        <label htmlFor="newsletter" className="text-sm text-grey-600 dark:text-grey-400">
          Subscribe to our newsletter for product updates and insights. No spam, unsubscribe anytime.
        </label>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
          <p className="font-medium">✓ {message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          <p className="font-medium">✕ {message}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          variant="premium"
          size="lg"
          disabled={isPending || status === 'success'}
          className="min-w-[160px]"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : status === 'success' ? (
            'Sent!'
          ) : (
            'Send Message →'
          )}
        </Button>
        
        {isPending && (
          <p className="text-sm text-grey-500">Please wait while we process your message...</p>
        )}
      </div>
    </form>
  );
}
