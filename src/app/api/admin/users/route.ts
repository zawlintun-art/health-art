import { db } from "@/lib/db";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { adminUserSchema } from "@/lib/validators";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ users });
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const parsed = adminUserSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload." }, { status: 400 });
  }

  const createdUser = await db.user.create({
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

  return Response.json({ user: createdUser }, { status: 201 });
}
