"use server";

import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearSession,
  createSessionToken,
  hashPassword,
  requireAdmin,
  requireUser,
  saveSession,
  verifyPassword,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { calculateBmi, calculateDailyWaterIntake, getStartOfDay, getWeekStart } from "@/lib/health";
import {
  adminUserSchema,
  loginSchema,
  logSchema,
  onboardingSchema,
  ratingSchema,
  registerSchema,
} from "@/lib/validators";

export type ActionState = {
  success: boolean;
  message: string;
};

function actionError(message: string): ActionState {
  return { success: false, message };
}

export async function registerAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Please check your registration details.");
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return actionError("An account with that email already exists.");
  }

  const shouldBeAdmin =
    parsed.data.email === process.env.ADMIN_EMAIL || (await db.user.count({ where: { role: "ADMIN" } })) === 0;

  const user = await db.user.create({
    data: {
      email: parsed.data.email,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      surname: parsed.data.surname,
      dateOfBirth: parsed.data.dateOfBirth,
      passwordHash: await hashPassword(parsed.data.password),
      role: shouldBeAdmin ? Role.ADMIN : Role.USER,
    },
  });

  const token = await createSessionToken(user);
  await saveSession(token);
  redirect(user.role === "ADMIN" ? "/admin/dashboard" : "/onboarding");
}

export async function loginAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Please enter a valid email and password.");
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return actionError("Invalid email or password.");
  }

  const token = await createSessionToken(user);
  await saveSession(token);
  redirect(user.role === "ADMIN" ? "/admin/dashboard" : user.onboarded ? "/dashboard" : "/onboarding");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}

export async function onboardingAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = onboardingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Please enter a valid height and weight.");
  }

  const bmi = calculateBmi(parsed.data.weightKg, parsed.data.heightCm);
  const dailyWaterLiters = calculateDailyWaterIntake(parsed.data.weightKg);

  await db.user.update({
    where: { id: user.id },
    data: {
      weightKg: parsed.data.weightKg,
      heightCm: parsed.data.heightCm,
      bmi,
      dailyWaterLiters,
      onboarded: true,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function addHealthLogAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = logSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Please enter valid tracking values.");
  }

  const date = getStartOfDay(parsed.data.date);
  const existing = await db.healthLog.findUnique({
    where: {
      userId_date: {
        userId: user.id,
        date,
      },
    },
  });

  await db.healthLog.upsert({
    where: {
      userId_date: {
        userId: user.id,
        date,
      },
    },
    create: {
      userId: user.id,
      date,
      steps: parsed.data.steps ?? 0,
      waterLiters: parsed.data.waterLiters ?? 0,
    },
    update: {
      steps: parsed.data.steps ?? existing?.steps ?? 0,
      waterLiters: parsed.data.waterLiters ?? existing?.waterLiters ?? 0,
    },
  });

  revalidatePath("/dashboard");
  return { success: true, message: "Daily log saved." };
}

export async function submitWeeklyRatingAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = ratingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Please enter a rating from 1 to 5.");
  }

  const weekStart = getWeekStart(new Date());
  await db.rating.upsert({
    where: {
      userId_weekStart: {
        userId: user.id,
        weekStart,
      },
    },
    create: {
      userId: user.id,
      weekStart,
      score: parsed.data.score,
      note: parsed.data.note || undefined,
    },
    update: {
      score: parsed.data.score,
      note: parsed.data.note || undefined,
    },
  });

  revalidatePath("/dashboard");
  return { success: true, message: "Weekly rating saved." };
}

export async function adminCreateUserAction(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = adminUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return actionError(parsed.error.issues[0]?.message ?? "Please check the new user details.");
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return actionError("That email is already in use.");
  }

  await db.user.create({
    data: {
      email: parsed.data.email,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      surname: parsed.data.surname,
      dateOfBirth: parsed.data.dateOfBirth,
      passwordHash: await hashPassword(parsed.data.password),
      role: parsed.data.role,
    },
  });

  revalidatePath("/users");
  revalidatePath("/dashboard");
  return { success: true, message: "User created successfully." };
}

export async function updateUserRoleAction(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");
  const role = String(formData.get("role") || "USER") as Role;
  if (!userId || !["USER", "ADMIN"].includes(role)) {
    return;
  }

  await db.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/users");
  revalidatePath("/dashboard");
}

export async function deleteUserAction(formData: FormData) {
  const admin = await requireAdmin();
  const userId = String(formData.get("userId") || "");
  if (!userId || userId === admin.id) {
    return;
  }

  await db.user.delete({
    where: { id: userId },
  });

  revalidatePath("/users");
  revalidatePath("/dashboard");
}
