import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Disappear — Furma.tech',
  description: 'A strategic twist on the classic tic-tac-toe game where moves vanish after a set number of turns.',
};

export default function TicTacToePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-purple-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">In Development</Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            Tic-Tac-Toe Disappear
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            A strategic twist on the classic game where moves vanish after a set number of turns, 
            creating dynamic and unpredictable gameplay.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Game Mechanics</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Unlike traditional tic-tac-toe, marks disappear after a predetermined number of turns. 
              This creates a constantly evolving board where players must think several moves ahead 
              and adapt their strategy in real-time.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>Dynamic board state with vanishing marks</li>
              <li>Multiple game modes and difficulty levels</li>
              <li>Adaptive AI opponent</li>
              <li>Clean, minimalist design</li>
              <li>Mobile-friendly gameplay</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Currently in active development. Built with modern web technologies for smooth 
              gameplay across all devices.
            </p>
          </div>
          
          <div className="mt-12 pt-12 border-t border-border">
            <Button href="/portfolio" variant="default" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
