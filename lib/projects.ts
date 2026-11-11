import { projects as fallbackProjects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/projects";
import { withoutCorporationMarker } from "@/lib/companyName";
import { fetchProjectsFromGoogleSheet } from "@/lib/googleSheetProjects";

function correctProjectName(name: string) {
  return name
    .replace(/\b(?:APCO|APOC|ACPO)[ /]+(?:PHD|PDH)(?=\/UTOS\b)/gi, "APOC PDH")
    .replace(/\bMeehanaol\b/gi, "Methanol")
    .replace(/\bFaclon\b/gi, "Falcon")
    .replace(/ph-1[,·]?\s*2공구/gi, "ph-1 · 2공구");
}

function correctClient(project: Project) {
  const client = withoutCorporationMarker(project.client);
  if (project.name.includes("금호폴리켐") && client.includes("포스코건설")) {
    return "포스코이앤씨";
  }
  return client;
}

function correctProjectNames(projectList: Project[]) {
  return projectList.map((project) => ({
    ...project,
    name: withoutCorporationMarker(correctProjectName(project.name)),
    client: correctClient(project),
  }));
}

export function computeProjectStats(projectList: Project[]) {
  return {
    total: projectList.length,
    화공: projectList.filter((p) => p.category === "화공").length,
    발전: projectList.filter((p) => p.category === "발전").length,
    LNG: projectList.filter((p) => p.category === "LNG").length,
    산업설비: projectList.filter((p) => p.category === "산업설비").length,
  };
}

export function groupProjects(
  projectList: Project[],
): Record<ProjectCategory, Project[]> {
  return {
    화공: projectList.filter((p) => p.category === "화공"),
    발전: projectList.filter((p) => p.category === "발전"),
    LNG: projectList.filter((p) => p.category === "LNG"),
    산업설비: projectList.filter((p) => p.category === "산업설비"),
  };
}

export async function getProjects(): Promise<Project[]> {
  const csvUrl = process.env.GOOGLE_SHEETS_PROJECTS_CSV_URL;

  if (!csvUrl) {
    return correctProjectNames(fallbackProjects);
  }

  try {
    const sheetProjects = await fetchProjectsFromGoogleSheet(csvUrl);
    if (sheetProjects.length === 0) {
      console.warn(
        "Google Sheet returned no valid projects; using local fallback.",
      );
      return correctProjectNames(fallbackProjects);
    }
    return correctProjectNames(sheetProjects);
  } catch (error) {
    console.error("Failed to load projects from Google Sheet:", error);
    return correctProjectNames(fallbackProjects);
  }
}

export async function getProjectsPageData() {
  const projectList = await getProjects();

  return {
    projects: projectList,
    groupedProjects: groupProjects(projectList),
    projectStats: computeProjectStats(projectList),
    source: process.env.GOOGLE_SHEETS_PROJECTS_CSV_URL ? "sheet" : "local",
  } as const;
}
