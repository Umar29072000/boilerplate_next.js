export type Nullable<T> = T | null;

export type ThemeMode = "light" | "dark" | "system";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  badge?: string | number;
  roles?: string[];
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}
