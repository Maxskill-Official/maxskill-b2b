import type { JobPosting } from "@/data/careers";
import ResumeTemplateDownload from "@/components/ResumeTemplateDownload";

function InfoTable({
  rows,
}: {
  rows: { label: string; value?: string }[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <tbody>
          {rows.map((pair, rowIndex) => (
            <tr key={rowIndex} className="border-b border-white/5 last:border-b-0">
              {pair.map((cell) => (
                <td
                  key={cell.label}
                  className="w-1/4 border-r border-white/5 px-4 py-3 align-top last:border-r-0 sm:px-5"
                >
                  <p className="font-bold text-brand-blue">{cell.label}</p>
                  <p className="mt-1 break-keep text-gray-200">{cell.value || "-"}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OutlineSection({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) return null;

  return (
    <div className="border-t border-dashed border-white/15 py-5 first:border-t-0 first:pt-0 last:pb-0">
      <p className="font-bold text-white">{title}</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="body-copy text-sm text-gray-300">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JobPostingNotice({ posting }: { posting: JobPosting }) {
  const hasNotice =
    posting.hireType ||
    posting.field ||
    posting.commonQualifications?.length ||
    posting.process?.length;

  if (!hasNotice) {
    return (
      <div className="space-y-5">
        {posting.content.length > 0 ? (
          posting.content.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="body-copy text-base text-gray-300"
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="body-copy text-base text-gray-400">
            상세 내용은 이메일로 문의해 주시기 바랍니다.
          </p>
        )}
        <ResumeTemplateDownload />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <InfoTable
        rows={[
          [
            { label: "지원", value: posting.experience },
            { label: "학력", value: posting.education },
          ],
          [
            { label: "접수기간", value: posting.period },
            { label: "채용구분", value: posting.hireType },
          ],
        ]}
      />

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {["채용분야", "담당업무", "자격요건", "채용인원"].map((label) => (
                <th
                  key={label}
                  className="px-4 py-3 text-left font-bold text-brand-blue sm:px-5"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r border-white/5 px-4 py-4 align-top text-gray-200 sm:px-5">
                {posting.field || "-"}
              </td>
              <td className="border-r border-white/5 px-4 py-4 align-top text-gray-200 sm:px-5">
                {posting.duty || "-"}
              </td>
              <td className="border-r border-white/5 px-4 py-4 align-top text-gray-200 sm:px-5">
                {posting.qualification || "-"}
              </td>
              <td className="px-4 py-4 align-top text-gray-200 sm:px-5">
                {posting.headcount || "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 px-5 py-6 sm:px-7">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-brand-blue">
          모집요강
        </p>
        <OutlineSection title="공통자격" items={posting.commonQualifications} />
        <OutlineSection title="전형방법" items={posting.process} />
        <OutlineSection title="접수방법" items={posting.applyMethod} />
        <ResumeTemplateDownload bordered />
      </div>

      <InfoTable
        rows={[
          [
            { label: "담당자", value: posting.contactName },
            { label: "부서", value: posting.contactDept },
          ],
          [
            { label: "문의전화", value: posting.contactPhone },
            { label: "E-Mail", value: posting.contactEmail },
          ],
        ]}
      />
    </div>
  );
}
