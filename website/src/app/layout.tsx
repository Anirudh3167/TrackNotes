import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import WebsiteNavbar from "@/components/WebsiteNavbar";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrackNotes",
  description: "The Developer's choice for making Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" className='dark'>
        <body className={inter.className}>
          <Providers> 
            <WebsiteNavbar />  
            {children}    
          </Providers>
          <Toaster />
        </body>
      </html>
    </SessionWrapper>
  );
}
