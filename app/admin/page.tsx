import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const adminMenus = [
  {
    href: "/admin/company",
    title: "회사정보 관리",
  },
  {
    href: "/admin/jobs",
    title: "채용공고 관리",
  },
  {
    href: "/admin/projects",
    title: "수행실적 관리",
  },
];

export default async function AdminPage() {
  const user = await getCurrentUser().catch(() => null);
  if (user?.role !== "admin") redirect("/login?next=/admin");

  return (
    <main className="section-container py-16 sm:py-20">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="page-subtitle">Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            관리자 홈
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            관리자 {user.name}님으로 로그인했습니다.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {adminMenus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="rounded-2xl border border-white/10 bg-brand-card p-6 transition hover:-translate-y-1 hover:border-brand-blue"
          >
            <h2 className="text-xl font-bold text-white">{menu.title}</h2>
            <span className="mt-6 inline-block text-sm font-bold text-brand-blue-light">
              바로가기 →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
