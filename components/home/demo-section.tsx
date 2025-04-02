import { Pizza } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import { SummaryViewer } from "../summaries/summary-viewer";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(50% 0% 61% 35% 98% 35% 68% 57% 79% 91% 50% 70% 21% 91% 32% 57% 2% 35% 39% 35%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
        </div>
        <div className="text-center mb-16">
          <MotionH3
            initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
          >
            Watch how Summarize transforms{" "}
            <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
              this Next.js course PDF
            </span>{" "}
            into an easy-to-read summary!
          </MotionH3>
        </div>
      </div>
      <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
        {/* Summary Viewer */}
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SummaryViewer
            summary={`# Next.js Course Overview

This Next.js course covers the fundamentals of building modern web applications. Key topics include routing, data fetching, API routes, authentication, and deployment. Students will learn through hands-on projects and real-world examples.

# Key Points
. Introduction to Next.js and React fundamentals
. File-based routing and navigation
. Server-side rendering and static site generation
. Data fetching strategies and API integration
. Authentication and authorization
. Deployment and optimization techniques

# Action Items
. Set up development environment
. Complete course prerequisites
. Follow along with coding exercises
. Build final project application`}
          />
        </MotionDiv>
      </div>
    </section>
  );
}
