
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  hasExistingBusiness: z.boolean().default(false),
  totalTokens: z.number().min(0).default(50),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export interface CreateUserModalProps {
  onUserCreated: () => void;
}
