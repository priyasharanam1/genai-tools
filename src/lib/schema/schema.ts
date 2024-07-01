import { z } from 'zod';

export const BookFreeDemoFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),

  message: z.string().min(6, 'Message must be atleast 6 Characters.'),
});

export const GenAiFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  name: z.string().min(1, 'Name is required'),
  industry: z.string().min(1, 'Industry is required'),
  mainpoints: z.string().min(1, 'Required'),
  job_role: z.string().min(1, 'Required'),
  job_responsibilities: z.string().min(1, 'Required'),
  painpoints: z.string().min(1, 'Required'),
});
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const ContactUsFormSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  workEmail: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  mobile: z
    .string()
    .min(1, 'Mobile is required')
    .regex(phoneRegex, 'Please enter a valid mobile number'),
  companyName: z.string().min(1, 'Company Name is required'),
  message: z.string().min(1, 'Message is required'),
});
