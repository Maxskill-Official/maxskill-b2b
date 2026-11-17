import Link from "next/link";
import { redirect } from "next/navigation";
import AdminJobsManager from "@/components/AdminJobsManager";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { getAdminJobPostings } from "@/lib/jobPostingsDb";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") redirect("/login?next=/admin/jobs");

  const postings = await getAdminJobPostings();

  return (
    <main className="section-container py-16 sm:py-20">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="page-subtitle">Recruitment Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            채용공고 관리
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            관리자 {user.name}님으로 로그인했습니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/careers"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            채용 페이지 보기
          </Link>
          <LogoutButton />
        </div>
      </div>
      <AdminJobsManager initialPostings={postings} />
    </main>
  );
}
