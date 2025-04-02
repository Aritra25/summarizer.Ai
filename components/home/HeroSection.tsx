import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const ButtonVariants = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
    // duration: 0.8,
  },
};

const HeroSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20 lg:py-28 max-w-7xl mx-auto"
    >
      <MotionDiv variants={itemVariants} className="flex justify-center mb-4">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative overflow-hidden p-[1px] rounded-full bg-white group-hover:bg-gray-50 transition-colors duration-200 px-6 py-2 flex items-center"
          >
            <Sparkles className="w-6 h-6 mr-2 animate-pulse text-rose-600" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </MotionDiv>

      <MotionH1
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
      >
        Transform PDFs into{" "}
        <span className="relative inline-block">
          <MotionSpan
            whileHover={ButtonVariants}
            className="relative z-10 px-2"
          >
            concise
          </MotionSpan>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8"
      >
        Get a beautiful summary reel of the document in seconds
      </MotionH2>

      <MotionDiv variants={itemVariants} whileHover={ButtonVariants}>
        <Button className="text-white text-base mt-6 sm:text-lg lg:text-xl rounded-full bg-gradient-to-r from-rose-500 to-rose-800 hover:from-rose-600 hover:to-rose-900 transition-all duration-300">
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span className="text-white">Try Summary</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
};

export default HeroSection;
