"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({
  compact = false,
  onLoggedOut,
}: {
  compact?: boolean;
  onLoggedOut?: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function logout() {
    setSubmitting(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    onLoggedOut?.();
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={submitting}
      className={
        compact
          ? "rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:border-white/50 hover:text-white disabled:opacity-60"
          : "rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 disabled:opacity-60"
      }
    >
      {submitting ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
