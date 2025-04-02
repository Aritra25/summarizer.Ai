import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<
  HTMLFormElement,
  UploadFormInputProps
>(({ onSubmit, isLoading }, ref) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
          disabled={isLoading}
        />
        <Button type="submit" className="bg-rose-500 hover:bg-rose-600">
          Upload your PDF
        </Button>
      </div>
    </form>
  );
});

// export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {

// }

UploadFormInput.displayName = "UploadFormInput";
