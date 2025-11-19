import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);

  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  const isProtected =
    pathname.startsWith("/latest") || pathname.startsWith("/profile");

  if (isAuthenticated && isPublic) {
    const redirectTo = req.nextUrl.clone();
    redirectTo.pathname = "/latest";
    return NextResponse.redirect(redirectTo);
  }

  if (!isAuthenticated && isProtected) {
    const redirectTo = req.nextUrl.clone();
    redirectTo.pathname = "/login";
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
