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
