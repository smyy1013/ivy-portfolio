import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Backdrop } from "@/components/hud/Backdrop";
import { Cursor } from "@/components/hud/Cursor";
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
  title: site.title,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pretendard.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Backdrop />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
