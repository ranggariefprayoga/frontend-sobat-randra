import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("token_user")?.value;
  const quizToken = req.cookies.get("quiz_token")?.value;
  const url = req.nextUrl;

  if (!accessToken && !url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!quizToken || !accessToken) {
    if (url.pathname.includes("/quiz")) {
      return NextResponse.redirect(new URL("/mulai-belajar", req.url));
    }
  }

  if (quizToken && accessToken) {
    if (url.pathname.includes("/quiz")) {
      try {
        // ✅ Pastikan JWT memiliki format yang benar
        const jwtParts = accessToken.split(".");
        if (jwtParts.length !== 3) {
          throw new Error("Invalid JWT format");
        }

        const payloadBase64 = jwtParts[1];
        const payloadJson = JSON.parse(decodeURIComponent(atob(payloadBase64)));
        const userEmail = payloadJson.email;

        const jwtPartsQuiz = quizToken.split(".");
        if (jwtPartsQuiz.length !== 3) {
          throw new Error("Invalid JWT format");
        }

        const payloadBase64Quiz = jwtPartsQuiz[1]; // ✅ Perbaiki disini (gunakan jwtPartsQuiz, bukan jwtParts)
        const payloadJsonQuiz = JSON.parse(decodeURIComponent(atob(payloadBase64Quiz)));
        const quizEmail = payloadJsonQuiz.email;

        if (userEmail !== quizEmail) {
          return NextResponse.redirect(new URL("/mulai-belajar", req.url));
        }

        const response = NextResponse.next();
        response.headers.set("X-Quiz-Started-At", payloadJsonQuiz.started_at);
        response.headers.set("X-Quiz-Expired-At", payloadJsonQuiz.expired_at || new Date(Date.now() + 60 * 60 * 1000).toISOString()); // Default 1 jam

        return response;
      } catch (error) {
        console.error("JWT Decode Failed:", error);
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
  // Jika user sudah login dan mencoba akses halaman auth, redirect ke dashboard
  if (accessToken && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Cek Role di Cookie (hanya bisa membaca, tidak bisa verifikasi)
  if (accessToken && url.pathname.startsWith("/admin")) {
    try {
      // ✅ Pastikan JWT memiliki format yang benar
      const jwtParts = accessToken.split(".");
      if (jwtParts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const payloadBase64 = jwtParts[1]; // Ambil payload dari JWT
      const payloadJson = JSON.parse(decodeURIComponent(atob(payloadBase64))); // Decode payload dengan aman
      const userRole = payloadJson.role; // Ambil role user

      // Jika bukan Admin, redirect ke mulai-belajar
      if (userRole !== "Admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("JWT Decode Failed:", error);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mulai-belajar", "/history-nilai", "/rangking-nasional", "/profile", "/kritik-saran", "/pilihan-paket/:path*", "/download-pembahasan", "/auth/:path*", "/admin/:path*", "/quiz(.*)"],
};
