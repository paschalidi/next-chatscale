'use client'
import { ReactNode } from 'react';
import { QueryProvider } from "@/lib/queryClient";


export default async function Providers({ children }: { children: ReactNode }) {

  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
