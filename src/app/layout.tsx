import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/main/navbar";
import Footer from "@/components/main/footer";

export const metadata: Metadata = {
  title: "Common Components",
  description: "Generated by Jesal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
