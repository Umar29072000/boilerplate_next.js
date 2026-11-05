"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        Something went wrong
      </h2>
      <p className="mt-1 max-w-md text-xs text-muted-foreground">
        {error.message || "An unhandled exception occurred during render."}
      </p>
      {error.digest && (
        <span className="mt-2 font-mono text-[10px] text-muted-foreground">
          Digest: {error.digest}
        </span>
      )}
      <Button
        onClick={() => reset()}
        size="sm"
        variant="outline"
        className="mt-5 gap-1.5"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}
