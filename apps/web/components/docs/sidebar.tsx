"use client";

import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Quick Start", href: "/docs#quick-start" },
      { title: "Authentication", href: "/docs#authentication" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "ChatProvider", href: "/docs#chat-provider" },
      { title: "ChannelList", href: "/docs#chat-list" },
      { title: "MessageInput", href: "/docs#message-input" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Custom Components", href: "/docs#custom-components" },
      { title: "Hooks", href: "/docs#hooks" },
      { title: "Real-time Features", href: "/docs#real-time-features" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Error Handling", href: "/docs#error-handling" },
      { title: "Rate Limits", href: "/docs#rate-limits" },
      { title: "Browser Support", href: "/docs#browser-support" },
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
                      "block text-sm hover:text-primary",
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