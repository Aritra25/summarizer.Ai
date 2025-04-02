/* eslint-disable prettier/prettier */
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const OurFileRouter = {
  pdfUploader: f({
    pdf: { maxFileSize: "32MB" },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser();

      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload completed for user id", metadata.userId);
      console.log("file url", file.url);
      return {
        userId: metadata.userId,
        file: file.url,
        fileName: file.name,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter;
