"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ nextPath = "/" }: { nextPath?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loginId: form.get("loginId"),
        password: form.get("password"),
      }),
    }).catch(() => null);

    if (!response?.ok) {
      const data = response ? await response.json().catch(() => null) : null;
      setError(data?.error ?? "로그인 중 오류가 발생했습니다.");
      setSubmitting(false);
      return;
    }

    const safeNext =
      nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
    router.replace(safeNext);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="loginId"
          className="mb-2 block text-sm font-semibold text-gray-200"
        >
          아이디
        </label>
        <input
          id="loginId"
          name="loginId"
          type="text"
          autoComplete="username"
          required
          maxLength={100}
          className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-brand-blue"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-gray-200"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={200}
          className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-brand-blue"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-red-300">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-brand-blue px-5 py-3 font-bold text-white transition hover:bg-brand-blue-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
