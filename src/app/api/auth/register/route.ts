import { createSessionToken, hashPassword, saveSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload." }, { status: 400 });
  }

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) {
    return Response.json({ error: "Email already exists." }, { status: 409 });
  }

  const user = await db.user.create({
    data: {
      email: parsed.data.email,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      surname: parsed.data.surname,
      dateOfBirth: parsed.data.dateOfBirth,
      passwordHash: await hashPassword(parsed.data.password),
    },
  });

  const token = await createSessionToken(user);
  await saveSession(token);

  return Response.json({ user });
}
