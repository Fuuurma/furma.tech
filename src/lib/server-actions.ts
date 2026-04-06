/**
 * Server Actions
 * These must be in a separate file from client component imports
 */

'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { contactFormSchema, waitlistSchema, bookingSchema, validateForm } from './schemas';
import type { ServerActionResponse } from './actions';

/**
 * Submit contact form
 * Used on /contact page and demo requests
 */
export async function submitContactForm(
  formData: FormData
): Promise<ServerActionResponse> {
  
  const startTime = performance.now();

  try {
    // Extract form data
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      newsletter: formData.get('newsletter') === 'on',
    };

    // Validate
    const validation = validateForm(contactFormSchema, data);
    if (validation.errors) {
      return { success: false, error: 'Validation failed' };
    }

    // TODO(#email-integration): Integrate with email service (Resend, SendGrid, etc.)
    // See: https://github.com/furma/furma.tech/issues/email

    // Generate message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Revalidate any cached contact-related pages
    revalidatePath('/contact');

    return { 
      success: true, 
      data: { messageId },
      executionTime: performance.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      digest: (error as Error & { digest?: string }).digest,
      executionTime: performance.now() - startTime,
    };
  }
}

/**
 * Submit waitlist signup
 * Lightweight signup for product waitlists
 */
export async function submitWaitlistSignup(
  formData: FormData
): Promise<ServerActionResponse> {
  
  const startTime = performance.now();

  try {
    const data = {
      email: formData.get('email') as string,
      interest: formData.get('interest') as string,
    };

    const validation = validateForm(waitlistSchema, data);
    if (validation.errors) {
      return { success: false, error: 'Invalid email address' };
    }

    // Store waitlist signup - implement persistence as needed
    const signupId = `wl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    return { 
      success: true, 
      data: { signupId },
      executionTime: performance.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      digest: (error as Error & { digest?: string }).digest,
      executionTime: performance.now() - startTime,
    };
  }
}

/**
 * Submit booking/demo request
 * For scheduling calls with potential customers
 */
export async function submitBookingRequest(
  formData: FormData
): Promise<ServerActionResponse> {
  
  const startTime = performance.now();

  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      preferredDate: formData.get('preferredDate') as string,
      preferredTime: formData.get('preferredTime') as string,
      timezone: formData.get('timezone') as string || 'Europe/Madrid',
      product: formData.get('product') as string,
      notes: formData.get('notes') as string,
    };

    const validation = validateForm(bookingSchema, data);
    if (validation.errors) {
      return { success: false, error: 'Please fill in all required fields correctly' };
    }

    // Process booking request - implement calendar integration as needed
    const bookingId = `bk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    return { 
      success: true, 
      data: { bookingId },
      executionTime: performance.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      digest: (error as Error & { digest?: string }).digest,
      executionTime: performance.now() - startTime,
    };
  }
}
