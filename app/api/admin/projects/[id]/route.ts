import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  deleteProjectReference,
  updateProjectReference,
} from "@/lib/projectReferencesDb";
import { projectReferenceInputSchema } from "@/lib/projectReferenceSchema";

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
    return NextResponse.json(
      { error: "잘못된 수행실적 번호입니다." },
      { status: 400 },
    );
  }

  const parsed = projectReferenceInputSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." },
      { status: 400 },
    );
  }

  try {
    const updated = await updateProjectReference(id, parsed.data, user.id);
    if (!updated) {
      return NextResponse.json(
        { error: "수행실적을 찾을 수 없습니다." },
        { status: 404 },
      );
    }
    revalidatePath("/projects/list", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update project reference:", error);
    return NextResponse.json(
      { error: "수행실적을 수정하지 못했습니다." },
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
    return NextResponse.json(
      { error: "잘못된 수행실적 번호입니다." },
      { status: 400 },
    );
  }

  try {
    const deleted = await deleteProjectReference(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "수행실적을 찾을 수 없습니다." },
        { status: 404 },
      );
    }
    revalidatePath("/projects/list", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete project reference:", error);
    return NextResponse.json(
      { error: "수행실적을 삭제하지 못했습니다." },
      { status: 500 },
    );
  }
}
