'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  'projects': 'Projects',
  'aitlas': 'Aitlas',
  'saas': 'Industry SaaS',
  'about': 'About',
  'careers': 'Careers',
  'contact': 'Contact',
  'updates': 'Updates',
  'docs': 'Docs',
  'privacy': 'Privacy',
  'nova': 'Nova',
  'nexus': 'Nexus',
  'agents': 'Agents Store',
  'twyt': 'f.twyt',
  'library': 'f.library',
  'rsrx': 'f.rsrx',
  'pay': 'f.pay',
  'health': 'f.health',
  'restauramanager': 'restauManager',
  'guidetours': 'GuideTours',
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname);
  
  if (breadcrumbItems.length === 0) return null;
  
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-sm ${className}`}>
      <Link 
        href="/" 
        className="text-grey-500 hover:text-foreground transition-colors no-underline flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-grey-400" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-grey-500 hover:text-foreground transition-colors no-underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === '/') return [];
  
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  let currentPath = '';
  
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    
    const isLast = i === segments.length - 1;
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  }
  
  return breadcrumbs;
}