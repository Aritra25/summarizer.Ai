/* eslint-disable prettier/prettier */
"use client";
import { useUploadThing } from "@/utils/uploadThing";
import { UploadFormInput } from "./upload-form-input";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Toast from "@/components/ui/toast";
import {
  generatePDFSummary,
  storedPdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";
// import {} from ""

const schema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const { toast, showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      // console.log("Upload successful! File details:", {
      //   name: res[0].name,
      //   size: res[0].size,
      //   type: res[0].type,
      //   url: res[0].url,
      // });
      showToast(
        "Upload successful!",
        "Your file has been uploaded successfully."
      );
    },
    onUploadError: (error: Error) => {
      showToast("Upload failed!", error.message, "destructive");
    },
    onUploadBegin: (data) => {
      console.log("Uploading...", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        const errorMessage =
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid File";
        showToast("Validation Error", errorMessage, "destructive");
        return;
      }
      console.log(file);
      showToast(
        "Uploading...",
        "Please wait while we upload your file...",
        "default"
      );
      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        showToast("Upload failed!", "Failed to start upload", "destructive");
        return;
      }
      showToast(
        "Processing PDF...",
        "Please wait while we process your file...",
        "default"
      );
      const uploadFileUrl = uploadResponse[0].serverData.file;
      const summary = await generatePDFSummary(uploadResponse);
      console.log(summary, "summary");

      const { success, message = null, data = null } = summary || {};

      if (!success) {
        showToast("Error", summary?.message, "destructive");
        setIsLoading(false);
        return;
      }

      if (data) {
        let storedResult: any;
        showToast(
          "Success!",
          "Your PDF has been summarized successfully.",
          "default"
        );
        setIsLoading(false);
        // Reset the form and file input
        const fileInput = formRef.current?.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
        formRef.current?.reset();
        if (summary) {
          //save the summary to the base
          storedResult = await storedPdfSummaryAction({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name,
          });
          // Reset again after saving
          if (fileInput) {
            fileInput.value = "";
          }
          formRef.current?.reset();
          showToast(
            "Summary saved",
            "Your summary has been saved successfully.",
            "default"
          );
          router.push(`/summary/${storedResult.data.id}`);
          // todo: redirect to the {id} summary page
        }
      }

      // console.log("Summary:", data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      formRef.current?.reset();
      // showToast("Error", error.message, "destructive");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>
      <UploadFormInput
        onSubmit={handleSubmit}
        ref={formRef}
        isLoading={isLoading}
      />
      <Toast
        title={toast.title}
        description={toast.description}
        variant={toast.variant}
        isVisible={toast.isVisible}
        onClose={() => showToast("", "", "default")}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing...
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
