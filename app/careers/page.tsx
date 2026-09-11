import PageHero from "@/components/PageHero";
import CareersBanner from "@/components/CareersBanner";
import JobPostingTable from "@/components/JobPostingTable";
import { getJobPostings } from "@/lib/jobPostings";

export const revalidate = 300;

export default async function CareersPage() {
  const postings = await getJobPostings();

  return (
    <main>
      <PageHero subtitle="Careers" title="채용정보" />

      <section className="section-container pb-16 pt-8 sm:pb-20 sm:pt-10">
        <CareersBanner />

        <p className="mt-10 text-sm text-gray-400 sm:mt-12">
          상세 내용은 해당 공고를 클릭하여 확인해 주세요.
        </p>

        <div className="mt-6">
          <JobPostingTable postings={postings} />
        </div>
      </section>
    </main>
  );
}
