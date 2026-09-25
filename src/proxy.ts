import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { routing } from "@/i18n/routing";

const intl = createMiddleware(routing);

const proxy = auth((request) => {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api")) {
    return NextResponse.next();
  }

  if (path.startsWith("/admin")) {
    const isLogin = path === "/admin/login" || path.startsWith("/admin/login/");
    if (!request.auth?.user && !isLogin) {
      const login = request.nextUrl.clone();
      login.pathname = "/admin/login";
      login.searchParams.set("from", path);
      return NextResponse.redirect(login);
    }
    if (request.auth?.user && isLogin) {
      return NextResponse.redirect(new URL("/admin", request.nextUrl.origin));
    }
    return NextResponse.next();
  }

  return intl(request);
});

export default proxy;
export { proxy };

export const config = {
  matcher: ["/((?!_next|_vercel|images|logo.svg|favicon.ico|.*\\..*).*)"],
};
