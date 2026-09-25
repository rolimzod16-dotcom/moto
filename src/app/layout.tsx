import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pamir-motoride.vercel.app"),
  title: {
    default: "Pamir Motoride",
    template: "%s | Pamir Motoride",
  },
  description: "Motorcycle and 4x4 rentals in Tajikistan",
  openGraph: { images: ["/images/hero.jpg"] },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">{children}<Analytics /></body>
    </html>
  );
}
