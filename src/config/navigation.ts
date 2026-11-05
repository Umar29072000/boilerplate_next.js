import { NavItem } from "@/types/global";

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const sidebarNavigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "LayoutDashboard",
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: "BarChart3",
        badge: "Pro",
      },
      {
        title: "Transactions",
        href: "/dashboard/transactions",
        icon: "Receipt",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Customers",
        href: "/dashboard/customers",
        icon: "Users",
        roles: ["admin", "superadmin"],
      },
      {
        title: "API Keys",
        href: "/dashboard/api-keys",
        icon: "KeyRound",
        roles: ["admin", "superadmin"],
      },
      {
        title: "Audit Logs",
        href: "/dashboard/audit-logs",
        icon: "ShieldAlert",
        roles: ["superadmin"],
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: "Settings",
      },
      {
        title: "Documentation",
        href: "https://docs.domain.com",
        icon: "BookOpen",
        external: true,
      },
    ],
  },
];
