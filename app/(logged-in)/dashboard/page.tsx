import BgGradient from "@/components/common/bg-gradient";
import {
  MotionH1,
  // ListVariants,
  MotionP,
  MotionDiv,
} from "@/components/common/motion-wrapper";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries, getUserUploadCount } from "@/lib/summaries";
import { itemVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // const uploadLimit = 5;
  const user = await currentUser();
  const userId = user?.id;
  if (!user) {
    return redirect("/sign-in");
  }
  const summaries = await getSummaries(userId!);
  //   console.log(summaries)
  const { hasReachedLimit, uploadLimit } = await getUserUploadCount(userId!);


  
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col container gap-4 mx-auto">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <MotionH1
                variants={itemVariants}
                className="text-4xl font-bold text-center tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
              >
                Your Summaries
              </MotionH1>
              <MotionP
                className="text-center text-gray-600"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                Transform your PDFs into concise summaries with our AI-powered
                tool.
              </MotionP>
            </div>
            {!hasReachedLimit && (
              <MotionDiv
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="self-start"
              >
                <Button
                  variant={"link"}
                  className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800
            hover:scale-105 transition-all duration-300 ease-in-out hover:no-underline group
            "
                >
                  <Link
                    href={"/upload"}
                    className="flex items-center text-white"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    New Summary
                  </Link>
                </Button>
              </MotionDiv>
            )}
          </div>
          {hasReachedLimit && (
            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <div className="border border-rose-200 bg-rose-50 rounded-lg p-4 text-rose-800">
                <div className="text-sm">
                  You've reached the limit of {uploadLimit} upoads on the basic
                  plan.
                </div>
                <Link
                  href={"/#pricing"}
                  className="text-rose-800 underline font-medium underline-offset-4"
                >
                  Click here to upgrade Pro{" "}
                  <ArrowRight className="w-4 h-4 ml-1 inline-block" /> for
                  unlimited uploads.
                </Link>
              </div>
            </MotionDiv>
          )}
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {[...Array(summaries?.length)].map((_, index) => (
                <SummaryCard key={index} summary={summaries[index]} />
              ))}
            </div>
          )}
        </div>
      </MotionDiv>
    </main>
  );
}
