import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToastProvider from "@/src/providers/ToastProvider";
import NextAuthSessionProvider from "@/src/providers/NextAuthSessionProvider";
import { Providers } from "@/src/providers/StoreProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "URL Shortner App",
  description: "Shorten Yours Long Links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <Providers>
          <ToastProvider />
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
