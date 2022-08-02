// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_TOKEN_COOKIE } from "./constants";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get(SESSION_TOKEN_COOKIE);
  if (!sessionToken) {
    if (req.nextUrl.pathname.startsWith("/tasks")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.error();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/task/:path*", "/tasks"],
};
