import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Develops Today challenge app",
  description: "Develops today challenge app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-[90%] max-w-[1000px] mx-auto pt-24">
          {children}
          <div className="flex flex-col gap-2 mt-10 w-full items-center justify-center">
            <Link
              className="hover:underline w-fit"
              target="_blank"
              href="https://www.gustavopenabeltrami.com.ar/"
            >
              My portafolio
            </Link>
            <Link
              className="hover:underline w-fit"
              target="_blank"
              href="https://github.com/GustavoPenaBeltrami"
            >
              Github
            </Link>
            <Link
              className="hover:underline w-fit"
              target="_blank"
              href="https://www.linkedin.com/in/gustavo-pena-beltrami/"
            >
              Linkedin
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
