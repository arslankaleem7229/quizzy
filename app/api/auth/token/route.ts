import { NextRequest, NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { verifyApiAuth } from "@/lib/utils/verifyToken";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const signedToken = await encode({
    token: auth.token,
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({
    token: signedToken,
    source: auth.source,
    claims: auth.token,
  });
}
