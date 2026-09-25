import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Syne, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const source = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pamir-motoride.vercel.app"),
  title: {
    default: "Pamir Motoride — Ride the Pamirs",
    template: "%s | Pamir Motoride",
  },
  description:
    "Guided motorcycle expeditions and 4x4 rentals on the Pamir Highway and Wakhan Corridor. Local team in Dushanbe.",
  openGraph: { images: ["/images/hero.jpg"] },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${syne.variable} ${source.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
