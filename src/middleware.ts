import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to decode JWT
const decodeJWT = (token: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }
  const payloadBase64 = parts[1];
  const payloadJson = JSON.parse(decodeURIComponent(atob(payloadBase64)));
  return payloadJson;
};

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("user_token")?.value;
  const quizToken = req.cookies.get("quiz_token")?.value;
  const url = req.nextUrl;

  // 1. Redirect to login if no accessToken and not accessing /auth routes
  if (!accessToken && !url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 2. Redirect to belajar if no quizToken or accessToken, and trying to access quiz routes
  if (!quizToken || !accessToken) {
    if (url.pathname.includes("/quiz")) {
      return NextResponse.redirect(new URL("/mulai-belajar", req.url));
    }
  }

  // 3. Handle both quizToken and accessToken, ensuring they belong to the same user
  if (quizToken && accessToken) {
    if (url.pathname.includes("/quiz")) {
      try {
        const accessPayload = decodeJWT(accessToken);
        const quizPayload = decodeJWT(quizToken);

        const userEmail = accessPayload.email;
        const quizEmail = quizPayload.email;

        // If emails do not match, redirect to belajar
        if (userEmail !== quizEmail) {
          return NextResponse.redirect(new URL("/mulai-belajar", req.url));
        }

        const response = NextResponse.next();
        return response;
      } catch (error) {
        console.error("JWT Decode Failed:", error);
        return NextResponse.redirect(new URL("/", req.url)); // Error decoding JWT
      }
    }
  }

  // 4. Redirect authenticated users trying to access /auth to the dashboard
  if (accessToken && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 5. Check user role if accessing admin pages
  if (accessToken && url.pathname.startsWith("/admin")) {
    try {
      const accessPayload = decodeJWT(accessToken);
      const userRole = accessPayload.role;

      // If not Admin, redirect to home
      if (userRole !== "Admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url)); // Error in JWT decoding or role check
    }
  }

  return NextResponse.next(); // Continue processing for other routes
}

export const config = {
  matcher: ["/mulai-belajar", "/history-nilai", "/rangking-nasional", "/profile", "/kritik-saran", "/pilihan-paket/:path*", "/download-pembahasan", "/auth/:path*", "/admin/:path*", "/quiz(.*)", "/free-quiz(.*)"],
};
