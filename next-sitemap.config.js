/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.edificationoverseas.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude admin and API routes
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
  ],

  // Custom priorities for key pages
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/countries'),
    await config.transform(config, '/services'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/book-consultation'),
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://www.edificationoverseas.com/sitemap.xml',
    ],
  },

  transform: async (config, path) => {
    // Higher priority for home, countries, services
    const highPriority = ['/', '/countries', '/services', '/blog', '/contact', '/book-consultation'];
    const mediumPriority = ['/countries/', '/services/'];

    let priority = 0.7;
    let changefreq = 'weekly';

    if (highPriority.includes(path)) {
      priority = 1.0;
      changefreq = 'daily';
    } else if (mediumPriority.some(p => path.startsWith(p))) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
