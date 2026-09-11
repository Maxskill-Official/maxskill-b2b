import PageHero from "@/components/PageHero";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { getProjectsPageData } from "@/lib/projects";

export const revalidate = 300;

export const metadata = {
  title: "수행실적 | MAXSKILL",
  description:
    "최근 10년간 화공, 발전, LNG, 산업설비 분야에서 수행한 프로젝트 목록입니다.",
};

export default async function ProjectsListPage() {
  const { groupedProjects, projectStats } = await getProjectsPageData();

  return (
    <main>
      <PageHero subtitle="Project References" title="수행실적" extraBlurs />

      <section className="section-container-wide pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="page-subtitle">Project List</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              프로젝트 목록
            </h2>
          </div>
          <p className="text-sm font-medium text-gray-400">
            Total {projectStats.total} Projects
          </p>
        </div>

        <ProjectsPageContent groupedProjects={groupedProjects} />
      </section>
    </main>
  );
}
