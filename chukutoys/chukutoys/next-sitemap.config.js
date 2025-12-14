module.exports = {
  siteUrl: 'https://www.chukutoys.in/',   // your domain
  generateRobotsTxt: true,          // also generate robots.txt
  sitemapSize: 7000,                // split if >7000 URLs
  exclude: ['/admin/*'],            // exclude private routes
  changefreq: 'daily',
  priority: 0.7,
};
