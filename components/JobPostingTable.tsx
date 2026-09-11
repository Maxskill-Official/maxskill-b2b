"use client";

import { useRouter } from "next/navigation";
import type { JobPosting } from "@/data/careers";

interface JobPostingTableProps {
  postings: JobPosting[];
}

export default function JobPostingTable({ postings }: JobPostingTableProps) {
  const router = useRouter();

  if (postings.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-brand-card px-6 py-16 text-center text-sm text-gray-400">
        현재 등록된 채용 공고가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              {[
                { label: "번호", accent: "text-brand-blue" },
                { label: "공고일자", accent: "text-brand-blue" },
                { label: "채용공고", accent: "text-brand-tan" },
                { label: "접수기간", accent: "text-brand-blue" },
                { label: "상태", accent: "text-brand-blue" },
              ].map((col) => (
                <th
                  key={col.label}
                  className={`px-5 py-4 text-left text-sm font-extrabold sm:px-6 sm:text-base ${col.accent}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {postings.map((posting, index) => (
              <tr
                key={posting.id}
                tabIndex={0}
                onClick={() => router.push(`/careers/${posting.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    router.push(`/careers/${posting.id}`);
                  }
                }}
                className={`cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.03] ${
                  index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                }`}
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-400 sm:px-6">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300 sm:px-6">
                  {posting.postedAt}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-white sm:px-6">
                  {posting.title}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300 sm:px-6">
                  {posting.period}
                </td>
                <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                      posting.status === "진행중"
                        ? "bg-brand-blue/20 text-brand-blue"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {posting.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
