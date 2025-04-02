"use server";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPDFText } from "@/lib/langchain";
import { generateSummaryFromOenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { getDBConnection } from "@/lib/db";
import { formatFieldNameAsTitle } from "@/utils/formt-utils";
import { revalidatePath } from "next/cache" ;

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePDFSummary(
  uploadResponse: {
    name: string;
    url: string;
    serverData: {
      userId: string;
      file: string;
    };
  }[]
) {
  console.log(uploadResponse, "uploadResponse");
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: "No file was uploaded",
      data: null,
    };
  }

  const { name: fileName, url: pdfUrl } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File URL is missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPDFText(pdfUrl);
    console.log("PDF text extracted successfully");
    console.log({ pdfText }, "pdfText");
    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log("Summary generated successfully");
      console.log({ summary });
    } catch (error: any) {
      console.error("Error generating summary:", error);

      // Try OpenAI as fallback if Gemini rate limit is exceeded
      if (error instanceof Error && error?.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromOenAI(pdfText);
        } catch (openaiError) {
          console.error("Error generating summary with OpenAI:", openaiError);
          throw new Error(
            "Failed to generate summary with available providers"
          );
        }
      } else {
        throw error;
      }
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFieldName = formatFieldNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFieldName,
        summary,
      },
    };
  } catch (error) {
    console.error("Error processing PDF:", error);
    return {
      success: false,
      message: "Failed to process PDF file",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDBConnection();
    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name)
      VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING id, summary_text
    `;
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw error;
  }
}

export async function storedPdfSummaryAction({
  fileName,
  fileUrl,
  summary,
  title,
}: PdfSummaryType) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }
    revalidatePath(`/summary/${savedSummary.id}`);

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: {
        id: savedSummary.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  // reavailable our cache
}
