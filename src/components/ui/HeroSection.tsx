"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const stats = [
  { val: '11', label: 'Products' },
  { val: '4', label: 'In Dev' },
  { val: '100%', label: 'Bootstrapped' },
  { val: '0%', label: 'VC' },
];

function CursorGlow() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const isInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        setIsHoveringCTA(isInside);
      }
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed -z-10 h-64 w-64 rounded-full bg-white opacity-[0.03] blur-[60px] transition-opacity duration-500 dark:bg-white"
        style={{
          left: cursorPos.x - 128,
          top: cursorPos.y - 128,
          opacity: isHoveringCTA ? 0.08 : 0.03,
        }}
      />
      <div ref={ctaRef} className="relative z-10" />
    </>
  );
}

function TickerItem({ text }: { text: string }) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => (v + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block px-6 font-mono text-[13px] font-bold uppercase tracking-widest text-grey-400">
      <span>{text}</span>
      <span className="absolute left-0 top-0 text-foreground" style={{ clipPath: `inset(${100 - Math.min(value, 100)}% 0 0 0)` }}>
        {text}
      </span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <CursorGlow />
      
      {/* Background */}
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-[0.05]"></div>
      <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-gradient-radial pointer-events-none opacity-[0.03] dark:opacity-[0.08] blur-[120px] animate-pulse-glow"></div>

      <Container size="full">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-12 bg-foreground/[0.02]">
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Venture Studio</span>
          </div>

          <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.9] tracking-tight text-foreground mb-12">
            Software that works.
          </h1>

          <p className="text-[20px] sm:text-[24px] leading-[1.6] text-grey-500 max-w-3xl mx-auto mb-16">
            Bootstrapped, profitable, and built to last. We create industry-specific SaaS and AI infrastructure for teams that value control over hype.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <Button href="/products" variant="default" size="lg" className="text-sm px-6 h-12 group">
              View all products
              <ArrowRight data-icon="inline-end" className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/projects/aitlas" variant="outline" size="lg" className="text-sm px-6 h-12 border-2">
              Explore Aitlas
              <ArrowRight data-icon="inline-end" className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Ticker */}
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-flex animate-ticker">
              {[...stats, ...stats].map((stat, i) => (
                <TickerItem key={i} text={`${stat.label} —`} />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-border mt-16">
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="font-serif text-[32px] sm:text-[40px] font-bold text-foreground leading-none mb-2">{stat.val}</div>
                <div className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
