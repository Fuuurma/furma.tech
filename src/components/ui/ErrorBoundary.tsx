"use client";

import Link from "next/link";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="min-h-[70vh] flex items-center bg-background text-foreground">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2">
            <p className="plastic-label">Error</p>
            <p className="plastic-label mt-4">500</p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
            <h1 className="plastic-headline text-[clamp(32px,5vw,52px)] mb-6">
              Something went wrong.
            </h1>
            <p className="plastic-paragraph text-foreground/65 max-w-lg mb-6">
              {error.message ||
                "An unexpected error occurred. You can try again or head back to the studio."}
            </p>
            {error.digest && (
              <p className="plastic-label mb-8">Ref {error.digest}</p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" onClick={reset} className="plastic-cta">
                Try again
                <span aria-hidden>↻</span>
              </button>
              <Link
                href="/"
                className="plastic-label motion-link-subtle hover:text-foreground"
              >
                Back to home
              </Link>
              <Link
                href="/#contact"
                className="plastic-label motion-link-subtle hover:text-foreground"
              >
                Contact
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && error.stack && (
              <details className="mt-10">
                <summary className="plastic-label cursor-pointer hover:text-foreground">
                  Error details
                </summary>
                <pre className="mt-4 max-h-48 overflow-auto border border-foreground/10 p-4 font-mono text-[11px] leading-relaxed text-foreground/55">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
