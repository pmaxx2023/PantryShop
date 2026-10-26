import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PantryShop — Today’s Specials",
  description: "An inviting menu made from what’s already in your kitchen. Photo inventory, household meals and one coordinated grocery list.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
