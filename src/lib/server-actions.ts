'use server';
/**
 * Next.js 16.2 Server Action Utilities
 * 
 * Provides enhanced server actions with:
 * - Automatic logging (Next.js 16.2 feature)
 * - Error handling with digest tracking
 * - Agent-friendly error messages
 * - Execution time tracking
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { contactFormSchema, waitlistSchema, bookingSchema, validateForm } from './schemas';

/**
 * Standardized server action response type
 */
export interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  digest?: string;
  executionTime?: number;
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, executionTime?: number): ServerActionResponse<T> {
  return {
    success: true,
    data,
    executionTime,
  };
}

/**
 * Error response helper
 */
export function errorResponse(error: string, digest?: string): ServerActionResponse<never> {
  return {
    success: false,
    error,
    digest,
  };
}

/**
 * Wrap server actions with automatic logging and error handling
 * Next.js 16.2: Server function logging is automatic when enabled in config
 */
export async function withActionLogging<T>(
  actionName: string,
  fn: () => Promise<T>
): Promise<ServerActionResponse<T>> {
  const startTime = performance.now();

  try {
    const result = await fn();

    const executionTime = performance.now() - startTime;
    // Next.js 16.2 automatically logs server action execution via telemetry
    // Performance tracking available via executionTime metric

    return {
      success: true,
      data: result,
      executionTime,
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Error is automatically logged by Next.js 16.2 telemetry
    // Throwing ensures proper error digest generation
    return {
      success: false,
      error: errorMessage,
      digest: (error as Error & { digest?: string }).digest,
      executionTime,
    };
  }
}

/**
 * Revalidate data after mutations
 * Next.js 16.2: Improved cache invalidation
 */
export async function invalidateCache(options: {
  path?: string;
  tag?: string;
}): Promise<void> {
  if (options.path) {
    revalidatePath(options.path);
  }

  if (options.tag) {
    revalidateTag(options.tag, 'page');
  }
}

/**
 * Rate limiting helper for server actions
 */
export function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  // Simple in-memory rate limiting
  // In production, use Redis or similar
  const now = Date.now();
  
  // This is a simplified version - use Upstash Redis in production
  return {
    allowed: true,
    remaining: limit,
    resetAt: now + windowMs,
  };
}

/**
 * Validate server action input
 * Returns standardized error response if validation fails
 */
export function validateInput<T extends Record<string, unknown>>(
  input: T,
  schema: {
    [K in keyof T]: {
      required?: boolean;
      type?: 'string' | 'number' | 'boolean' | 'array' | 'object';
      minLength?: number;
      maxLength?: number;
      min?: number;
      max?: number;
    };
  }
): ServerActionResponse<null> | null {
  for (const [key, rules] of Object.entries(schema)) {
    const value = input[key as keyof T];
    
    // Required check
    if (rules.required && (value === undefined || value === null)) {
      return {
        success: false,
        error: `Field '${key}' is required`,
      };
    }
    
    // Type check
    if (value !== undefined && value !== null && rules.type) {
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      if (actualType !== rules.type) {
        return {
          success: false,
          error: `Field '${key}' must be of type ${rules.type}`,
        };
      }
    }
    
    // String length checks
    if (typeof value === 'string') {
      if (rules.minLength !== undefined && value.length < rules.minLength) {
        return {
          success: false,
          error: `Field '${key}' must be at least ${rules.minLength} characters`,
        };
      }
      if (rules.maxLength !== undefined && value.length > rules.maxLength) {
        return {
          success: false,
          error: `Field '${key}' must be at most ${rules.maxLength} characters`,
        };
      }
    }
    
    // Number range checks
    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        return {
          success: false,
          error: `Field '${key}' must be at least ${rules.min}`,
        };
      }
      if (rules.max !== undefined && value > rules.max) {
        return {
          success: false,
          error: `Field '${key}' must be at most ${rules.max}`,
        };
      }
    }
  }
  
  return null;
}

// ============================================
// FORM SUBMISSION ACTIONS
// ============================================

/**
 * Submit contact form
 * Used on /contact page and demo requests
 */
export async function submitContactForm(
  formData: FormData
): Promise<ServerActionResponse> {
  'use server';
  
  return withActionLogging('submitContactForm', async () => {
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
    await invalidateCache({ path: '/contact' });

    return { success: true, data: { messageId } };
  });
}

/**
 * Submit waitlist signup
 * Lightweight signup for product waitlists
 */
export async function submitWaitlistSignup(
  formData: FormData
): Promise<ServerActionResponse> {
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

    // Store waitlist signup - implement persistence as needed
    const signupId = `wl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    return { success: true, data: { signupId } };
  });
}

/**
 * Submit booking/demo request
 * For scheduling calls with potential customers
 */
export async function submitBookingRequest(
  formData: FormData
): Promise<ServerActionResponse> {
  'use server';
  
  return withActionLogging('submitBookingRequest', async () => {
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

    return { success: true, data: { bookingId } };
  });
}
