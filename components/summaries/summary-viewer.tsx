"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControls } from "./navigation-controls";
import { ProgressBar } from "./progress-bar";
import { MotionDiv } from "../common/motion-wrapper";
const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title?.startsWith("#")
    ? title.substring(1).trim()
    : title?.trim();
  const points: string[] = [];

  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith(".")) {
      if (currentPoint) {
        points.push(currentPoint.trim());
        currentPoint = trimmedLine;
      } else {
        currentPoint = trimmedLine;
      }
    } else {
      currentPoint += " " + trimmedLine;
    }
  });
  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ) as string[],
  };
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
};

export function SummaryViewer({ summary }: { summary: string }) {
  const sections = summary
    ?.split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  const [currentSection, setCurrentSection] = useState<number>(0);
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgressBar currentSection={currentSection} sections={sections} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-4 p-4"
        >
          <SectionTitle title={sections[currentSection]?.title || ""} />
          <ul className="list-disc list-inside">
            {sections[currentSection]?.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </MotionDiv>
      </div>
      {/* <CardContent>
        {JSON.stringify(sections[currentSection].points)} */}
      {/* <div className="flex items-center justify-center mx-4"> */}
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={() => setCurrentSection(currentSection - 1)}
        onNext={() => setCurrentSection(currentSection + 1)}
        onSectionChange={(index) => setCurrentSection(index)}
      />
      {/* </div> */}
      {/* </CardContent> */}
    </Card>
  );
}
