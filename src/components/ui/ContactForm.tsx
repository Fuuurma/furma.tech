'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
      } catch {
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
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[12px] font-semibold uppercase tracking-wide">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            required
            disabled={isPending || status === 'success'}
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[12px] font-semibold uppercase tracking-wide">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={isPending || status === 'success'}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company" className="text-[12px] font-semibold uppercase tracking-wide">
            Organization
          </Label>
          <Input
            id="company"
            name="company"
            disabled={isPending || status === 'success'}
            placeholder="Your company"
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-[12px] font-semibold uppercase tracking-wide">
            Subject
          </Label>
          <Select name="subject" disabled={isPending || status === 'success'} required>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product_demo">Product Demo Request</SelectItem>
              <SelectItem value="aitlas_access">Aitlas Early Access</SelectItem>
              <SelectItem value="partnership">Partnership Inquiry</SelectItem>
              <SelectItem value="general">General Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-[12px] font-semibold uppercase tracking-wide">
          Detailed Request
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          disabled={isPending || status === 'success'}
          placeholder="Tell us about your needs..."
        />
      </div>

      {/* Newsletter */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="newsletter"
          name="newsletter"
          disabled={isPending || status === 'success'}
          className="mt-1"
        />
        <Label htmlFor="newsletter" className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed font-normal cursor-pointer">
          I want to receive product updates and engineering logs. No spam.
        </Label>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 border border-green-600/30 bg-green-600/5 rounded-lg">
          <p className="text-[13px] font-medium text-foreground">✓ {message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 border border-destructive/30 bg-destructive/5 rounded-lg">
          <p className="text-[13px] font-medium text-foreground">✕ {message}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
        <Button
          type="submit"
          disabled={isPending || status === 'success'}
          className="min-w-[200px]"
        >
          {isPending ? 'Processing...' : status === 'success' ? 'Sent Successfully' : 'Send Message'}
        </Button>
        
        {isPending && (
          <p className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-3">Sending...</p>
        )}
      </div>
    </form>
  );
}
