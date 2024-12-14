"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6" />
          <span className="font-bold text-xl">ChatScale</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-primary">
            Features
          </Link>
          {/*<Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary">*/}
          {/*  Pricing*/}
          {/*</Link>*/}
          {/*<Link href="#docs" className="text-sm text-muted-foreground hover:text-primary">*/}
          {/*  Documentation*/}
          {/*</Link>*/}
          <Button variant="outline">Login</Button>
          <Button>Get Started</Button>
        </nav>
      </div>
    </header>
  );
}