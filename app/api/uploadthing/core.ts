import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  applicationDocuments: f({
    pdf:   { maxFileSize: "8MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1},
  }).onUploadComplete(async ({ file }) => {
    console.log("[UT] Upload complete:", file.url)
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter