'use client';

import Link from 'next/link';

type ProductStatus = 'In Dev' | 'Roadmap' | 'Paused';

interface Product {
  name: string;
  description: string;
  category: string;
  href: string;
  status: ProductStatus;
  accent: 'dark' | 'light' | 'muted';
}

const products: Product[] = [
  {
    name: 'Aitlas',
    description: 'Sovereign AI ecosystem. Nova workspace, Nexus runtime, 34+ Actions.',
    category: 'AI',
    href: '/portfolio/aitlas',
    status: 'In Dev',
    accent: 'dark',
  },
  {
    name: 'TourManager',
    description: 'Tour operator platform with Viator sync for bookings and scheduling.',
    category: 'Tourism',
    href: '/portfolio/tourmanager',
    status: 'In Dev',
    accent: 'light',
  },
  {
    name: 'RestaurantManager',
    description: 'Restaurant management with TheFork integration.',
    category: 'Hospitality',
    href: '/portfolio/restaurantmanager',
    status: 'In Dev',
    accent: 'light',
  },
  {
    name: 'Tic-Tac-Toe Disappear',
    description: 'Vanishing-move strategy game.',
    category: 'Games',
    href: '/portfolio/tic-tac-toe-disappear',
    status: 'In Dev',
    accent: 'muted',
  },
  {
    name: 'QArt',
    description: 'AI-generated QR codes that look like art.',
    category: 'Marketing',
    href: '/portfolio/qart',
    status: 'Roadmap',
    accent: 'muted',
  },
  {
    name: 'PicksTracker',
    description: 'Sports pick tracking with social predictions.',
    category: 'Sports',
    href: '/portfolio/pickstracker',
    status: 'Roadmap',
    accent: 'muted',
  },
  {
    name: 'SailingMate',
    description: 'Real-time sailing navigation with GPS routing.',
    category: 'Maritime',
    href: '/portfolio/sailingmate',
    status: 'Paused',
    accent: 'light',
  },
  {
    name: 'LinkUp',
    description: 'Short-video professional matching platform.',
    category: 'Social',
    href: '/portfolio/linkup',
    status: 'Paused',
    accent: 'muted',
  },
  {
    name: 'FinanceHub',
    description: 'Market data & portfolio monitoring.',
    category: 'Finance',
    href: '/portfolio/financehub',
    status: 'Paused',
    accent: 'light',
  },
  {
    name: 'OneToMany',
    description: 'Goal setting & habit tracking.',
    category: 'Productivity',
    href: '/portfolio/onetomany',
    status: 'Paused',
    accent: 'muted',
  },
  {
    name: 'OpenGovern',
    description: 'Direct democracy tooling for municipalities.',
    category: 'Civic Tech',
    href: '/portfolio/opengovern',
    status: 'Paused',
    accent: 'muted',
  },
];

const statusBadge: Record<ProductStatus, string> = {
  'In Dev': 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30',
  'Roadmap': 'bg-foreground/10 text-foreground/60 border-foreground/20',
  'Paused': 'bg-foreground/5 text-foreground/30 border-foreground/10',
};

const cardBg: Record<string, string> = {
  dark: 'bg-foreground text-background border-foreground',
  light: 'bg-grey-50 dark:bg-grey-900/50 border-grey-200 dark:border-grey-800',
  muted: 'bg-grey-100 dark:bg-grey-900/30 border-grey-200 dark:border-grey-800/50',
};

const categoryStyle: Record<string, string> = {
  dark: 'text-background/50',
  light: 'text-foreground/40',
  muted: 'text-foreground/40',
};

function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase tracking-wider border ${statusBadge[status]}`}>
      <span className="w-1 h-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function BentoGrid() {
  return (
    <div className="w-full">
      {/* Big Portfolio Title */}
      <div className="mb-8">
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-serif font-bold tracking-tight leading-[0.9] -ml-1">
          Portfolio
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            className={`group flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 ${cardBg[product.accent]} border rounded-lg`}
          >
            {/* Top row: category + status */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${categoryStyle[product.accent]}`}>
                {product.category}
              </span>
              <StatusBadge status={product.status} />
            </div>

            {/* Product name */}
            <h3 className={`font-serif font-bold text-2xl mb-2 ${product.accent === 'dark' ? 'text-background' : 'text-foreground'} group-hover:text-foreground/80 transition-colors`}>
              {product.name}
            </h3>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-4 ${product.accent === 'dark' ? 'text-background/60' : 'text-foreground/60'}`}>
              {product.description}
            </p>

            {/* View link */}
            <span className={`mt-auto text-xs font-medium ${product.accent === 'dark' ? 'text-background/40 group-hover:text-background/70' : 'text-foreground/30 group-hover:text-foreground/60'} transition-colors`}>
              View project →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
