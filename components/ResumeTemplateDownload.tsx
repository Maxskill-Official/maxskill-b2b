import {
  resumeTemplateDownloadName,
  resumeTemplateHref,
} from "@/data/careers";

interface ResumeTemplateDownloadProps {
  bordered?: boolean;
}

export default function ResumeTemplateDownload({
  bordered = false,
}: ResumeTemplateDownloadProps) {
  return (
    <div
      className={
        bordered
          ? "border-t border-dashed border-white/15 py-5 last:pb-0"
          : "rounded-2xl border border-white/10 px-5 py-6 sm:px-7"
      }
    >
      <p className="font-bold text-white">이력서 양식 다운로드</p>
      <a
        href={resumeTemplateHref}
        download={resumeTemplateDownloadName}
        className="mt-3 inline-flex text-sm font-semibold text-brand-blue hover:underline"
      >
        이력서 양식 다운로드
      </a>
    </div>
  );
}
