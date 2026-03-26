import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "404 — Page Not Found",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-background px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-[0.3]"></div>
      
      <div className="relative z-10 text-center max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-grey-500">Error 404</span>
        </div>
        
        <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.9] tracking-tighter text-foreground mb-8">
          Lost in the<br />
          <span className="gradient-text italic">ecosystem.</span>
        </h1>
        
        <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-12 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a new coordinate.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/" variant="premium" size="lg" glow>
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Report an Issue
          </Button>
        </div>
      </div>

      {/* Decorative logo mark */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="font-serif text-[20vw] font-bold">FURMA</span>
      </div>
    </div>
  );
}
