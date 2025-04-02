import { Sparkles } from "lucide-react";
import BgGradient from "./bg-gradient";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center text-center gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-rose-500">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Premium Feature
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
              Subscription Required
            </h1>
            <p className="text-lg text-gray-600 leading-8 border-2 border-rose-200 bg-white/50 backdrop-blur-xs p-6 rounded-lg border-dashed">
              Upgrade to a paid plan to access all features and benefits.
            </p>
            <Button
              asChild
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white"
            >
              <Link href={"/#pricing"}>Upgrade Now</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* <h1>Upgrade Required</h1> */}
    </div>
  );
}
