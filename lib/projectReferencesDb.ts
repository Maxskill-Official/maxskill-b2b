import type { AdminProject, Project, ProjectCategory } from "@/data/projects";
import { getSql } from "@/lib/db";
import type { ProjectReferenceInput } from "@/lib/projectReferenceSchema";

interface ProjectReferenceRow {
  id: string;
  name: string;
  client: string;
  category: ProjectCategory;
  project_year: number;
  location: string;
  service: string | null;
  tool: string | null;
  published: boolean;
}

function mapRow(row: ProjectReferenceRow): AdminProject {
  return {
    id: Number(row.id),
    name: row.name,
    client: row.client,
    category: row.category,
    year: row.project_year,
    location: row.location,
    service: row.service ?? undefined,
    tool: row.tool ?? undefined,
    published: row.published,
  };
}

const orderedSelect = `
  SELECT
    id, name, client, category, project_year, location, service, tool, published
  FROM project_references
`;

const orderBy = `
  ORDER BY
    CASE category
      WHEN '화공' THEN 1
      WHEN '발전' THEN 2
      WHEN 'LNG' THEN 3
      WHEN '산업설비' THEN 4
    END,
    project_year DESC,
    id DESC
`;

export async function getPublicProjectReferences(): Promise<Project[]> {
  const sql = getSql();
  const rows = await sql.unsafe<ProjectReferenceRow[]>(
    `${orderedSelect} WHERE published = TRUE ${orderBy}`,
  );
  return rows.map(mapRow);
}

export async function getAdminProjectReferences(): Promise<AdminProject[]> {
  const sql = getSql();
  const rows = await sql.unsafe<ProjectReferenceRow[]>(
    `${orderedSelect} ${orderBy}`,
  );
  return rows.map(mapRow);
}

export async function createProjectReference(
  input: ProjectReferenceInput,
  userId: number,
) {
  const sql = getSql();
  const rows = await sql<{ id: string }[]>`
    INSERT INTO project_references (
      name, client, category, project_year, location, service, tool,
      published, created_by, updated_by
    )
    VALUES (
      ${input.name},
      ${input.client},
      ${input.category},
      ${input.year},
      ${input.location},
      ${input.service || null},
      ${input.tool || null},
      ${input.published},
      ${userId},
      ${userId}
    )
    RETURNING id
  `;
  return Number(rows[0].id);
}

export async function updateProjectReference(
  id: number,
  input: ProjectReferenceInput,
  userId: number,
) {
  const sql = getSql();
  const rows = await sql<{ id: string }[]>`
    UPDATE project_references SET
      name = ${input.name},
      client = ${input.client},
      category = ${input.category},
      project_year = ${input.year},
      location = ${input.location},
      service = ${input.service || null},
      tool = ${input.tool || null},
      published = ${input.published},
      updated_by = ${userId},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}

export async function deleteProjectReference(id: number) {
  const sql = getSql();
  const rows = await sql<{ id: string }[]>`
    DELETE FROM project_references
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}
