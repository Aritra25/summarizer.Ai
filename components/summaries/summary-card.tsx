/* eslint-disable prettier/prettier */

import Link from "next/link";
import DeleteButton from "./delete-button";
import { Card } from "../ui/card";
import { FileText } from "lucide-react";
import { cn, formatFieldName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { MotionDiv } from "../common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

// interface Summary {
//   id: string;
//   title: string | null;
//   created_at: string;
//   original_file_url: string;
//   summary_text: string;
//   status: string;
// }

const SummaryHeader = ({
  title,
  created_at,
  fileUrl,
}: {
  title: string | null;
  created_at: string;
  fileUrl: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 mt-1 text-rose-400" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || formatFieldName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">
          {/* {new Date(created_at).toLocaleDateString()} */}
          {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default function SummaryCard({ summary }: any) {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: {
          // type: 'spring',
          duration: 0.2,
          ease: "easeInOut",
        },
      }}
      className=""
    >
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary?.id} />
        </div>
        <Link href={`/summary/${summary?.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              title={summary?.title}
              created_at={summary?.created_at}
              fileUrl={summary?.original_file_url}
            />
            <p className="mt-2 text-sm text-gray-600 line-clamp-2 sm:text-base pl-2">
              {summary?.summary_text}
            </p>
            {/* <p className="text-sm text-gray-500">
            {summary?.}
        </p> */}
            <div className="flex items-center justify-between mt-2 sm:mt-4">
              {/* <span></span> */}
              <StatusBadge status={summary?.status} />
            </div>
          </div>
        </Link>
      </Card>
    </MotionDiv>
  );
}
