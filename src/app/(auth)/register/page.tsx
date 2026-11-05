import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { RegisterForm } from "@/features/auth/components/register-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an account to start using the platform",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
          >
            <Terminal className="h-5 w-5" />
          </Link>
          <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <Suspense fallback={<div className="h-64 animate-pulse rounded bg-muted/40" />}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
