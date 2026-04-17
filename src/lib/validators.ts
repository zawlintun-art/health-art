import { z } from "zod";

const numberFromForm = (message: string, min: number, max: number) =>
  z.coerce.number({ message }).min(min).max(max);

export const registerSchema = z
  .object({
    email: z.email(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    surname: z.string().min(2).max(50),
    dateOfBirth: z.coerce.date(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export const onboardingSchema = z.object({
  weightKg: numberFromForm("Weight is required.", 25, 400),
  heightCm: numberFromForm("Height is required.", 80, 260),
});

export const logSchema = z.object({
  date: z.coerce.date(),
  steps: z.coerce.number().int().min(0).max(150000).optional().default(0),
  waterLiters: z.coerce.number().min(0).max(20).optional().default(0),
});

export const ratingSchema = z.object({
  score: z.coerce.number().int().min(1).max(5),
  note: z.string().max(240).optional().default(""),
});

export const adminUserSchema = z.object({
  email: z.email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  surname: z.string().min(2).max(50),
  dateOfBirth: z.coerce.date(),
  password: z.string().min(8).max(100),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export const adminUserUpdateSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
  onboarded: z.coerce.boolean().optional(),
});

export const aiChatSchema = z.object({
  message: z.string().min(2).max(500),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type LogInput = z.infer<typeof logSchema>;
export type RatingInput = z.infer<typeof ratingSchema>;
