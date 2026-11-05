"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { Sidebar } from "./sidebar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const getBreadcrumbTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "Home";
    const last = parts[parts.length - 1];
    return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle navigation</span>
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Workspace</span>
            <span>/</span>
            <span className="font-medium text-foreground">
              {getBreadcrumbTitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-input bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            <span>Search anything...</span>
            <kbd className="ml-2 pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          <ThemeToggle />
          <UserNav />
        </div>
      </header>

      {/* Mobile Drawer */}
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="fixed inset-y-0 left-0 z-50 h-full w-72 max-w-none translate-x-0 translate-y-0 p-0 border-r border-border rounded-none shadow-xl data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <div className="relative h-full flex flex-col">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 h-7 w-7"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
