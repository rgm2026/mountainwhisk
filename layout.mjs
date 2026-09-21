import { esc, absUrl, jsonLd, isPlaceholder, telHref } from './util.mjs';

const NAV = [
  ['/menu/', 'Menu'],
  ['/markets/', 'Hours & Markets'],
  ['/celebrations/', 'Weddings & Stays']
];

function bakeryLd(site) {
  const sameAs = [site.facebook_url, site.instagram_url].filter((u) => !isPlaceholder(u));
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': absUrl(site, '/#bakery'),
    name: site.business_name,
    description:
      'Organic cottage bakery in Shirley, Arkansas making cakes, cinnamon rolls, scones, cookies and breads with unbleached flour, raw sugar, grass-fed butter and dye-free ingredients.',
    url: absUrl(site, '/'),
    image: absUrl(site, '/images/og-image.jpg'),
    logo: absUrl(site, '/images/logo-mark-ink.png'),
    hasMenu: absUrl(site, '/menu/'),
    servesCuisine: 'Bakery',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.postal_code,
      addressCountry: 'US'
    },
    areaServed: site.areas.map((name) => ({ '@type': 'Place', name }))
  };
  if (!isPlaceholder(site.email)) ld.email = site.email;
  if (!isPlaceholder(site.phone)) ld.telephone = site.phone;
  if (sameAs.length) ld.sameAs = sameAs;
  return ld;
}

function header(active) {
  const links = NAV.map(
    ([href, label]) =>
      `<a href="${href}"${active === href ? ' aria-current="page"' : ''}>${esc(label)}</a>`
  ).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="Mountain Whisk, home">
      <img src="/images/logo-mark-ink.png" alt="" width="52" height="40">
      <span class="brand-name">Mountain Whisk</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="sr-only">Menu</span><span class="bars" aria-hidden="true"></span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      ${links}
      <a class="btn btn-primary btn-sm" href="/contact/"${active === '/contact/' ? ' aria-current="page"' : ''}>Order or inquire</a>
    </nav>
  </div>
</header>`;
}

function footer(site) {
  const social = [
    site.facebook_url ? ['Facebook', site.facebook_url] : null,
    site.instagram_url ? ['Instagram', site.instagram_url] : null
  ].filter(Boolean);
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <img src="/images/logo-mark-cream.png" alt="" width="120" height="82" loading="lazy">
      <p class="script">Mountain Whisk</p>
      <p>Organic cottage bakery in ${esc(site.city)}, ${esc(site.state)}.<br>A more mindful approach to indulgence.</p>
    </div>
    <div>
      <h2 class="footer-h">Explore</h2>
      <ul class="footer-list">
        <li><a href="/menu/">Menu</a></li>
        <li><a href="/markets/">Hours &amp; Markets</a></li>
        <li><a href="/celebrations/">Weddings &amp; Stays</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-h">Get in touch</h2>
      <ul class="footer-list">
        <li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
        <li><a href="${esc(telHref(site.phone))}">${esc(site.phone)}</a></li>
        ${social.map(([n, u]) => `<li><a href="${esc(u)}" rel="noopener">${n}</a></li>`).join('')}
      </ul>
    </div>
    <div>
      <h2 class="footer-h">Serving</h2>
      <p class="footer-areas">${site.areas.map(esc).join(' · ')}</p>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>${esc(site.disclosure)}</p>
    <p>&copy; ${year} ${esc(site.business_name)}. All rights reserved.</p>
  </div>
</footer>`;
}

export function renderPage(site, page) {
  const { path, title, description, body, active = path, schema = [], image = '/images/og-image.jpg', noindex = false } = page;
  const fullTitle = page.fullTitle || `${title} | ${site.business_name}`;
  const url = absUrl(site, path);
  const ld = [...(path === '/' ? [bakeryLd(site)] : []), ...schema];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#1f3a2b">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.business_name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(absUrl(site, image))}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="US-${esc(site.state)}">
<meta name="geo.placename" content="${esc(site.city)}, ${esc(site.state)}">
<link rel="icon" type="image/png" href="/images/favicon.png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@400;500;600&family=Sacramento&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
${ld.map(jsonLd).join('\n')}
</head>
<body>
${header(active)}
<main id="main">
${body}
</main>
${footer(site)}
<script src="/js/site.js" defer></script>
</body>
</html>
`;
}
