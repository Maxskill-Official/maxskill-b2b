import type {
  AdminJobPosting,
  JobPosting,
  JobPostingStatus,
} from "@/data/careers";
import { getSql } from "@/lib/db";
import type { JobPostingInput } from "@/lib/jobPostingSchema";
import { resolveJobStatus } from "@/lib/googleSheetJobPostings";

interface JobPostingRow {
  id: string;
  posted_at: string | Date;
  title: string;
  period_start: string | Date | null;
  period_end: string | Date | null;
  status: JobPostingStatus;
  content: unknown;
  hire_type: string | null;
  experience: string | null;
  education: string | null;
  field: string | null;
  duty: string | null;
  qualification: string | null;
  headcount: string | null;
  common_qualifications: unknown;
  process: unknown;
  apply_method: unknown;
  notes: unknown;
  contact_name: string | null;
  contact_dept: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  published: boolean;
}

function dateText(value: string | Date | null) {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function mapRow(row: JobPostingRow): AdminJobPosting {
  const periodStart = dateText(row.period_start);
  const periodEnd = dateText(row.period_end);
  const period =
    periodStart || periodEnd
      ? `${(periodStart ?? "-").replace(/-/g, ".")} ~ ${(periodEnd ?? "-").replace(/-/g, ".")}`
      : "-";

  return {
    id: Number(row.id),
    postedAt: dateText(row.posted_at) ?? "",
    title: row.title,
    period,
    periodStart,
    periodEnd,
    status: resolveJobStatus(row.status, periodEnd),
    content: stringList(row.content),
    hireType: row.hire_type ?? undefined,
    experience: row.experience ?? undefined,
    education: row.education ?? undefined,
    field: row.field ?? undefined,
    duty: row.duty ?? undefined,
    qualification: row.qualification ?? undefined,
    headcount: row.headcount ?? undefined,
    commonQualifications: stringList(row.common_qualifications),
    process: stringList(row.process),
    applyMethod: stringList(row.apply_method),
    notes: stringList(row.notes),
    contactName: row.contact_name ?? undefined,
    contactDept: row.contact_dept ?? undefined,
    contactPhone: row.contact_phone ?? undefined,
    contactEmail: row.contact_email ?? undefined,
    published: row.published,
  };
}

const selectColumns = `
  id, posted_at, title, period_start, period_end, status, content,
  hire_type, experience, education, field, duty, qualification, headcount,
  common_qualifications, process, apply_method, notes, contact_name,
  contact_dept, contact_phone, contact_email, published
`;

export async function getPublicJobPostingsFromDb(): Promise<JobPosting[]> {
  const sql = getSql();
  const rows = await sql.unsafe<JobPostingRow[]>(
    `SELECT ${selectColumns}
     FROM job_postings
     WHERE published = TRUE
     ORDER BY posted_at DESC, id DESC`,
  );
  return rows.map(mapRow);
}

export async function getAdminJobPostings(): Promise<AdminJobPosting[]> {
  const sql = getSql();
  const rows = await sql.unsafe<JobPostingRow[]>(
    `SELECT ${selectColumns}
     FROM job_postings
     ORDER BY posted_at DESC, id DESC`,
  );
  return rows.map(mapRow);
}

export async function createJobPosting(
  input: JobPostingInput,
  userId: number,
) {
  const sql = getSql();
  const rows = await sql<{ id: string }[]>`
    INSERT INTO job_postings (
      posted_at, title, period_start, period_end, status, content,
      hire_type, experience, education, field, duty, qualification,
      headcount, common_qualifications, process, apply_method, notes,
      contact_name, contact_dept, contact_phone, contact_email, published,
      created_by, updated_by
    )
    VALUES (
      ${input.postedAt},
      ${input.title},
      ${input.periodStart || null},
      ${input.periodEnd || null},
      ${input.status},
      ${sql.json(input.content)},
      ${input.hireType || null},
      ${input.experience || null},
      ${input.education || null},
      ${input.field || null},
      ${input.duty || null},
      ${input.qualification || null},
      ${input.headcount || null},
      ${sql.json(input.commonQualifications)},
      ${sql.json(input.process)},
      ${sql.json(input.applyMethod)},
      ${sql.json(input.notes)},
      ${input.contactName || null},
      ${input.contactDept || null},
      ${input.contactPhone || null},
      ${input.contactEmail || null},
      ${input.published},
      ${userId},
      ${userId}
    )
    RETURNING id
  `;
  return Number(rows[0].id);
}

export async function updateJobPosting(
  id: number,
  input: JobPostingInput,
  userId: number,
) {
  const sql = getSql();
  const rows = await sql<{ id: string }[]>`
    UPDATE job_postings SET
      posted_at = ${input.postedAt},
      title = ${input.title},
      period_start = ${input.periodStart || null},
      period_end = ${input.periodEnd || null},
      status = ${input.status},
      content = ${sql.json(input.content)},
      hire_type = ${input.hireType || null},
      experience = ${input.experience || null},
      education = ${input.education || null},
      field = ${input.field || null},
      duty = ${input.duty || null},
      qualification = ${input.qualification || null},
      headcount = ${input.headcount || null},
      common_qualifications = ${sql.json(input.commonQualifications)},
      process = ${sql.json(input.process)},
      apply_method = ${sql.json(input.applyMethod)},
      notes = ${sql.json(input.notes)},
      contact_name = ${input.contactName || null},
      contact_dept = ${input.contactDept || null},
      contact_phone = ${input.contactPhone || null},
      contact_email = ${input.contactEmail || null},
      published = ${input.published},
      updated_by = ${userId},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}

export async function deleteJobPosting(id: number) {
  const sql = getSql();
  const rows = await sql<{ id: string }[]>`
    DELETE FROM job_postings
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}
