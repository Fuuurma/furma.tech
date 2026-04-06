'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { trackEvent } from '@/components/Analytics';
import { CheckCircle, XCircle, Send } from 'lucide-react';

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
    <form id="contact-form" action={handleSubmit} className="w-full">
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name - Optional */}
          <Field>
            <FieldLabel htmlFor="name">
              Full Name <span className="text-grey-400 font-normal">(optional)</span>
            </FieldLabel>
            <Input
              id="name"
              name="name"
              disabled={isPending || status === 'success'}
              placeholder="John Doe"
            />
          </Field>

          {/* Email - Required */}
          <Field>
            <FieldLabel htmlFor="email">Email Address *</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={isPending || status === 'success'}
              placeholder="john@company.com"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <Field>
            <FieldLabel htmlFor="company">Organization</FieldLabel>
            <Input
              id="company"
              name="company"
              disabled={isPending || status === 'success'}
              placeholder="Your company"
            />
          </Field>

          {/* Subject */}
          <Field>
            <FieldLabel htmlFor="subject">Subject</FieldLabel>
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
          </Field>
        </div>

        {/* Message - Optional */}
        <Field>
          <FieldLabel htmlFor="message">
            Message <span className="text-grey-400 font-normal">(optional)</span>
          </FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={4}
            disabled={isPending || status === 'success'}
            placeholder="Tell us about your needs..."
          />
        </Field>

        {/* Newsletter */}
        <Field className="flex-row items-center gap-3">
          <Checkbox
            id="newsletter"
            name="newsletter"
            disabled={isPending || status === 'success'}
          />
          <FieldDescription className="font-normal cursor-pointer">
            Subscribe to product updates and engineering logs
          </FieldDescription>
        </Field>

        {/* Subscribe Button */}
        <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
          <Button
            type="submit"
            name="action"
            value="subscribe"
            disabled={isPending || status === 'success'}
            variant="outline"
            className="min-w-[200px]"
          >
            {isPending ? (
              <>
                <Spinner className="size-4" />
                Subscribing...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle data-icon="inline-start" />
                Subscribed!
              </>
            ) : (
              <>
                Subscribe for Updates
              </>
            )}
          </Button>

          <Button
            type="submit"
            name="action"
            value="contact"
            disabled={isPending || status === 'success'}
            className="min-w-[200px]"
          >
            {isPending ? (
              <>
                <Spinner className="size-4" />
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle data-icon="inline-start" />
                Sent!
              </>
            ) : (
              <>
                <Send data-icon="inline-start" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
