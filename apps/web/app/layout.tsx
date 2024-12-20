import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from "@/app/providers";
import { auth } from "@/auth/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatScale - Enterprise Chat Infrastructure',
  description: 'Build scalable chat experiences with our multi-tenant infrastructure. Deploy in seconds, scale to millions.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
    <body className={inter.className}>
    <SessionProvider session={session}>
      <Providers>
        {children}
      </Providers>
    </SessionProvider>
    </body>
    </html>
  );
}