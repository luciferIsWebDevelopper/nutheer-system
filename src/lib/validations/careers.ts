import { z } from "zod";

export const jobApplicationSchema = z.object({
  jobId: z.string().uuid("Invalid job"),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  coverLetter: z.string().max(5000).optional(),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;
