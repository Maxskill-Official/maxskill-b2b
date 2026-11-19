import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getCompanyMetrics,
  updateCompanyMetrics,
} from "@/lib/companyMetricsDb";
import { companyMetricsInputSchema } from "@/lib/companyMetricsSchema";

export const dynamic = "force-dynamic";
export const preferredRegion = "sin1";

export async function GET() {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  return NextResponse.json({ metrics: await getCompanyMetrics() });
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  const parsed = companyMetricsInputSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." },
      { status: 400 },
    );
  }

  try {
    await updateCompanyMetrics(parsed.data, user.id);
    revalidatePath("/about", "layout");
    return NextResponse.json({ metrics: parsed.data });
  } catch (error) {
    console.error("Failed to update company metrics:", error);
    return NextResponse.json(
      { error: "회사정보를 저장하지 못했습니다." },
      { status: 500 },
    );
  }
}
