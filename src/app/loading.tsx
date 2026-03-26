import { PageSkeleton } from '@/components/ui/Skeleton';

/**
 * Global loading state for all pages
 * Shows while Next.js is rendering the page
 */
export default function Loading() {
  return <PageSkeleton />;
}
