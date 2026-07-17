import { MetadataRoute } from 'next';

/**
 * Robots.txt for Furma.tech
 * Controls search engine crawling
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://furma.tech';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow admin/internal paths if they exist
        disallow: [
          '/api/',
          '/_next/',
          '/node_modules/',
        ],
      },
      // Be more restrictive with AI crawlers
      {
        userAgent: [
          'AI2Bot',
          'Ai2Bot-Dolma',
          'aiHitBot',
          'Amazonbot',
          'anthropic-ai',
          'Applebot',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
          'ChatGPT-User',
          'Claude-Web',
          'ClaudeBot',
          'cohere-ai',
          'Diffbot',
          'FacebookBot',
          'FriendlyCrawler',
          'Google-Extended',
          'GoogleOther',
          'GoogleOther-Image',
          'GoogleOther-Video',
          'GPTBot',
          'iaskspider/2.0',
          'ICC-Crawler',
          'ImagesiftBot',
          'img2dataset',
          'ISSCyberRiskCrawler',
          'Kangaroo Bot',
          'Meta-ExternalAgent',
          'Meta-ExternalFetcher',
          'OAI-SearchBot',
          'omgili',
          'omgilibot',
          'PanguBot',
          'PerplexityBot',
          'PetalBot',
          'Scrapy',
          'Sidetrade indexer bot',
          'Timpibot',
          'VelenPublicWebCrawler',
          'Webzio-Extended',
          'YouBot',
        ],
        // Allow AI bots but with restrictions
        allow: [
          '/og/', // Allow OG image generation
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/styleguide',
          '/brand',
        ],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    host: baseUrl,
  };
}
