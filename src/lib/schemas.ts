import { z } from 'zod';

/**
 * Contact form schema
 * Used for contact pages, demo requests, and general inquiries
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  subject: z
    .enum(["product_demo", "aitlas_access", "partnership", "general"])
    .optional()
    .default("general"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  newsletter: z.boolean().optional().default(false),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Waitlist signup schema
 * Simplified form for quick signup
 */
export const waitlistSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  interest: z
    .enum(['aitlas', 'restaurantManager', 'tourManager', 'financeHub', 'all'])
    .optional()
    .default('all'),
});

export type WaitlistData = z.infer<typeof waitlistSchema>;

/**
 * Booking/demo request schema
 * For scheduling calls and demos
 */
export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  company: z
    .string()
    .min(2, 'Company name required'),
  phone: z
    .string()
    .min(6, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  preferredTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Please select a valid time'),
  timezone: z
    .string()
    .default('Europe/Madrid'),
  product: z
    .enum(['aitlas', 'restaurantManager', 'tourManager', 'financeHub', 'not_sure']),
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

export type BookingData = z.infer<typeof bookingSchema>;

/**
 * Validation result type
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}

/**
 * Validate form data against schema
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  // Format errors as field: [messages]
  const errors: Record<string, string[]> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.') || 'root';
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(issue.message);
  });

  return {
    success: false,
    errors,
  };
}
