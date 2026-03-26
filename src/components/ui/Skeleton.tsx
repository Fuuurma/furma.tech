/**
 * Skeleton loading components
 * Used for perceived performance during data fetching
 */

interface SkeletonProps {
  className?: string;
}

/**
 * Basic skeleton placeholder
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-grey-200 dark:bg-grey-800 rounded ${className}`}
    />
  );
}

/**
 * Text skeleton - for headings and paragraphs
 */
export function TextSkeleton({ 
  lines = 1, 
  className = '' 
}: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  );
}

/**
 * Card skeleton - for content cards
 */
export function CardSkeleton({ 
  showImage = false,
  className = ''
}: { showImage?: boolean; className?: string }) {
  return (
    <div className={`p-6 space-y-4 ${className}`}>
      {showImage && (
        <Skeleton className="h-48 w-full rounded-xl" />
      )}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <TextSkeleton lines={2} />
    </div>
  );
}

/**
 * Stats skeleton - for statistics/metrics
 */
export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="text-center space-y-3">
          <Skeleton className="h-8 w-16 mx-auto" />
          <Skeleton className="h-3 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}

/**
 * List skeleton - for lists of items
 */
export function ListSkeleton({ 
  count = 5, 
  className = '' 
}: { count?: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table skeleton - for data tables
 */
export function TableSkeleton({ 
  rows = 5, 
  columns = 4 
}: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={rowIndex} 
          className="grid gap-4" 
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-10" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Page skeleton - full page loading state
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-bg p-6 md:p-12 space-y-12">
      {/* Hero */}
      <div className="max-w-4xl space-y-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-16 w-1/2" />
        <TextSkeleton lines={2} className="max-w-2xl" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-36 rounded-lg" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
