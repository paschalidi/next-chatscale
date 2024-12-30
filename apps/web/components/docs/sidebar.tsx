"use client";

import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Quick Start", href: "/docs#quick-start" },
      { title: "Installation", href: "/docs#installation" },
      { title: "Basic Setup", href: "/docs#basic-setup" },
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
      { title: "Messages API", href: "/docs#messages-api" },
      { title: "Channels API", href: "/docs#channels-api" },
      { title: "WebSocket Events", href: "/docs#websocket-events" },
    ],
  },
  {
    title: "Customization",
    items: [
      { title: "Styling", href: "/docs#styling" },
      { title: "Custom Rendering", href: "/docs#custom-rendering" },
      { title: "Theme Integration", href: "/docs#theme-integration" },
    ],
  },
  {
    title: "Advanced Usage",
    items: [
      { title: "Error Handling", href: "/docs#error-handling" },
      { title: "TypeScript Types", href: "/docs#typescript-types" },
      { title: "Performance", href: "/docs#performance" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Configuration", href: "/docs#configuration" },
      { title: "Response Types", href: "/docs#response-types" },
      { title: "Rate Limits", href: "/docs#rate-limits" },
    ],
  }
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