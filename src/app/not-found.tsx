import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, MessageSquare, Search, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-background px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none"></div>
      <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-gradient-radial-blue pointer-events-none opacity-40 blur-[100px] animate-pulse-glow"></div>
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-[0.3]"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm card-elevated">
          <Compass className="w-4 h-4 text-amber-500" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-600">Error 404</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(64px,10vw,128px)] font-semibold leading-[0.85] tracking-tighter text-foreground mb-8">
          Lost in the<br />
          <span className="gradient-text italic">ecosystem.</span>
        </h1>

        {/* Description */}
        <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-12 max-w-lg mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a new coordinate.
          Let&apos;s get you back on track.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/" className="no-underline">
            <Button variant="premium" size="lg" glow className="shadow-xl shadow-amber-500/30 min-w-[180px]">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/#contact" className="no-underline">
            <Button variant="outline" size="lg" className="card-elevated min-w-[180px]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </Link>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Link href="/portfolio/aitlas" className="group no-underline">
            <div className="p-4 rounded-xl bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 card-elevated hover:border-foreground/30 transition-all">
              <div className="text-[13px] font-bold text-foreground mb-1 group-hover:text-amber-600 transition-colors">Aitlas</div>
              <div className="text-[11px] text-grey-500">AI Ecosystem</div>
            </div>
          </Link>
          <Link href="/portfolio" className="group no-underline">
            <div className="p-4 rounded-xl bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 card-elevated hover:border-foreground/30 transition-all">
              <div className="text-[13px] font-bold text-foreground mb-1 group-hover:text-blue-600 transition-colors">Products</div>
              <div className="text-[11px] text-grey-500">Industry SaaS</div>
            </div>
          </Link>
          <Link href="/about" className="group no-underline">
            <div className="p-4 rounded-xl bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 card-elevated hover:border-foreground/30 transition-all">
              <div className="text-[13px] font-bold text-foreground mb-1 group-hover:text-purple-600 transition-colors">About</div>
              <div className="text-[11px] text-grey-500">Our Story</div>
            </div>
          </Link>
          <Link href="/#contact" className="group no-underline">
            <div className="p-4 rounded-xl bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 card-elevated hover:border-foreground/30 transition-all">
              <div className="text-[13px] font-bold text-foreground mb-1 group-hover:text-green-600 transition-colors">Contact</div>
              <div className="text-[11px] text-grey-500">Get in Touch</div>
            </div>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-16 pt-8 border-t border-grey-200 dark:border-grey-800">
          <div className="flex items-center justify-center gap-2 text-grey-500 dark:text-grey-400">
            <Search className="w-4 h-4" />
            <span className="text-[13px]">Looking for something specific?</span>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 mt-4 text-[13px] font-semibold text-amber-600 hover:text-amber-500 transition-colors">
            Browse all products →
          </Link>
        </div>
      </div>

      {/* Decorative Background Logo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none select-none">
        <span className="font-serif text-[25vw] font-bold text-foreground">FURMA</span>
      </div>
    </div>
  );
}
