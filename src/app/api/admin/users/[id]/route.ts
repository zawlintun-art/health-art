import { Role } from "@prisma/client";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_: Request, context: RouteContext<"/api/admin/users/[id]">) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await context.params;
  const foundUser = await db.user.findUnique({ where: { id } });
  if (!foundUser) {
    return Response.json({ error: "User not found." }, { status: 404 });
  }
  return Response.json({ user: foundUser });
}

export async function PATCH(request: Request, context: RouteContext<"/api/admin/users/[id]">) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await context.params;
  const body = (await request.json()) as { role?: Role };

  if (!body.role || !["USER", "ADMIN"].includes(body.role)) {
    return Response.json({ error: "Invalid role." }, { status: 400 });
  }

  const updatedUser = await db.user.update({
    where: { id },
    data: { role: body.role },
  });

  return Response.json({ user: updatedUser });
}

export async function DELETE(_: Request, context: RouteContext<"/api/admin/users/[id]">) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await context.params;
  await db.user.delete({ where: { id } });
  return Response.json({ success: true });
}
