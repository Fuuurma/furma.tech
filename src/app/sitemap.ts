import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://furma.tech';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brand`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  const productPages = [
    `${baseUrl}/portfolio/aitlas`,
    `${baseUrl}/portfolio/aitlas/nova`,
    `${baseUrl}/portfolio/aitlas/nexus`,
    `${baseUrl}/portfolio/aitlas/agents`,
    `${baseUrl}/portfolio/aitlas/twyt`,
    `${baseUrl}/portfolio/aitlas/library`,
    `${baseUrl}/portfolio/aitlas/rsrx`,
    `${baseUrl}/portfolio/aitlas/health`,
    `${baseUrl}/portfolio/aitlas/pay`,
    `${baseUrl}/portfolio/restauramanager`,
    `${baseUrl}/portfolio/guidetours`,
    `${baseUrl}/portfolio/tic-tac-toe-disappear`,
    `${baseUrl}/portfolio/qart`,
    `${baseUrl}/portfolio/pickstracker`,
    `${baseUrl}/portfolio/linkup`,
    `${baseUrl}/portfolio/financehub`,
    `${baseUrl}/portfolio/onetomany`,
    `${baseUrl}/portfolio/opengovern`,
  ].map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: url.includes('/aitlas') ? 0.8 : 0.7,
  }));

  return [...staticPages, ...productPages];
}
