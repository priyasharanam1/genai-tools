import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { authConfig } from "./config/auth/server-config";
import { clientConfig } from "./config/auth/client-config";

const PUBLIC_PATHS = ["/register", "/login", "/reset-password"];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/auth/login",
    logoutPath: "/api/auth/logout",
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,

    handleValidToken: async ({ token, decodedToken }, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info("Missing or malformed credentials", { reason });

      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/((?!$|api|_next/static|_next/image|favicon.ico|auth|public|images|genai|project/[^/]+?/chat$).*)", // does not run authentication middleware on these routes
    "/api/auth/login",
    "/api/auth/logout",
  ],
};
