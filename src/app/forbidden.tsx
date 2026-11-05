import Link from "next/link";
import { ShieldX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Forbidden() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
        <ShieldX className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">
        Access Forbidden (403)
      </h2>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        Your role does not possess sufficient permissions to view this resource.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button size="sm" asChild>
          <Link href="/dashboard" className="gap-1.5">
            <Home className="h-3.5 w-3.5" />
            <span>Return to Dashboard</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
