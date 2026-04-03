import { PageSkeleton } from '@/components/ui/skeleton';

/**
 * Global loading state for all pages
 * Shows while Next.js is rendering the page
 */
export default function Loading() {
  return <PageSkeleton />;
}
