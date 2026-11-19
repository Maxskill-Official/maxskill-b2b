import Link from "next/link";
import { redirect } from "next/navigation";
import AdminProjectsManager from "@/components/AdminProjectsManager";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { getAdminProjectReferences } from "@/lib/projectReferencesDb";

export const dynamic = "force-dynamic";
export const preferredRegion = "sin1";

export default async function AdminProjectsPage() {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") redirect("/login?next=/admin/projects");

  const projects = await getAdminProjectReferences();

  return (
    <main className="section-container-wide py-16 sm:py-20">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="page-subtitle">Project References Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            수행실적 관리
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            관리자 {user.name}님으로 로그인했습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/company"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            회사정보 관리
          </Link>
          <Link
            href="/projects/list"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            수행실적 보기
          </Link>
          <Link
            href="/admin/jobs"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            채용공고 관리
          </Link>
          <LogoutButton />
        </div>
      </div>
      <AdminProjectsManager initialProjects={projects} />
    </main>
  );
}
