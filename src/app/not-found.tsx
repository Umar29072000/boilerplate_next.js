import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <FileQuestion className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">
        Page Not Found
      </h2>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        The requested resource could not be found or may have been relocated.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button size="sm" asChild>
          <Link href="/" className="gap-1.5">
            <Home className="h-3.5 w-3.5" />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
