"use client";

import { Download } from "lucide-react";
import { Button } from "../ui/button";

export function DownloadSummaryButton({
  fileName,
  summaryText,
  title,
  createdAt,
}: {
  fileName: string;
  summaryText: string;
  title: string;
  createdAt: string;
}) {
  const handleDownload = () => {
    const summaryContent = `# ${title}
        Generated Summary 
        Generated on: ${new Date(createdAt).toLocaleString()}
        
        ${summaryText}
        
        Original file: ${fileName}
        Generated by: Summarizerr`;

    const blob = new Blob([summaryContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Summary-${title?.replace(/[^a-zA-Z0-9]/g, "-")}.txt`;
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="h-8 px-3 text-rose-600  bg-rose-100 hover:text-rose-700 hover:bg-rose-50"
      onClick={handleDownload}
    >
      <Download className="w-4 h-4 mr-1" />
      <span>Download summary</span>
    </Button>
  );
}
