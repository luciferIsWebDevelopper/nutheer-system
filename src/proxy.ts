import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { routes } from "@/config/routes";

const protectedPrefixes = ["/dashboard", "/admin"];
const authRoutes = ["/login", "/register", "/forgot-password"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = await updateSession(request);

  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  const isAuthRoute = authRoutes.some((p) => pathname.startsWith(p));

  // When Supabase is not configured, allow browsing public pages only
  if (isProtected) {
    const hasSession = request.cookies
      .getAll()
      .some((c) => c.name.includes("auth-token") || c.name.includes("sb-"));

    if (!hasSession && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const loginUrl = new URL(routes.auth.login, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isAuthRoute) {
    const hasSession = request.cookies
      .getAll()
      .some((c) => c.name.includes("sb-"));

    if (hasSession) {
      return NextResponse.redirect(new URL(routes.dashboard.root, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
