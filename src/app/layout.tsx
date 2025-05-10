// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SUN CO.",
  description: "Your premium sneaker store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <main className="px-4 py-8 max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
