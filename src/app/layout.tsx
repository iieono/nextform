import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Layout from "./(dashboard)/layout";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/DesignerContext";
import Head from "next/head";
import favicon from '../../public/favicon.ico'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXTFORM",
  description: "Create your own form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Head>
      <img width="100" height="100" src="https://img.icons8.com/bubbles/100/form.png" alt="form"/>
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <DesignerContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* <Layout> */}
              {children}
              <Toaster />
              {/* </Layout> */}
            </ThemeProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
