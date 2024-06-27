import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedPage from "@/components/Animatedpage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onibi",
  description: "Onibi",
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
