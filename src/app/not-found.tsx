import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-[clamp(64px,8vw,120px)] font-semibold leading-none text-fg mb-4">
          404
        </h1>
        <h2 className="font-serif text-[clamp(24px,4vw,36px)] font-semibold text-fg mb-4">
          Page not found
        </h2>
        <p className="text-[15px] leading-[1.7] text-grey-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-fg text-bg hover:bg-grey-800 transition-all"
          >
            Go home →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded border border-grey-200 text-fg hover:border-grey-400 hover:bg-grey-50 transition-all"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
