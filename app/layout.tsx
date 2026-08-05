import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { seoSite } from "@/data/seo";
import { createRootMetadata } from "@/lib/seo";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: seoSite.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: seoSite.themeColor.dark },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={seoSite.language} className="dark" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-[var(--ds-radius-md)] bg-[var(--ds-primary)] px-4 py-2 font-medium text-white focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
