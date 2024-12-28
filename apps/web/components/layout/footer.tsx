import { LogoImage } from "@/components/ui/logo-image";

export function Footer() {
  return (
    <footer className="mt-auto border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LogoImage/>
            <span className="font-semibold">ReChat</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 ReChat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}