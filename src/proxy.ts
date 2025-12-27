import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);

  const isPublic = pathname === "/" || pathname.startsWith("/auth");

  const isProtected = !isPublic;

  if (isAuthenticated && isPublic) {
    const redirectTo = req.nextUrl.clone();
    redirectTo.pathname = "/latest";
    return NextResponse.redirect(redirectTo);
  }

  if (!isAuthenticated && isProtected) {
    const redirectTo = req.nextUrl.clone();
    redirectTo.pathname = "/auth";
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // THIS FUCKING LINE WASTE my 5 FUCKING HOURS FUCK - learn more
    // "/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|robots.txt|sitemap.xml).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
