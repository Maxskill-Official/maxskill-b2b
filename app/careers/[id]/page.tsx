import Link from "next/link";
import PageHero from "@/components/PageHero";
import { notFound } from "next/navigation";
import CareersBanner from "@/components/CareersBanner";
import JobPostingNotice from "@/components/JobPostingNotice";
import { getAdjacentJobPostings, getJobPosting, getJobPostings } from "@/lib/jobPostings";

export const revalidate = 300;

interface JobPostingPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const postings = await getJobPostings();
  return postings.map((posting) => ({ id: String(posting.id) }));
}

export async function generateMetadata({ params }: JobPostingPageProps) {
  const posting = await getJobPosting(Number(params.id));
  if (!posting) {
    return { title: "채용정보 | MAXSKILL" };
  }

  return {
    title: `${posting.title} | 채용정보 | MAXSKILL`,
    description: posting.duty ?? posting.content[0] ?? posting.title,
  };
}

export default async function JobPostingPage({ params }: JobPostingPageProps) {
  const postingId = Number(params.id);
  const [posting, postings] = await Promise.all([
    getJobPosting(postingId),
    getJobPostings(),
  ]);
  if (!posting) notFound();
  const { previous, next } = getAdjacentJobPostings(postings, posting.id);

  return (
    <main>
      <PageHero
        subtitle="Careers"
        title={posting.title}
        titleClassName="max-w-4xl break-keep"
      />

      <section className="section-container pb-16 pt-8 sm:pb-20 sm:pt-10">
        <CareersBanner />

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-brand-card sm:mt-12">
          <dl className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-3">
            <div className="bg-brand-card px-6 py-5">
              <dt className="text-sm font-bold text-brand-blue">공고일자</dt>
              <dd className="mt-2 text-sm text-gray-200">{posting.postedAt}</dd>
            </div>
            <div className="bg-brand-card px-6 py-5">
              <dt className="text-sm font-bold text-brand-blue">접수기간</dt>
              <dd className="mt-2 text-sm text-gray-200">{posting.period}</dd>
            </div>
            <div className="bg-brand-card px-6 py-5">
              <dt className="text-sm font-bold text-brand-blue">상태</dt>
              <dd className="mt-2">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                    posting.status === "진행중"
                      ? "bg-brand-blue/20 text-brand-blue"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {posting.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <article className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-brand-card p-6 sm:p-10">
          <JobPostingNotice posting={posting} />

          <div className="pt-4">
            <Link
              href="/careers"
              className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-gray-200 transition-colors hover:border-white/40"
            >
              목록으로
            </Link>
          </div>
        </article>

        <nav className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-brand-card">
          {previous && (
            <Link
              href={`/careers/${previous.id}`}
              className="flex items-center justify-between gap-4 border-b border-white/5 px-6 py-4 text-sm hover:bg-white/[0.03]"
            >
              <span className="text-gray-500">이전글</span>
              <span className="truncate text-gray-200">{previous.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/careers/${next.id}`}
              className="flex items-center justify-between gap-4 px-6 py-4 text-sm hover:bg-white/[0.03]"
            >
              <span className="text-gray-500">다음글</span>
              <span className="truncate text-gray-200">{next.title}</span>
            </Link>
          )}
        </nav>
      </section>
    </main>
  );
}
