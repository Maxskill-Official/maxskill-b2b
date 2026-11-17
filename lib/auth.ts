import "server-only";

import bcrypt from "bcryptjs";
import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import { cookies } from "next/headers";
import { getSql } from "@/lib/db";

export type UserRole = "employee" | "admin";

export interface SessionUser {
  id: number;
  loginId: string;
  name: string;
  role: UserRole;
}

interface SessionPayload {
  userId: number;
  loginId: string;
  name: string;
  role: UserRole;
}

export const SESSION_COOKIE_NAME = "maxskill_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const dummyPasswordHash = bcrypt.hashSync("maxskill-invalid-login", 12);

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({
    userId: user.id,
    loginId: user.loginId,
    name: user.name,
    role: user.role,
  } satisfies SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getAuthSecret(), {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.userId !== "number" ||
      typeof payload.loginId !== "string" ||
      typeof payload.name !== "string" ||
      (payload.role !== "employee" && payload.role !== "admin")
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      loginId: payload.loginId,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) return null;

  const sql = getSql();
  const rows = await sql<{
    id: string;
    login_id: string;
    name: string;
    role: UserRole;
  }[]>`
    SELECT id, login_id, name, role
    FROM users
    WHERE id = ${session.userId}
      AND active = TRUE
    LIMIT 1
  `;

  const user = rows[0];
  if (!user) return null;

  return {
    id: Number(user.id),
    loginId: user.login_id,
    name: user.name,
    role: user.role,
  };
}

export async function authenticateUser(
  loginId: string,
  password: string,
  attemptKey: string,
): Promise<SessionUser | null> {
  const sql = getSql();
  const attempts = await sql<{ blocked_until: Date | null }[]>`
    SELECT blocked_until
    FROM login_attempts
    WHERE attempt_key = ${attemptKey}
    LIMIT 1
  `;

  if (
    attempts[0]?.blocked_until &&
    attempts[0].blocked_until.getTime() > Date.now()
  ) {
    await bcrypt.compare(password, dummyPasswordHash);
    return null;
  }

  const rows = await sql<{
    id: string;
    login_id: string;
    name: string;
    password_hash: string;
    role: UserRole;
  }[]>`
    SELECT id, login_id, name, password_hash, role
    FROM users
    WHERE LOWER(login_id) = LOWER(${loginId})
      AND active = TRUE
    LIMIT 1
  `;

  const row = rows[0];
  const passwordMatches = await bcrypt.compare(
    password,
    row?.password_hash ?? dummyPasswordHash,
  );

  if (!row || !passwordMatches) {
    await sql`
      INSERT INTO login_attempts (
        attempt_key, failed_count, blocked_until, updated_at
      )
      VALUES (${attemptKey}, 1, NULL, NOW())
      ON CONFLICT (attempt_key) DO UPDATE SET
        failed_count = CASE
          WHEN login_attempts.updated_at < NOW() - INTERVAL '15 minutes'
            THEN 1
          ELSE login_attempts.failed_count + 1
        END,
        blocked_until = CASE
          WHEN (
            CASE
              WHEN login_attempts.updated_at < NOW() - INTERVAL '15 minutes'
                THEN 1
              ELSE login_attempts.failed_count + 1
            END
          ) >= 5
            THEN NOW() + INTERVAL '15 minutes'
          ELSE NULL
        END,
        updated_at = NOW()
    `;
    return null;
  }

  await sql`
    DELETE FROM login_attempts
    WHERE attempt_key = ${attemptKey}
  `;

  return {
    id: Number(row.id),
    loginId: row.login_id,
    name: row.name,
    role: row.role,
  };
}
