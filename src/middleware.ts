// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const SESSION_TOKEN_COOKIE = "next-auth.session-token";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken) {
    return NextResponse.error();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/task/:path*", "/tasks"],
};
