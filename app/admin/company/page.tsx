import Link from "next/link";
import { redirect } from "next/navigation";
import AdminCompanyMetrics from "@/components/AdminCompanyMetrics";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { getCompanyMetrics } from "@/lib/companyMetricsDb";

export const dynamic = "force-dynamic";
export const preferredRegion = "sin1";

export default async function AdminCompanyPage() {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") redirect("/login?next=/admin/company");

  const metrics = await getCompanyMetrics();

  return (
    <main className="section-container py-16 sm:py-20">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="page-subtitle">Company Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            회사정보 관리
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            관리자 {user.name}님으로 로그인했습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            회사소개 보기
          </Link>
          <Link
            href="/admin/jobs"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            채용공고 관리
          </Link>
          <Link
            href="/admin/projects"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            수행실적 관리
          </Link>
          <LogoutButton />
        </div>
      </div>
      <AdminCompanyMetrics initialMetrics={metrics} />
    </main>
  );
}
