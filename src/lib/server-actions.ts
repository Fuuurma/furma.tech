/**
 * Server Actions
 * Individual actions have 'use server' directive inline
 */

'use server';

import { revalidatePath } from 'next/cache';
import { contactFormSchema, waitlistSchema, validateForm } from './schemas';

interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

async function withActionLogging<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = (performance.now() - start).toFixed(2);
    console.log(`[Action] ${name} completed in ${duration}ms`);
    return result;
  } catch (error) {
    console.error(`[Action] ${name} failed:`, error);
    throw error;
  }
}

export async function submitContactForm(formData: FormData): Promise<ServerActionResponse> {
  'use server';
  
  return withActionLogging('submitContactForm', async () => {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      newsletter: formData.get('newsletter') === 'on',
    };

    const validation = validateForm(contactFormSchema, data);
    if (validation.errors) {
      return { success: false, error: 'Validation failed' };
    }

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    revalidatePath('/contact');

    return { success: true, data: { messageId } };
  });
}

export async function submitWaitlistSignup(formData: FormData): Promise<ServerActionResponse> {
  'use server';
  
  return withActionLogging('submitWaitlistSignup', async () => {
    const data = {
      email: formData.get('email') as string,
      interest: formData.get('interest') as string,
    };

    const validation = validateForm(waitlistSchema, data);
    if (validation.errors) {
      return { success: false, error: 'Invalid email address' };
    }

    const signupId = `wl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    return { success: true, data: { signupId } };
  });
}
