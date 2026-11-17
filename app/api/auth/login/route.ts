import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  authenticateUser,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";

export const runtime = "nodejs";
export const preferredRegion = "sin1";

const loginSchema = z.object({
  loginId: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

export async function POST(request: NextRequest) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const attemptKey = createHash("sha256")
    .update(`${ip}:${parsed.data.loginId.toLowerCase()}`)
    .digest("hex");

  try {
    const user = await authenticateUser(
      parsed.data.loginId,
      parsed.data.password,
      attemptKey,
    );

    if (!user) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 },
      );
    }

    const token = await createSessionToken(user);
    const response = NextResponse.json({
      user: { name: user.name, role: user.role },
    });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json(
      { error: "로그인 서비스를 사용할 수 없습니다." },
      { status: 503 },
    );
  }
}
