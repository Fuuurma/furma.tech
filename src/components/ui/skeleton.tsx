import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse bg-grey-200 dark:bg-grey-800", className)}
      {...props}
    />
  )
}

function TextSkeleton({ lines = 1, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  )
}

function CardSkeleton({ showImage = false, className = "" }: { showImage?: boolean; className?: string }) {
  return (
    <div className={`p-6 space-y-4 ${className}`}>
      {showImage && <Skeleton className="h-48 w-full" />}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <TextSkeleton lines={2} />
    </div>
  )
}

function PageSkeleton() {
  return (
    <div
      className="min-h-[70vh] bg-background text-foreground"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading page</span>
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2 space-y-4">
            <Skeleton className="h-3 w-16 bg-foreground/10" />
            <Skeleton className="h-3 w-12 bg-foreground/10" />
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5 space-y-6">
            <Skeleton className="h-10 w-4/5 max-w-xl bg-foreground/10" />
            <Skeleton className="h-10 w-2/3 max-w-md bg-foreground/10" />
            <div className="space-y-3 pt-2 max-w-lg">
              <Skeleton className="h-4 w-full bg-foreground/8" />
              <Skeleton className="h-4 w-5/6 bg-foreground/8" />
              <Skeleton className="h-4 w-3/4 bg-foreground/8" />
            </div>
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-11 w-36 bg-foreground/10" />
              <Skeleton className="h-11 w-28 bg-foreground/8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Skeleton, TextSkeleton, CardSkeleton, PageSkeleton }
