import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/NavigationLayout";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sobat Randra",
  description: "All in one Platform belajar SKD CPNS, BUMN, dan Polri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <main className="flex flex-col min-h-screen">
            <Navigation />
            <Toaster position="top-center" />
            <div className="flex-grow">{children}</div>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js" strategy="afterInteractive" defer />
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
