/** @format */

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
    <html lang="en">
      <body className={twMerge(font.className)}>
        <main
          id="content"
          role="main"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
