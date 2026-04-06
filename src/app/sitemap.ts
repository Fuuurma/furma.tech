import { MetadataRoute } from 'next';

/**
 * Sitemap for Furma.tech
 * Generated statically - update when adding new pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://furma.tech';
  
  // Static pages with priority and change frequency
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ];

  // Product pages - unified products
  const productsPages = [
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio/tic-tac-toe-disappear`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/qart`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/sailingmate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio/tourmanager`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/restaurantmanager`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/financehub`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio/onetomany`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio/opengovern`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio/linkup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio/pickstracker`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/aitlas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio/aitlas/nova`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/aitlas/nexus`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/aitlas/agents`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/aitlas/twyt`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/aitlas/library`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Legacy redirects (keep for SEO continuity)
  const legacyPages = [
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/portfolio/restauramanager`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/portfolio/guidetours`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/portfolio/aitlas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Blog/update posts
  const updatePosts = [
    {
      url: `${baseUrl}/updates/aitlas-rebrand`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates/f-twyt-production`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates/restauManager-alpha`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates/aitlas-launch`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates/mcp-first-design`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/updates/why-bootstrapped`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ];

  return [
    ...staticPages,
    ...productsPages,
    ...legacyPages,
    ...updatePosts,
  ];
}
