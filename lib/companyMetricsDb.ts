import { companyInfo } from "@/data/company";
import { getSql, hasDatabaseConfig } from "@/lib/db";
import type { CompanyMetricsInput } from "@/lib/companyMetricsSchema";

export interface CompanyMetrics {
  revenue: string;
  headcount: string;
}

const fallbackMetrics: CompanyMetrics = {
  revenue: companyInfo.revenue,
  headcount: companyInfo.headcount,
};

export async function getCompanyMetrics(): Promise<CompanyMetrics> {
  if (!hasDatabaseConfig()) return fallbackMetrics;

  try {
    const sql = getSql();
    const rows = await sql<CompanyMetrics[]>`
      SELECT revenue, headcount
      FROM company_metrics
      WHERE id = 1
    `;
    return rows[0] ?? fallbackMetrics;
  } catch (error) {
    console.error("Failed to load company metrics:", error);
    return fallbackMetrics;
  }
}

export async function updateCompanyMetrics(
  input: CompanyMetricsInput,
  userId: number,
) {
  const sql = getSql();
  await sql`
    INSERT INTO company_metrics (id, revenue, headcount, updated_by, updated_at)
    VALUES (1, ${input.revenue}, ${input.headcount}, ${userId}, NOW())
    ON CONFLICT (id) DO UPDATE SET
      revenue = EXCLUDED.revenue,
      headcount = EXCLUDED.headcount,
      updated_by = EXCLUDED.updated_by,
      updated_at = NOW()
  `;
}
