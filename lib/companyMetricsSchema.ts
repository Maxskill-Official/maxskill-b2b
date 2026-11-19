import { z } from "zod";

export const companyMetricsInputSchema = z.object({
  revenue: z.string().trim().min(1, "매출을 입력해 주세요.").max(50),
  headcount: z.string().trim().min(1, "재직 인원을 입력해 주세요.").max(50),
});

export type CompanyMetricsInput = z.infer<typeof companyMetricsInputSchema>;
