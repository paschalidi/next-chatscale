import { MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span className="font-semibold">ChatScale</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 ChatScale. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}