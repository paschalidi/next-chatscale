"use client";


import { auth } from "@/auth/auth";

export default function AuthLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <main className="flex-1 flex pt-[12vh] justify-center px-4">
        {children}
      </main>
    </div>
  );
}