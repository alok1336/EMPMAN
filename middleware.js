import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  if (path.startsWith("/user")) {
    if (!req.cookies.get("user")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (path.startsWith("/admin")) {
    if (!req.cookies.get("admin")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
