import { NextRequest, NextResponse } from "next/server";

const publicPath = ["/login", "/signup", "/verifyEmail"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPath.includes(path);
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/verifyEmail", "/profile"],
};
