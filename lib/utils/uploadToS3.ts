import { createHash } from "crypto";
import fs from "fs";
import s3 from "../clients/s3";
import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

export async function uploadFromURLToS3({
  url,
}: {
  url: string;
}): Promise<string | null> {
  if (!url) return null;

  let resourceUrl: string | null = "";

  const fileBytes = url.startsWith("http")
    ? Buffer.from(await (await fetch(url)).arrayBuffer())
    : fs.readFileSync(url);

  const key = `images/${createHash("sha256").update(fileBytes).digest("hex")}`;

  await s3
    .send(
      new HeadObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
      })
    )
    .then((data) => {
      // console.log(data);
      resourceUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
    })
    .catch((error) => {
      // console.log(error);
      resourceUrl = null;
    });

  if (resourceUrl === null) {
    const ext = url.split(".").pop()?.toLowerCase() ?? "";
    const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
    await s3
      .send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key,
          Body: fileBytes,
          ContentType: contentType,
        })
      )
      .then((data) => {
        // console.log(data);
        resourceUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
      })
      .catch((error) => {
        // console.log(error);
        resourceUrl = null;
      });
  }

  return resourceUrl === "" ? null : resourceUrl;
}
