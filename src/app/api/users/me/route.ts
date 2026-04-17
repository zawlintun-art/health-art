import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { calculateBmi, calculateDailyWaterIntake } from "@/lib/health";
import { onboardingSchema } from "@/lib/validators";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ user });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload." }, { status: 400 });
  }

  const updated = await db.user.update({
    where: { id: user.id },
    data: {
      weightKg: parsed.data.weightKg,
      heightCm: parsed.data.heightCm,
      bmi: calculateBmi(parsed.data.weightKg, parsed.data.heightCm),
      dailyWaterLiters: calculateDailyWaterIntake(parsed.data.weightKg),
    },
  });

  return Response.json({ user: updated });
}
