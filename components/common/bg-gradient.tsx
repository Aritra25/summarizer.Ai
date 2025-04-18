import { cn } from "@/lib/utils";

export default function BgGradient({
  // children,
  className,
}: {
  // children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative isolate`}>
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30">
        <div
          className={cn("relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]",className)}
          style={{
            clipPath:
              "polygon(50% 0% 61% 35% 98% 35% 68% 57% 79% 91% 50% 70% 21% 91% 32% 57% 2% 35% 39% 35%)",
          }}
        />
      </div>
      {/* {children} */}
    </div>
  );
}
