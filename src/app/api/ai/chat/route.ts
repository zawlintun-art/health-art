import { getCurrentUser } from "@/lib/auth";
import { buildAssistantReply } from "@/lib/ai/assistant";
import { aiChatSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = aiChatSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid message." }, { status: 400 });
  }

  const reply = buildAssistantReply(parsed.data.message, {
    name: `${user.firstName} ${user.lastName}`.trim(),
    bmi: user.bmi,
    dailyWaterLiters: user.dailyWaterLiters,
  });

  return Response.json({ reply });
}
