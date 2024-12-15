import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatScale - Enterprise Chat Infrastructure',
  description: 'Build scalable chat experiences with our multi-tenant infrastructure. Deploy in seconds, scale to millions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
    <body className={inter.className}>
    <Header/>
    {children}
    <Footer/>
    </body>
    </html>
  );
}