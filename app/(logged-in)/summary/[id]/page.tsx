import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { SourceInfo } from "@/components/summaries/source-info";
import { getSummaryById } from "@/components/summaries/summary";
import { SummaryHeader } from "@/components/summaries/summary-headers";
import { SummaryViewer } from "@/components/summaries/summary-viewer";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

interface Summary {
  id: string;
  user_id: string;
  title: string;
  summary_text: string;
  file_name: string;
  word_count: number;
  created_at: string;
  original_file_url: string;
  status: string;
  updated_at: string;
}

export default async function SummaryPage({ params }: any) {
  // Check if the 'id' exists
  const paramsId: string = params?.id;
  if (!paramsId) {
    return notFound();
  }

  // Fetch the summary by ID asynchronously
  const summary = await getSummaryById(paramsId);

  // If no summary is found, return 'notFound'
  if (!summary) {
    return notFound();
  }

  // Destructure the summary details
  const { word_count, title, created_at, file_name, summary_text, original_file_url } = summary as Summary;
  const reading_time = Math.ceil(word_count / 150); // Calculate reading time

  // Render the page content
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <MotionDiv className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-20">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <SummaryHeader
                title={title}
                createdAt={created_at}
                readingTime={reading_time}
              />
            </MotionDiv>

            {file_name && (
              <SourceInfo
                fileName={file_name}
                title={title}
                summaryText={summary_text}
                createdAt={created_at}
                orginalFileUrl={original_file_url}
              />
            )}

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mt-6 sm:mt-8 lg:mt-12"
            >
              <div className="relative p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg border border-rose-200/40 transition-all duration-300 hover:shadow-2xl hover:bg-white/95 mx-auto max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/60 via-orange-50/40 to-transparent opacity-50 rounded-2xl sm:rounded-3xl"></div>

                <div className="absolute top-2 right-2 z-10 flex items-center text-xs sm:text-sm font-medium text-gray-700 bg-white/90 px-2 py-1 rounded-lg shadow border border-gray-300">
                  <FileText className="h-4 w-4 text-rose-500 mr-1" />
                  {word_count?.toLocaleString()} words
                </div>

                <div className="relative z-10">
                  <div className="relative mt-6 sm:mt-8">
                    <SummaryViewer summary={summary_text} />
                  </div>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
