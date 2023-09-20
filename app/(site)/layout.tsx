/** @format */

import "../globals.css";
import Header from "@/components/common/Header";
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
      dir="ltr"
    >
      <body className={twMerge(font.className, "font-sans antialiased")}>
        <Header />

        <main
          id="content"
          role="main"
        >
          {children}
        </main>
        <div className="divider" />
        <footer className="footer footer-center pb-4">
          <p className="text-sm">BODRUM TÜRK FILMLERI HAFTASI 2023</p>
        </footer>
      </body>
    </html>
  );
}
