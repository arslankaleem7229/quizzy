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

  const fileBytes = url.startsWith("http")
    ? Buffer.from(await (await fetch(url)).arrayBuffer())
    : fs.readFileSync(url);

  const ext = url.split(".").pop()?.toLowerCase() ?? "";
  const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";

  return uploadBytesToS3({
    bytes: fileBytes,
    contentType,
    bucketType: "images",
  });
}

async function uploadBytesToS3({
  bytes,
  contentType,
  bucketType,
}: {
  bytes: Buffer;
  contentType: string;
  bucketType: "images" | "user-images";
}): Promise<string | null> {
  if (!bytes.length) return null;

  const key = `${bucketType}/${createHash("sha256")
    .update(bytes)
    .digest("hex")}`;
  const bucket = process.env.S3_BUCKET_NAME!;
  const region = process.env.S3_REGION;
  const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
    return publicUrl;
  } catch (error) {
    // object not found, will upload
  }

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: bytes,
        ContentType: contentType,
      })
    );
    return publicUrl;
  } catch (error) {
    return null;
  }
}

export async function uploadFileToS3({
  file,
  bucketType,
}: {
  file: File;
  bucketType: "images" | "user-images";
}): Promise<string | null> {
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const contentType =
      file.type || CONTENT_TYPES[ext] || "application/octet-stream";

    // Deduplicated upload: use a hash key and return existing URL if present
    return uploadBytesToS3({ bytes, contentType, bucketType });
  } catch (error) {
    console.error("uploadFileToS3 failed", error);
    return null;
  }
}
