import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { DownloadSummaryButton } from "./download-summary-button";

export function SourceInfo({
  fileName,
  orginalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string;
  orginalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="w-4 h-4 text-rose-400" />
        <span> Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button variant={"ghost"} size={"sm"} className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50" asChild>
          <a href={orginalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            <span>View original</span>
          </a>
        </Button>
        <DownloadSummaryButton
          fileName={fileName}
          summaryText={summaryText}
          title={title}
          createdAt={createdAt}
        />
      </div>
    </div>
  )
}
