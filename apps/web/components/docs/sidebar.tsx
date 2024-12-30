"use client";

import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Quick Start", href: "/docs#quick-start" },
    ],
  },
  {
    title: "Core Components",
    items: [
      { title: "ChatProvider", href: "/docs#chat-provider" },
      { title: "Messages", href: "/docs#messages" },
      { title: "ChannelList", href: "/docs#chat-list" },
      { title: "MessageInput", href: "/docs#message-input" },
    ],
  },
  {
    title: "Hooks & Context",
    items: [
      { title: "useChat", href: "/docs#hooks" },
    ],
  },
  {
    title: "Advanced Usage",
    items: [
      { title: "TypeScript Types", href: "/docs#typescript-types" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 flex-shrink-0">
      <nav className="sticky top-4 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h5 className="mb-4 font-semibold text-sm text-muted-foreground">
              {section.title}
            </h5>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-sm hover:text-primary transition-colors",
                      pathname + item.href.substring(5) === item.href
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}