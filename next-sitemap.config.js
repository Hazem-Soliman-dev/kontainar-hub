/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://tajirjomlahub.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
};

module.exports = config;

