import Link from "next/link";
import PageHero from "@/components/PageHero";
import CareersBanner from "@/components/CareersBanner";
import JobPostingTable from "@/components/JobPostingTable";
import { getCurrentUser } from "@/lib/auth";
import { getJobPostings } from "@/lib/jobPostings";

export const revalidate = 300;

export default async function CareersPage() {
  const [postings, user] = await Promise.all([
    getJobPostings(),
    getCurrentUser().catch(() => null),
  ]);

  return (
    <main>
      <PageHero subtitle="Careers" title="채용정보" />

      <section className="section-container pb-16 pt-8 sm:pb-20 sm:pt-10">
        <CareersBanner />

        <div className="mt-10 flex items-center justify-between gap-4 sm:mt-12">
          <p className="text-sm text-gray-400">
            상세 내용은 해당 공고를 클릭하여 확인해 주세요.
          </p>
          {user?.role === "admin" && (
            <Link
              href="/admin/jobs#job-form"
              className="shrink-0 rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue-light"
            >
              공고 등록
            </Link>
          )}
        </div>

        <div className="mt-6">
          <JobPostingTable postings={postings} />
        </div>
      </section>
    </main>
  );
}
