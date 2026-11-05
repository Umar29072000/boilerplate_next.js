import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Database,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/lib/constants";

export default function HomePage() {
  const highlights = [
    {
      icon: Zap,
      title: "TanStack Query v5 & Zustand",
      description:
        "Dual-layer state strategy: server state synchronization with aggressive caching alongside persistent client state.",
    },
    {
      icon: ShieldCheck,
      title: "Hardened Auth & Axios Client",
      description:
        "Centralized API client featuring automatic silent token refresh, request interceptors, and strict typed error normalization.",
    },
    {
      icon: Layers,
      title: "Strict Feature-Sliced Architecture",
      description:
        "Business logic, Zod validations, custom hooks, and presentation components isolated cleanly per domain.",
    },
    {
      icon: Database,
      title: "Production Docker Multi-Stage",
      description:
        "Alpine-based minimal Dockerfile utilizing Next.js standalone output tracing for ultra-light production deployments.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Terminal className="h-4 w-4" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <Badge variant="outline" className="hidden sm:inline-flex text-[10px]">
            v1.0.0-prod
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href={ROUTES.LOGIN}>Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={ROUTES.DASHBOARD} className="gap-1.5">
              <span>Open Console</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>Next.js 15 App Router & Strict TypeScript</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Engineered for Speed, <br className="hidden sm:inline" />
              <span className="text-zinc-500 dark:text-zinc-400">
                Built for Scalable Production.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A high-signal, zero-slop boilerplate crafted with App Router, TanStack Query, Zustand, Axios interceptors, Zod contract validation, and border-first design.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild className="h-10 px-6 text-xs">
                <Link href={ROUTES.DASHBOARD} className="gap-2">
                  <span>Explore Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-10 px-6 text-xs"
              >
                <Link href={ROUTES.LOGIN}>Sign In Preview</Link>
              </Button>
            </div>

            {/* Architecture Snapshot Box */}
            <div className="mt-14 rounded-lg border border-border bg-card p-4 text-left shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    src/lib/api-client.ts — Token Refresh & Interceptors
                  </span>
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">
                  Zero AI Slop
                </Badge>
              </div>
              <pre className="mt-3 overflow-x-auto font-mono text-xs text-muted-foreground leading-relaxed">
                <code>{`// Strict Axios client contract with automatic silent token refresh
export const apiClient = axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !request._retry) {
      const refreshed = await authService.refreshToken();
      return apiClient(replayedRequest);
    }
    return Promise.reject(parseApiError(error));
  }
);`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="container mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Production Architecture Pillars
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Eliminating boilerplate fatigue with enterprise-grade conventions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-card p-5 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/40 text-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{siteConfig.name}</span>
            <span>•</span>
            <span>High-Density Modular SaaS Foundation</span>
          </div>
          <div className="font-mono text-[11px]">
            Ready for external Golang / REST / gRPC backends
          </div>
        </div>
      </footer>
    </div>
  );
}
