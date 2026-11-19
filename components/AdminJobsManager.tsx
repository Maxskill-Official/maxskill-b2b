"use client";

import { FormEvent, useState } from "react";
import type { AdminJobPosting } from "@/data/careers";

const singleFields = [
  ["hireType", "채용구분"],
  ["experience", "경력"],
  ["education", "학력"],
  ["field", "채용분야"],
  ["duty", "담당업무"],
  ["qualification", "자격요건"],
  ["headcount", "채용인원"],
  ["contactName", "담당자"],
  ["contactDept", "부서"],
  ["contactPhone", "문의전화"],
  ["contactEmail", "이메일"],
] as const;

const listFields = [
  ["content", "공고 내용"],
  ["commonQualifications", "공통자격"],
  ["process", "전형방법"],
  ["applyMethod", "접수방법"],
  ["notes", "기타사항"],
] as const;

function lines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function optionalValue(posting: AdminJobPosting | null, key: string) {
  return String(posting?.[key as keyof AdminJobPosting] ?? "");
}

export default function AdminJobsManager({
  initialPostings,
}: {
  initialPostings: AdminJobPosting[];
}) {
  const [postings, setPostings] = useState(initialPostings);
  const [editing, setEditing] = useState<AdminJobPosting | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function reload() {
    const response = await fetch("/api/admin/jobs", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    setPostings(data.postings);
  }

  function resetForm() {
    setEditing(null);
    setFormKey((value) => value + 1);
    setMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      postedAt: String(form.get("postedAt") ?? ""),
      title: String(form.get("title") ?? ""),
      periodStart: String(form.get("periodStart") ?? ""),
      periodEnd: String(form.get("periodEnd") ?? ""),
      status: String(form.get("status") ?? "진행중"),
      published: form.get("published") === "on",
      ...Object.fromEntries(
        singleFields.map(([key]) => [key, String(form.get(key) ?? "")]),
      ),
      ...Object.fromEntries(
        listFields.map(([key]) => [key, lines(form.get(key))]),
      ),
    };

    const response = await fetch(
      editing ? `/api/admin/jobs/${editing.id}` : "/api/admin/jobs",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setMessage(data?.error ?? "저장하지 못했습니다.");
      setSubmitting(false);
      return;
    }

    await reload();
    resetForm();
    setMessage("저장했습니다.");
    setSubmitting(false);
  }

  async function remove(posting: AdminJobPosting) {
    if (!window.confirm(`'${posting.title}' 공고를 삭제할까요?`)) return;
    setMessage("");
    const response = await fetch(`/api/admin/jobs/${posting.id}`, {
      method: "DELETE",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setMessage(data?.error ?? "삭제하지 못했습니다.");
      return;
    }
    await reload();
    if (editing?.id === posting.id) resetForm();
    setMessage("삭제했습니다.");
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(32rem,1.15fr)]">
      <section>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">등록된 공고</h2>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-bold text-white"
          >
            새 공고
          </button>
        </div>
        <div className="mt-5 space-y-3">
          {postings.map((posting) => (
            <article
              key={posting.id}
              className="rounded-xl border border-white/10 bg-brand-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-white">{posting.title}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {posting.postedAt} · {posting.published ? "게시" : "비공개"}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-brand-tan">
                  {posting.status}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(posting);
                    setFormKey((value) => value + 1);
                    setMessage("");
                  }}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => remove(posting)}
                  className="rounded-lg border border-red-400/30 px-3 py-1.5 text-sm text-red-300"
                >
                  삭제
                </button>
              </div>
            </article>
          ))}
          {postings.length === 0 && (
            <p className="rounded-xl border border-white/10 p-5 text-gray-400">
              등록된 공고가 없습니다.
            </p>
          )}
        </div>
      </section>

      <section
        id="job-form"
        className="scroll-mt-28 rounded-2xl border border-white/10 bg-brand-card p-6 sm:p-8"
      >
        <h2 className="text-xl font-bold text-white">
          {editing ? "채용공고 수정" : "채용공고 등록"}
        </h2>
        <form key={formKey} onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-200">
              제목
            </label>
            <input
              name="title"
              required
              maxLength={200}
              defaultValue={editing?.title ?? ""}
              className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-white"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm font-semibold text-gray-200">
              공고일
              <input
                name="postedAt"
                type="text"
                inputMode="numeric"
                placeholder="YYYY-MM-DD"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                maxLength={10}
                title="YYYY-MM-DD 형식으로 입력해 주세요."
                required
                defaultValue={editing?.postedAt ?? today}
                className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-white"
              />
            </label>
            <label className="text-sm font-semibold text-gray-200">
              접수 시작
              <input
                name="periodStart"
                type="text"
                inputMode="numeric"
                placeholder="YYYY-MM-DD"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                maxLength={10}
                title="YYYY-MM-DD 형식으로 입력해 주세요."
                defaultValue={editing?.periodStart ?? ""}
                className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-white"
              />
            </label>
            <label className="text-sm font-semibold text-gray-200">
              접수 종료
              <input
                name="periodEnd"
                type="text"
                inputMode="numeric"
                placeholder="YYYY-MM-DD"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                maxLength={10}
                title="YYYY-MM-DD 형식으로 입력해 주세요."
                defaultValue={editing?.periodEnd ?? ""}
                className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-white"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-gray-200">
              상태
              <select
                name="status"
                defaultValue={editing?.status ?? "진행중"}
                className="mt-2 w-full rounded-lg border border-white/15 bg-brand-card px-3 py-2.5 text-white"
              >
                <option>진행중</option>
                <option>마감</option>
              </select>
            </label>
            <label className="flex items-end gap-3 pb-2 text-sm font-semibold text-gray-200">
              <input
                name="published"
                type="checkbox"
                defaultChecked={editing?.published ?? true}
                className="h-5 w-5"
              />
              홈페이지에 게시
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {singleFields.map(([key, label]) => (
              <label key={key} className="text-sm font-semibold text-gray-200">
                {label}
                <input
                  name={key}
                  type={key === "contactEmail" ? "email" : "text"}
                  defaultValue={optionalValue(editing, key)}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-white"
                />
              </label>
            ))}
          </div>

          {listFields.map(([key, label]) => (
            <label key={key} className="block text-sm font-semibold text-gray-200">
              {label} <span className="font-normal text-gray-500">(한 줄에 한 항목)</span>
              <textarea
                name={key}
                rows={key === "content" ? 4 : 3}
                defaultValue={
                  (editing?.[key as keyof AdminJobPosting] as string[] | undefined)?.join(
                    "\n",
                  ) ?? ""
                }
                className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-white"
              />
            </label>
          ))}

          {message && (
            <p role="status" className="text-sm font-semibold text-brand-tan">
              {message}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-brand-blue px-6 py-3 font-bold text-white disabled:opacity-60"
            >
              {submitting ? "저장 중..." : editing ? "수정 저장" : "공고 등록"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white"
              >
                취소
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
