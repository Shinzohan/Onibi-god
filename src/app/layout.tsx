import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedPage from "@/components/Animatedpage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onibi",
  description: "Aniflow Interactive is the developer for Onibi, an upcoming adventure and exploration game. Dash, possess, and explore your way through different areas as you accompany a child on their adventures as their fledgling guardian spirit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <AnimatedPage>{children}</AnimatedPage>
         </body>
    </html>
  );
}
