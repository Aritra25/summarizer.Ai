import { getDBConnection } from "./db";

export const getSummaries = async (userId: string) => {
  const sql = await getDBConnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
};

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();
    const [summary] = await sql`SELECT 
    id,
    user_id,
    title,
    summary_text,
    original_file_url,
    status,
    created_at,
    updated_at,
    file_name,
    LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
    FROM pdf_summaries
    WHERE id = ${id}
    `;
    return summary;
  } catch (error) {
    console.error("Error fetching summary by id:", error);
    return null;
  }
}

export async function getUserUploadCount(userId: string) {
    const sql = await getDBConnection();
    try {
        const result = await sql`
        SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
        return result[0]?.count;
    } catch (error) {
        console.error('Error fetching user upload count:', error);
        return 0;
    }
}