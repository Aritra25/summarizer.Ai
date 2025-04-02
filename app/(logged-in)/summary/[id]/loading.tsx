import BgGradient from "@/components/common/bg-gradient";

export default function Loading() {
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-20">
            {/* Header Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Source Info Skeleton */}
            <div className="mt-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-rose-200/40">
              <div className="h-4 w-1/3 bg-gray-200 rounded-lg animate-pulse mb-4" />
              <div className="h-4 w-1/4 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Summary Content Skeleton */}
            <div className="relative mt-6 sm:mt-8 lg:mt-12">
              <div className="relative p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg border border-rose-200/40">
                {/* Word Count Skeleton */}
                <div className="absolute top-2 right-2 z-10 h-6 w-24 bg-gray-200 rounded-lg animate-pulse" />

                {/* Content Skeleton */}
                <div className="space-y-4 mt-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
