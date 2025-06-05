import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: "Ritmo - SaaS Platform",
  description: "Modern SaaS application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} bg-background text-text-base`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
