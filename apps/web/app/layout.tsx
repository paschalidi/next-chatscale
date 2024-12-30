import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from "@/app/providers";
import { AuthProvider } from "@/auth/AuthProvider";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReChat - Enterprise Chat Infrastructure',
  description: 'Build scalable chat experiences with our multi-tenant infrastructure. Deploy in seconds, scale to millions.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <html lang="en" className="scroll-smooth">
    <body className={inter.className}>
    <AuthProvider>
      <Analytics/>
      <Providers>
        {children}
      </Providers>
    </AuthProvider>
    </body>
    </html>
  );
}