"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function logout() {
    setSubmitting(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={submitting}
      className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 disabled:opacity-60"
    >
      {submitting ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
