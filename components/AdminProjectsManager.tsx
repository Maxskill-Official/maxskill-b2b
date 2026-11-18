"use client";

import { FormEvent, useState } from "react";
import {
  projectCategories,
  type AdminProject,
  type ProjectCategory,
} from "@/data/projects";

export default function AdminProjectsManager({
  initialProjects,
}: {
  initialProjects: AdminProject[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [filter, setFilter] = useState<ProjectCategory | "전체">("전체");
  const [formKey, setFormKey] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const visibleProjects =
    filter === "전체"
      ? projects
      : projects.filter((project) => project.category === filter);

  async function reload() {
    const response = await fetch("/api/admin/projects", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    setProjects(data.projects);
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
      name: String(form.get("name") ?? ""),
      client: String(form.get("client") ?? ""),
      category: String(form.get("category") ?? ""),
      year: Number(form.get("year") ?? 0),
      location: String(form.get("location") ?? ""),
      service: String(form.get("service") ?? ""),
      tool: String(form.get("tool") ?? ""),
      published: form.get("published") === "on",
    };

    const response = await fetch(
      editing ? `/api/admin/projects/${editing.id}` : "/api/admin/projects",
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

  async function remove(project: AdminProject) {
    if (!window.confirm(`'${project.name}' 수행실적을 삭제할까요?`)) return;

    const response = await fetch(`/api/admin/projects/${project.id}`, {
      method: "DELETE",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setMessage(data?.error ?? "삭제하지 못했습니다.");
      return;
    }

    await reload();
    if (editing?.id === project.id) resetForm();
    setMessage("삭제했습니다.");
  }

  function edit(project: AdminProject) {
    setEditing(project);
    setFormKey((value) => value + 1);
    setMessage("");
    requestAnimationFrame(() => {
      document.getElementById("project-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(28rem,0.75fr)]">
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">등록된 수행실적</h2>
            <p className="mt-1 text-sm text-gray-400">
              총 {projects.length}건
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["전체", ...projectCategories] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-lg px-3 py-2 text-xs font-bold ${
                  filter === category
                    ? "bg-brand-blue text-white"
                    : "border border-white/15 text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                resetForm();
                document.getElementById("project-form")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="rounded-lg bg-brand-tan px-4 py-2 text-xs font-bold text-black"
            >
              새 수행실적
            </button>
          </div>
        </div>

        <div className="mt-5 max-h-[70rem] space-y-3 overflow-y-auto pr-1">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-xl border border-white/10 bg-brand-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-white">{project.name}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {project.client} · {project.category} ·{" "}
                    {project.year || "-"} · {project.location}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-bold text-brand-tan">
                  {project.published ? "게시" : "비공개"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => edit(project)}
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => remove(project)}
                  className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-300"
                >
                  삭제
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="project-form"
        className="scroll-mt-28 rounded-2xl border border-white/10 bg-brand-card p-6 sm:p-8"
      >
        <h2 className="text-xl font-bold text-white">
          {editing ? "수행실적 수정" : "수행실적 추가"}
        </h2>
        <form key={formKey} onSubmit={submit} className="mt-6 space-y-5">
          {[
            ["name", "프로젝트명", editing?.name ?? ""],
            ["client", "발주처", editing?.client ?? ""],
            ["location", "지역", editing?.location ?? ""],
            ["service", "Service", editing?.service ?? ""],
            ["tool", "Tool", editing?.tool ?? ""],
          ].map(([name, label, value]) => (
            <label key={name} className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-200">
                {label}
              </span>
              <input
                name={name}
                required={name === "name" || name === "client" || name === "location"}
                maxLength={name === "name" ? 300 : 200}
                defaultValue={value}
                className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-white"
              />
            </label>
          ))}

          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold text-gray-200">
                분야
              </span>
              <select
                name="category"
                defaultValue={editing?.category ?? "화공"}
                className="w-full rounded-lg border border-white/15 bg-brand-dark px-4 py-3 text-white"
              >
                {projectCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="mb-2 block text-sm font-semibold text-gray-200">
                연도
              </span>
              <input
                name="year"
                type="number"
                min={0}
                max={2100}
                required
                defaultValue={editing?.year ?? new Date().getFullYear()}
                className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-white"
              />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold text-gray-200">
            <input
              name="published"
              type="checkbox"
              defaultChecked={editing?.published ?? true}
              className="h-4 w-4 accent-brand-blue"
            />
            홈페이지에 게시
          </label>

          {message && (
            <p className="rounded-lg bg-white/5 px-4 py-3 text-sm text-gray-200">
              {message}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-brand-blue px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
            >
              {submitting ? "저장 중..." : editing ? "수정 저장" : "추가"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white"
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
