"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Receipt,
  Users,
  KeyRound,
  ShieldAlert,
  Settings,
  BookOpen,
  ExternalLink,
  Command,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/auth-store";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BarChart3,
  Receipt,
  Users,
  KeyRound,
  ShieldAlert,
  Settings,
  BookOpen,
};

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-border bg-card text-card-foreground",
        className
      )}
    >
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Command className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {siteConfig.shortName}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Production Starter
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {sidebarNavigation.map((section, idx) => {
          const visibleItems = section.items.filter((item) => {
            if (!item.roles || item.roles.length === 0) return true;
            if (!user) return false;
            return item.roles.includes(user.role);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="mb-6 last:mb-0">
              {section.title && (
                <div className="mb-2 px-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  {section.title}
                </div>
              )}
              <nav className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon ? iconMap[item.icon] : null;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        {Icon && (
                          <Icon
                            className={cn(
                              "h-4 w-4 transition-colors",
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                        )}
                        <span>{item.title}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="h-4 px-1 text-[10px] uppercase"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {item.external && (
                          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-60" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center justify-between rounded-md bg-muted/40 p-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">API Status</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">Operational</span>
        </div>
      </div>
    </aside>
  );
}
