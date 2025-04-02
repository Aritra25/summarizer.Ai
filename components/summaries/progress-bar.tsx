import { cn } from "@/lib/utils";

export function ProgressBar({
  currentSection,
  sections,
}: {
  currentSection: number;
  sections: Array<{ title: string; points: string[] }>;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
      <div className="flex gap-1.5 px-4">
        {sections.map((section, index) => (
          <div
            className="h-1.5 flex-1 rounded-full overflow-hidden bg-rose-500/10"
            key={index}
          >
            <div
              className={cn(
                "h-full bg-linear-to-br from-gray-500 to-rose-600 transition-all duration-500",
                index === currentSection
                  ? "w-full"
                  : currentSection > index
                  ? "w-full opacity-10"
                  : "w-0"
              )}
              key={index}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
