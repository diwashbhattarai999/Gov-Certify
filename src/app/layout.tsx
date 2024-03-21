import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

import { siteConfig } from "@/config";

import { cn } from "@/lib/utils";

import "./globals.css";
import "@uploadthing/react/styles.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = siteConfig;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            montserrat.variable,
            "antialiased flex flex-col min-h-screen bg-background text-foreground"
          )}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
