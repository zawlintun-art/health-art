import { db } from "@/lib/db";
import { getMonthRange, getStartOfDay } from "@/lib/health";
import { getCurrentUser } from "@/lib/auth";
import { logSchema } from "@/lib/validators";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { start, end } = getMonthRange();
  const logs = await db.healthLog.findMany({
    where: { userId: user.id, date: { gte: start, lte: end } },
    orderBy: { date: "asc" },
  });

  return Response.json({ logs });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const parsed = logSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload." }, { status: 400 });
  }

  const date = getStartOfDay(parsed.data.date);
  const log = await db.healthLog.upsert({
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
      steps: parsed.data.steps ?? 0,
      waterLiters: parsed.data.waterLiters ?? 0,
    },
  });

  return Response.json({ log });
}
