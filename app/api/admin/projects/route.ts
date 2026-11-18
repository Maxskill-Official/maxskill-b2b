import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  createProjectReference,
  getAdminProjectReferences,
} from "@/lib/projectReferencesDb";
import { projectReferenceInputSchema } from "@/lib/projectReferenceSchema";

export const dynamic = "force-dynamic";
export const preferredRegion = "sin1";

export async function GET() {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
  }

  try {
    return NextResponse.json({
      projects: await getAdminProjectReferences(),
    });
  } catch (error) {
    console.error("Failed to load project references:", error);
    return NextResponse.json(
      { error: "수행실적을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
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
    const id = await createProjectReference(parsed.data, user.id);
    revalidatePath("/projects/list", "layout");
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project reference:", error);
    return NextResponse.json(
      { error: "수행실적을 등록하지 못했습니다." },
      { status: 500 },
    );
  }
}
