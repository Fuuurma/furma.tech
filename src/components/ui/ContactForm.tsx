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
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              required
              disabled={isPending || status === 'success'}
              placeholder="John Doe"
            />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
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

        {/* Message */}
        <Field>
          <FieldLabel htmlFor="message">Detailed Request</FieldLabel>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
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
            I want to receive product updates and engineering logs. No spam.
          </FieldDescription>
        </Field>

        {/* Status Messages */}
        {status === 'success' && (
          <Alert variant="default" className="border-green-600/30 bg-green-600/5">
            <CheckCircle className="size-4 text-green-600" />
            <AlertDescription className="text-[13px] font-medium">
              ✓ {message}
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert variant="destructive">
            <XCircle className="size-4" />
            <AlertDescription className="text-[13px] font-medium">
              ✕ {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
          <Button
            type="submit"
            disabled={isPending || status === 'success'}
            className="min-w-[200px]"
          >
            {isPending ? (
              <>
                <Spinner className="size-4" />
                Processing...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle data-icon="inline-start" />
                Sent Successfully
              </>
            ) : (
              <>
                <Send data-icon="inline-start" />
                Send Message
              </>
            )}
          </Button>

          {isPending && (
            <p className="text-[11px] font-mono text-grey-500 uppercase tracking-wider">Sending...</p>
          )}
        </div>
      </FieldGroup>
    </form>
  );
}
