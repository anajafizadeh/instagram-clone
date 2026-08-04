import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "A clone of Instagram built with Next.js and Material-UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased bg-zinc-50 dark:bg-black font-sans`}
    >
      <body className="container min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <div className="flex flex-col flex-1">
            {children}
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
