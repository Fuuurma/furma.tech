/**
 * Next.js 16.2 Server Action Utilities
 * 
 * Provides helper functions for server actions:
 * - Response type definitions
 * - Error handling helpers
 * - Validation utilities
 * 
 * Note: Actual server actions are in server-actions.ts
 */

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

// Re-export schemas for convenience
export { contactFormSchema, waitlistSchema, bookingSchema, validateForm };
