import { db } from "@/lib/db";
import { getWeekStart } from "@/lib/health";
import { getCurrentUser } from "@/lib/auth";
import { ratingSchema } from "@/lib/validators";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ratings = await db.rating.findMany({
    where: { userId: user.id },
    orderBy: { weekStart: "desc" },
  });
  return Response.json({ ratings });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const parsed = ratingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload." }, { status: 400 });
  }

  const rating = await db.rating.upsert({
    where: {
      userId_weekStart: {
        userId: user.id,
        weekStart: getWeekStart(new Date()),
      },
    },
    create: {
      userId: user.id,
      weekStart: getWeekStart(new Date()),
      score: parsed.data.score,
      note: parsed.data.note || undefined,
    },
    update: {
      score: parsed.data.score,
      note: parsed.data.note || undefined,
    },
  });

  return Response.json({ rating });
}
