import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Syne, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Motorcycle rental in Tajikistan | Pamir Moto Adventure",
    template: "%s | Pamir Moto Adventure",
  },
  description:
    "Rent a Honda CRF300L in Dushanbe for the Pamir Highway, the Wakhan and journeys across the CIS.",
  applicationName: "Pamir Moto Adventure",
  category: "travel",
  openGraph: {
    type: "website",
    siteName: "Pamir Moto Adventure",
    images: [{ url: "/images/hero.jpg", alt: "Riders on the Pamir Highway" }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
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
