import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required.");
}

const root = process.cwd();
const sql = postgres(databaseUrl, { ssl: "require", max: 1 });

try {
  const schema = await readFile(path.join(root, "db", "schema.sql"), "utf8");
  await sql.unsafe(schema);

  const raw = await readFile(path.join(root, "data", "job-board.json"), "utf8");
  const postings = JSON.parse(raw);

  for (const posting of postings) {
    await sql`
      INSERT INTO job_postings (
        id, posted_at, title, period_start, period_end, status, content,
        hire_type, experience, education, field, duty, qualification,
        headcount, common_qualifications, process, apply_method, notes,
        contact_name, contact_dept, contact_phone, contact_email, published
      )
      VALUES (
        ${posting.id},
        ${posting.postedAt},
        ${posting.title},
        ${posting.periodStart || null},
        ${posting.periodEnd || null},
        ${posting.status},
        ${sql.json(posting.content ?? [])},
        ${posting.hireType || null},
        ${posting.experience || null},
        ${posting.education || null},
        ${posting.field || null},
        ${posting.duty || null},
        ${posting.qualification || null},
        ${posting.headcount || null},
        ${sql.json(posting.commonQualifications ?? [])},
        ${sql.json(posting.process ?? [])},
        ${sql.json(posting.applyMethod ?? [])},
        ${sql.json(posting.notes ?? [])},
        ${posting.contactName || null},
        ${posting.contactDept || null},
        ${posting.contactPhone || null},
        ${posting.contactEmail || null},
        TRUE
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }

  await sql`
    SELECT setval(
      pg_get_serial_sequence('job_postings', 'id'),
      COALESCE((SELECT MAX(id) FROM job_postings), 1),
      TRUE
    )
  `;

  console.log(`Database schema ready; ${postings.length} fallback postings checked.`);
} finally {
  await sql.end();
}
