import type { Metadata } from 'next';
import { Header } from "@/components/layout/header";


export const metadata: Metadata = {
  title: 'ChatScale - Live deom',
  description: 'Build scalable chat experiences with our multi-tenant infrastructure. Deploy in seconds, scale to millions.',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return <div>
    <Header/>

    {children}
  </div>;

}