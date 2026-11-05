export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-4">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="font-mono text-xs text-muted-foreground">
        Loading workspace components...
      </span>
    </div>
  );
}
