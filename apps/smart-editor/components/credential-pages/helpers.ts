import type { RegisterOptions } from 'react-hook-form';
import { z } from 'zod';

export const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(16, 'Password must be at most 16 characters long')
  .refine((data) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;
    return regex.test(data);
  }, 'Password must contain at least one uppercase letter, one number and one special character');

export const SignupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: PasswordSchema,
});

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ResetPasswordFormSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;
export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type SignupFormData = z.infer<typeof SignupFormSchema>;

export const passwordInputValidator: RegisterOptions = {
  required: 'Password is required',
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/,
    message:
      'Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character',
  },
};

export const emailnputValidator: RegisterOptions = {
  required: 'Email is required',
  pattern: {
    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Email address must be a valid address',
  },
};
