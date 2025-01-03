"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoImage } from "@/components/ui/logo-image";
import { GithubIcon } from "lucide-react"; // Import the GitHub icon from lucide-react

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={'/'}>
          <div className="flex items-center space-x-2">
            <LogoImage/>
            <span className="font-bold text-xl">ReChat</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-sm text-muted-foreground hover:text-primary ">
            Features
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary ">
            Documentation
          </Link>
          <Button variant="outline">
            <Link href={'/auth/login'}>
              Login
            </Link>
          </Button>
          <Link href={'/live?cn=public'}>
            <Button>
              Try it out &nbsp;⚡
            </Button>
          </Link>
          <Link
            href="https://github.com/rechat-org"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-[-20px] text-sm text-muted-foreground hover:text-primary flex items-center gap-1 hover:bg-neutral-100 p-3 rounded-xl"
          >
            <GithubIcon className="h-4 w-4"/>
          </Link>
        </nav>
      </div>
    </header>
  );
}