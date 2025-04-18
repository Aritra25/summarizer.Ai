import { getDBConnection } from "@/lib/db";

export async function getSummaries(userId: string) {
  try {
    const sql = await getDBConnection();
    const summaries = await sql`SELECT * FROM pdf_summaries WHERE user_id=${userId}`;
    return summaries;
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return [];
  }
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();
    const [summary] =
      await sql`SELECT id, user_id, title, original_file_url, summary_text, created_at, updated_at, status, file_name, 
      LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 AS word_count 
      FROM pdf_summaries WHERE id=${id}
      `;
    return summary;
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return [];
  }
}
