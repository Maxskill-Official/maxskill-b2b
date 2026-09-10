import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { getProjectsPageData } from "@/lib/projects";

export const revalidate = 300;

export const metadata = {
  title: "프로젝트 리스트 | MAXSKILL",
  description:
    "최근 10년간 화공, 발전, LNG, 산업설비 분야에서 수행한 프로젝트 목록입니다.",
};

export default async function ProjectsListPage() {
  const { groupedProjects, projectStats, source } = await getProjectsPageData();

  return (
    <main>
      <PageHero subtitle="Projects" title="프로젝트 리스트" extraBlurs />

      <section className="section-container-wide py-16 sm:py-20 lg:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="page-subtitle">Project List</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              프로젝트 목록
            </h2>
            <Link
              href="/projects"
              className="mt-3 inline-block text-sm font-medium text-brand-blue hover:text-brand-blue-dark"
            >
              사업분야로
            </Link>
          </div>
          <p className="text-sm font-medium text-gray-400">
            Total {projectStats.total} Projects
            {source === "sheet" && (
              <span className="ml-2 text-brand-blue">Google Sheet 연동</span>
            )}
          </p>
        </div>

        <ProjectsPageContent groupedProjects={groupedProjects} />
      </section>
    </main>
  );
}
