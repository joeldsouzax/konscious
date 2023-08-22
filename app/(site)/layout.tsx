/** @format */

import Footer from "@/components/Footer";
import "../globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

export const metadata = {
  title: "Konscious.no",
  description: "Festival Management Application",
};

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      dir="ltr"
    >
      <body className={twMerge(font.className, "font-sans antialiased")}>
        <Header />
        <main
          id="content"
          role="main"
          className="bg-white"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
