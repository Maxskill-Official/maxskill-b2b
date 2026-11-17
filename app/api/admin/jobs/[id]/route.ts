import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { jobPostingInputSchema } from "@/lib/jobPostingSchema";
import {
  deleteJobPosting,
  updateJobPosting,
} from "@/lib/jobPostingsDb";

export const preferredRegion = "sin1";

function parseId(value: string) {
  const id = Number.parseInt(value, 10);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "잘못된 공고 번호입니다." }, { status: 400 });
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
    const updated = await updateJobPosting(id, parsed.data, user.id);
    if (!updated) {
      return NextResponse.json({ error: "공고를 찾을 수 없습니다." }, { status: 404 });
    }
    revalidatePath("/careers", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update job posting:", error);
    return NextResponse.json(
      { error: "채용공고를 수정하지 못했습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "잘못된 공고 번호입니다." }, { status: 400 });
  }

  try {
    const deleted = await deleteJobPosting(id);
    if (!deleted) {
      return NextResponse.json({ error: "공고를 찾을 수 없습니다." }, { status: 404 });
    }
    revalidatePath("/careers", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete job posting:", error);
    return NextResponse.json(
      { error: "채용공고를 삭제하지 못했습니다." },
      { status: 500 },
    );
  }
}
