import PageHero from "@/components/PageHero";
import BusinessAreasContent from "@/components/BusinessAreasContent";
import { businessAreas, pickFeaturedProjects } from "@/data/businessAreas";
import { getProjects } from "@/lib/projects";

export const revalidate = 300;

export const metadata = {
  title: "사업분야 | MAXSKILL",
  description:
    "화공, 발전, Gas/LNG, 산업설비 분야의 배관 설계 엔지니어링 서비스를 제공합니다.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const areas = businessAreas.map((area) => ({
    ...area,
    featured: pickFeaturedProjects(projects, area),
  }));

  return (
    <main>
      <PageHero
        subtitle="Business Areas"
        title="사업분야"
        extraBlurs
      />

      <BusinessAreasContent areas={areas} />
    </main>
  );
}
