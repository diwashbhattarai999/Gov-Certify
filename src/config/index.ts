import { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Good Buy",
  metadataBase: new URL("https://example.com"), // Replace "example.com" with your actual website URL
  alternates: {
    canonical: "/",
  },
  authors: [
    { name: "Diwash Bhattarai", url: "https://example.com/your-profile" }, // Update with your information
  ],
  description:
    "Discover amazing deals and quality products online at Good Buy. Shop from a wide selection of items including clothing, electronics, home goods, and more. Experience hassle-free shopping and great customer service!",
  openGraph: {
    title: "Good Buy",
    description:
      "Discover amazing deals and quality products online at Good Buy. Shop from a wide selection of items including clothing, electronics, home goods, and more. Experience hassle-free shopping and great customer service!",
    images: [
      {
        url: "/good-buy-logo.png", // Update with your logo image URL
        alt: "Good Buy Logo", // Update with your logo alt text
        width: 1200, // Update with your logo width
        height: 630, // Update with your logo height
      },
    ],
  },
  keywords: [
    "online shopping",
    "e-commerce",
    "deals",
    "discounts",
    "clothing",
    "electronics",
    "home goods",
    // Add more relevant keywords related to your e-commerce website
  ],
} as const;
