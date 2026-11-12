import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (DM Serif Display + DM Sans, both SIL OFL) so the game never
// depends on a network request to Google at build time or on a phone.
const dmSerif = localFont({
  src: "./fonts/dm-serif-display-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin-wght-normal.woff2",
  weight: "100 1000",
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Cost of Eating Green",
  description:
    "A short grocery challenge for UCSD SYN 2: build a $25 basket and see how affordability and environmental impact interact.",
};

export const viewport: Viewport = {
  themeColor: "#F7F5ED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
