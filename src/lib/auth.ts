import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

type Role = "USER" | "ADMIN";

const SESSION_COOKIE = "health_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

type SessionPayload = {
  sub: string;
  role: Role;
  email: string;
  name: string;
};

function getAuthSecret() {
  return encoder.encode(process.env.AUTH_SECRET || "local-health-secret");
}

export async function hashPassword(value: string) {
  return bcrypt.hash(value, 10);
}

export async function verifyPassword(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}

export async function createSessionToken(user: Pick<User, "id" | "email" | "firstName" | "lastName" | "role">) {
  return new SignJWT({
    role: user.role,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getAuthSecret());
}

export async function saveSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.sub) return null;

  return db.user.findUnique({
    where: { id: session.sub },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}

export async function requireOnboardedUser() {
  const user = await requireUser();
  if (!user.onboarded) {
    redirect("/onboarding");
  }
  return user;
}

export async function redirectIfAuthenticated() {
  const user = await getCurrentUser();
  if (!user) return;
  redirect(user.role === "ADMIN" ? "/admin/dashboard" : user.onboarded ? "/dashboard" : "/onboarding");
}
