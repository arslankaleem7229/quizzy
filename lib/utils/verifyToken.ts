import { NextRequest, NextResponse } from "next/server";
import { getToken, type JWT } from "next-auth/jwt";

type VerifyApiAuthSuccess = {
  authorized: true;
  token: JWT;
  source: "bearer" | "session";
};

type VerifyApiAuthFailure = {
  authorized: false;
  response: NextResponse;
};

export async function verifyApiAuth(
  req: NextRequest
): Promise<VerifyApiAuthSuccess | VerifyApiAuthFailure> {
  try {
    const header = req.headers.get("authorization");
    const bearerMatch = header?.match(/^Bearer\s+(.+)$/i);

    console.log(header);

    if (header && !bearerMatch) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: "Unauthorized: Invalid authorization" },
          { status: 401 }
        ),
      };
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
    });

    if (!token) {
      const message = bearerMatch
        ? "Unauthorized: Invalid or expired token"
        : "Unauthorized: Sign in required";

      return {
        authorized: false,
        response: NextResponse.json({ error: message }, { status: 401 }),
      };
    }

    return {
      authorized: true,
      token,
      source: bearerMatch ? "bearer" : "session",
    };
  } catch (err) {
    console.error("Auth validation error:", err);
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized: Token verification failed" },
        { status: 401 }
      ),
    };
  }
}
