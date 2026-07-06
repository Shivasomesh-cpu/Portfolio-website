import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Shiva Somesh — Distributed Systems Engineer",
  description:
    "Portfolio of Shiva Somesh — B.Tech CSE (AI & ML) at VIT Chennai. Building distributed systems where correctness under concurrency is the whole game. Projects: DigitalWill, MiroFish, RecipeNest, IEEE skin cancer research.",
  keywords: [
    "Shiva Somesh", "Distributed Systems", "Concurrency", "VIT Chennai",
    "Next.js", "Flutter", "TensorFlow", "Portfolio", "Software Engineer",
  ],
  authors: [{ name: "Shiva Somesh" }],
  openGraph: {
    title: "Shiva Somesh — Distributed Systems Engineer",
    description:
      "Building systems where correctness under concurrency isn't a nice-to-have — it's the whole game.",
    siteName: "Shiva Somesh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiva Somesh — Distributed Systems Engineer",
    description:
      "Building systems where correctness under concurrency isn't a nice-to-have — it's the whole game.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased bg-[#050516] text-[#d2e0ff] grain`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
