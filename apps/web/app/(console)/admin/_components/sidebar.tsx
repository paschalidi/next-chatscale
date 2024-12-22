"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { KeyRound as Key, LayoutDashboard, HandMetal, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOutWrapper } from "@/auth/auth.services";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, disabled: false },
  { name: "Team", href: "/admin/team", icon: HandMetal, disabled: false },
  { name: "API Keys", href: "/admin/api-keys", icon: Key, disabled: false },
];

export function Sidebar() {
  const pathname = usePathname();

  const signOut = async () => {
    await signOutWrapper();
  };

  return (
    <div className="flex h-full w-64 flex-col bg-card">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-xl font-bold">Chat Admin</h1>
      </div>
      <div className={'flex flex-col justify-between h-full'}>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  item.disabled ? "cursor-not-allowed opacity-50 " : "",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5"/>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <Button variant={'secondary'} className={'mb-5 mx-2'}
                onClick={signOut}>Logout</Button>
      </div>

    </div>
  );
}