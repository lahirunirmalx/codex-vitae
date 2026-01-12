import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codex Vitae | Chronicles of the Lost Age",
  description: "Preserved manuscripts and forbidden knowledge from the time before. Fragments recovered from the great collapse.",
  keywords: ["codex", "manuscripts", "chronicles", "forbidden knowledge", "ancient texts"],
  authors: [{ name: "The Archivists" }],
  openGraph: {
    title: "Codex Vitae",
    description: "Chronicles of the Lost Age - Preserved manuscripts from the time before",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
