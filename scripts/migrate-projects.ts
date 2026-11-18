import postgres from "postgres";
import { selectedProjects as fallbackProjects } from "../data/selectedProjects";
import { normalizeProjects } from "../lib/projects";

const databaseUrl = (() => {
  const value = process.env.DATABASE_URL?.trim();
  if (!value) throw new Error("DATABASE_URL is required.");
  return value;
})();

async function main() {
  const projects = normalizeProjects(fallbackProjects);
  const sql = postgres(databaseUrl, { ssl: "require", max: 1 });

  try {
    await sql.begin(async (tx) => {
      await tx`DELETE FROM project_references`;

      for (const project of projects) {
        await tx`
          INSERT INTO project_references (
            id, name, client, category, project_year, location,
            service, tool, published
          )
          VALUES (
            ${project.id},
            ${project.name},
            ${project.client},
            ${project.category},
            ${project.year},
            ${project.location},
            ${project.service || null},
            ${project.tool || null},
            TRUE
          )
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            client = EXCLUDED.client,
            category = EXCLUDED.category,
            project_year = EXCLUDED.project_year,
            location = EXCLUDED.location,
            service = EXCLUDED.service,
            tool = EXCLUDED.tool,
            published = TRUE,
            updated_at = NOW()
        `;
      }
    });

    await sql`
      SELECT setval(
        pg_get_serial_sequence('project_references', 'id'),
        COALESCE((SELECT MAX(id) FROM project_references), 1),
        TRUE
      )
    `;

    console.log(`Migrated ${projects.length} project references.`);
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
