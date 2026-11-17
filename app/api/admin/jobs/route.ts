import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { jobPostingInputSchema } from "@/lib/jobPostingSchema";
import {
  createJobPosting,
  getAdminJobPostings,
} from "@/lib/jobPostingsDb";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  try {
    return NextResponse.json({ postings: await getAdminJobPostings() });
  } catch (error) {
    console.error("Failed to load admin job postings:", error);
    return NextResponse.json(
      { error: "채용공고를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  const parsed = jobPostingInputSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." },
      { status: 400 },
    );
  }

  try {
    const id = await createJobPosting(parsed.data, user.id);
    revalidatePath("/careers", "layout");
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create job posting:", error);
    return NextResponse.json(
      { error: "채용공고를 등록하지 못했습니다." },
      { status: 500 },
    );
  }
}
