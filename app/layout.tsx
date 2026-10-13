import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// Brand font. One variable file covers every weight, in Latin and Korean.
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

// Mono face for labels, metadata, and HUD readouts.
const jetbrains = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  // Lets link previews (KakaoTalk, LinkedIn, iMessage) find the preview picture
  // in app/opengraph-image.png by its full address.
  metadataBase: new URL("https://ivyyoon.vercel.app"),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pretendard.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-svh flex-col">
        {children}
      </body>
    </html>
  );
}
