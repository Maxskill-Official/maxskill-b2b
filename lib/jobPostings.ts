import type { JobPosting } from "@/data/careers";
import { hasDatabaseConfig } from "@/lib/db";
import { fetchJobPostingsFromGoogleSheet } from "@/lib/googleSheetJobPostings";
import {
  getFallbackJobPostings,
  readLocalJobPostings,
} from "@/lib/jobBoardStore";
import { getPublicJobPostingsFromDb } from "@/lib/jobPostingsDb";

export async function getJobPostings(): Promise<JobPosting[]> {
  if (hasDatabaseConfig()) {
    try {
      return await getPublicJobPostingsFromDb();
    } catch (error) {
      console.error("Failed to load job postings from database:", error);
    }
  }

  const csvUrl = process.env.GOOGLE_SHEETS_CAREERS_CSV_URL;

  if (csvUrl) {
    try {
      const sheetPostings = await fetchJobPostingsFromGoogleSheet(csvUrl);
      if (sheetPostings.length > 0) {
        return sheetPostings;
      }
      console.warn(
        "Google Sheet returned no valid job postings; using local board.",
      );
    } catch (error) {
      console.error("Failed to load job postings from Google Sheet:", error);
    }
  }

  try {
    return await readLocalJobPostings();
  } catch {
    return getFallbackJobPostings();
  }
}

export async function getJobPosting(id: number): Promise<JobPosting | undefined> {
  const postings = await getJobPostings();
  return postings.find((posting) => posting.id === id);
}

export function getAdjacentJobPostings(
  postings: JobPosting[],
  id: number,
) {
  const index = postings.findIndex((posting) => posting.id === id);
  return {
    previous: index > 0 ? postings[index - 1] : undefined,
    next: index >= 0 && index < postings.length - 1 ? postings[index + 1] : undefined,
  };
}
