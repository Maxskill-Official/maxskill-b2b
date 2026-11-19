"use client";

import { FormEvent, useState } from "react";
import type { CompanyMetrics } from "@/lib/companyMetricsDb";

export default function AdminCompanyMetrics({
  initialMetrics,
}: {
  initialMetrics: CompanyMetrics;
}) {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/company", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        revenue: String(form.get("revenue") ?? ""),
        headcount: String(form.get("headcount") ?? ""),
      }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setMessage(data?.error ?? "저장하지 못했습니다.");
      setSubmitting(false);
      return;
    }

    setMetrics(data.metrics);
    setMessage("저장했습니다.");
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-2xl rounded-2xl border border-white/10 bg-brand-card p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-white">매출</span>
          <input
            name="revenue"
            defaultValue={metrics.revenue}
            required
            maxLength={50}
            placeholder="예: 45억원"
            className="mt-2 w-full rounded-xl border border-white/15 bg-brand-dark px-4 py-3 text-white outline-none transition focus:border-brand-blue"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-white">재직 인원</span>
          <input
            name="headcount"
            defaultValue={metrics.headcount}
            required
            maxLength={50}
            placeholder="예: 60명"
            className="mt-2 w-full rounded-xl border border-white/15 bg-brand-dark px-4 py-3 text-white outline-none transition focus:border-brand-blue"
          />
        </label>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        입력한 문구가 회사소개 페이지에 그대로 표시됩니다.
      </p>
      {message && (
        <p
          className={`mt-4 text-sm ${
            message === "저장했습니다." ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "저장 중..." : "회사정보 저장"}
      </button>
    </form>
  );
}
