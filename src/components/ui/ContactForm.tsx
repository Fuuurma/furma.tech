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
          trackEvent('contact_form_submit', { success: true });
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

  const inputStyles = "w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder-grey-400 focus:outline-none focus:border-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending || status === 'success'}
            className={inputStyles}
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending || status === 'success'}
            className={inputStyles}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            disabled={isPending || status === 'success'}
            className={inputStyles}
            placeholder="Your company"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            disabled={isPending || status === 'success'}
            className={inputStyles}
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
        <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
          Detailed Request
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          disabled={isPending || status === 'success'}
          className={`${inputStyles} resize-none`}
          placeholder="Tell us about your needs..."
        />
      </div>

      {/* Newsletter */}
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          disabled={isPending || status === 'success'}
          className="mt-1 w-4 h-4 rounded-none border-border bg-background text-foreground focus:ring-0 focus:ring-offset-0"
        />
        <label htmlFor="newsletter" className="text-[13px] text-grey-500 leading-relaxed">
          I want to receive product updates and engineering logs. No spam.
        </label>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-6 border border-foreground bg-foreground text-background">
          <p className="text-sm font-bold uppercase tracking-widest">✓ {message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-6 border border-border bg-foreground/[0.02]">
          <p className="text-sm font-bold uppercase tracking-widest opacity-50">✕ {message}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isPending || status === 'success'}
          className="min-w-[240px] h-16"
        >
          {isPending ? (
            <span className="flex items-center gap-2 uppercase tracking-widest">
              Processing...
            </span>
          ) : status === 'success' ? (
            'Sent Successfully'
          ) : (
            'Transmit Message'
          )}
        </Button>
        
        {isPending && (
          <p className="text-[11px] font-mono text-grey-400 uppercase tracking-widest animate-pulse">Establishing Connection...</p>
        )}
      </div>
    </form>
  );
}
