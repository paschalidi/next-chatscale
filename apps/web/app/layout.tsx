import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from "@/app/providers";
import { AuthProvider } from "@/auth/AuthProvider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatScale - Enterprise Chat Infrastructure',
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
      <Providers>
        {children}
      </Providers>
    </AuthProvider>
    </body>
    </html>
  );
}