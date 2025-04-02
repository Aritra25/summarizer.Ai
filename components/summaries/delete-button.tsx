"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummary } from "@/actions/summary-actions";
import { useToast } from "@/hooks/use-toast";
// delete button component

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const { showToast, toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    console.log("delete");
    // TODO: delete summary
    startTransition(async () => {
      const result = await deleteSummary({ summaryId });
      if (!result.success) {
        showToast(
          "Summary deleted",
          "Your summary has been deleted",
          "destructive"
        );
      }
      setOpen(false);
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100 px-8"
            onClick={() => setOpen(false)}
          >
            {/* <Trash2 className="w-4 h-4" /> */}
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            size={"icon"}
            className="bg-gray-900 hover:bg-gray-600 px-8"
            onClick={handleDelete}
          >
            {/* <Trash2 className="w-4 h-4" /> */}
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
