import { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Gov Certify |  Your Digital Gateway to Official Certificates",
  metadataBase: new URL("https://localhost:3000"), //TODO: Replace "https://localhost:3000" with your actual website URL
  icons: [
    { rel: "icon", url: "/favicon.png" },
    { rel: "apple-touch-icon", url: "/apple-icon.png" },
  ],

  alternates: {
    canonical: "/",
  },
  authors: [
    { name: "Diwash Bhattarai", url: "https://diwashb.com.np" }, //TODO: Update with your information
  ],
  description:
    "Gov Certify is your one-stop destination for online certificate registration with the government. Apply for various government-issued certificates hassle-free and securely.",
  openGraph: {
    title: "Gov Certify",
    description:
      "Gov Certify is your one-stop destination for online certificate registration with the government. Apply for various government-issued certificates hassle-free and securely.",
    images: [
      {
        url: "favicon-32x32.png",
        alt: "Gov Certify",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "certificate registration",
    "government certificates",
    "online application",
    "government services",
    "e-governance",
  ],
} as const;
