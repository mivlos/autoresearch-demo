import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = localFont({
  src: [
    { path: "../fonts/SpaceGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/SpaceGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "AutoResearch — Agentic User Research",
  description: "The future of autonomous user research. From prompt to validated product in hours, not weeks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
