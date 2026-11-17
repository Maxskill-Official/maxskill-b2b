import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const user = await getCurrentUser().catch(() => null);

  return (
    <main className="section-container flex min-h-[calc(100dvh-6rem)] items-center justify-center py-20">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-brand-card p-7 shadow-2xl sm:p-9">
        <p className="page-subtitle">Employee Login</p>
        <h1 className="mt-3 text-3xl font-bold text-white">직원 로그인</h1>

        {user ? (
          <div className="mt-8">
            <p className="text-lg font-semibold text-white">
              {[user.name, user.position].filter(Boolean).join(" ")}님,
              로그인되어 있습니다.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              권한: {user.role === "admin" ? "관리자" : "일반 사원"}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {user.role === "admin" && (
                <Link
                  href="/admin/jobs"
                  className="rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue-light"
                >
                  채용공고 관리
                </Link>
              )}
              <LogoutButton />
            </div>
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              교통비 관리에서 사용하는 아이디와 비밀번호를 입력해 주세요.
            </p>
            <LoginForm nextPath={searchParams?.next} />
          </>
        )}
      </section>
    </main>
  );
}
