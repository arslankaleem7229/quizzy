// middleware.ts
import { NextResponse } from "next/server";

import { NextRequestWithAuth } from "next-auth/middleware";
import { verifyJWT } from "./lib/auth";

export async function middleware(req: NextRequestWithAuth) {
  const url = req.nextUrl;
  console.log(url.pathname);

  const token = req.cookies.get("token")?.value || null;

  let user = null;

  if (token) {
    try {
      user = await verifyJWT(token);
    } catch {
      user = null;
    }
  }

  // if (url.pathname === "/login") {
  //   url.pathname = "/";
  //   url.searchParams.set("auth", "login");
  //   return NextResponse.redirect(url);
  // }

  // if (url.pathname === "/signup") {
  //   url.pathname = "/";
  //   url.searchParams.set("auth", "signup");
  //   return NextResponse.redirect(url);
  // }

  const isPublic =
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/signup") ||
    url.pathname.startsWith("/");

  const isProtected =
    url.pathname.startsWith("/latest") || url.pathname.startsWith("/profile");

  if (user && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/latest";
    return NextResponse.redirect(url);
  }

  if (!user && isProtected) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/latest/:path*", "/profile/:path*", "/login", "/signup", "/"],
};
