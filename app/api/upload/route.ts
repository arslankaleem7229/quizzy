import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import s3 from "@/lib/clients/s3";

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyApiAuth(request);
    if (!auth.authorized) return auth.response;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded!" }, { status: 400 });
    }

    const fileBytes = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomBytes(12).toString("hex")}.${fileExt}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: fileBytes,
      ContentType: file.type,
    });

    await s3.send(command);

    const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
