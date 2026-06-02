import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Providers from "@/provider/react_query";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Gov SL",
  description: "Government of Sierra Leone Official Media Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}