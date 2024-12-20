"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={'/'}>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6" />
            <span className="font-bold text-xl">ChatScale</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-sm text-muted-foreground hover:text-primary">
            Features
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
            Documentation
          </Link>
          <Button variant="outline">
            <Link href={'/auth/login'}>
              Login
            </Link>
          </Button>

          <Link href={'/live?cn=public'} >
            <Button>
              Try it out &nbsp;⚡
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}