import { esc, paragraphs, img, mediaPlaceholder, absUrl } from './util.mjs';

const RIDGE = `<svg class="ridge" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 80V52L70 26 132 48 220 6 294 46 352 24 436 68 502 38 588 66 666 20 742 60 804 40 894 74 952 48 1030 70 1110 34 1160 52 1200 30V80Z"/></svg>`;

const arrow = `<svg class="arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const list = (items) => `<ul class="check-list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

/* ------------------------------------------------------------------ HOME */
export function homePage({ site, menu, markets, content }) {
  const c = content.home;
  const cats = menu.categories;
  const nearby = site.areas.slice(0, 4).join(', ');

  const bakeCards = cats
    .map(
      (cat) => `<a class="bake-card" href="/menu/#${esc(cat.id)}">
        <div class="bake-media">${cat.image ? img(cat.image, cat.image_alt) : mediaPlaceholder()}</div>
        <h3>${esc(cat.name)}</h3>
        <p>${esc(cat.blurb)}</p>
        <span class="link-arrow">See ${esc(cat.name.toLowerCase())} ${arrow}</span>
      </a>`
    )
    .join('');

  const marketRows = markets.markets
    .slice(0, 3)
    .map(
      (m) => `<li class="market-row">
        <h3>${esc(m.name)}</h3>
        <p>${esc(m.place)}</p>
        <p class="muted">${esc(m.when)}</p>
      </li>`
    )
    .join('');

  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${esc(c.eyebrow)}</p>
      <h1>${esc(c.headline)}</h1>
      <p class="script hero-tagline">${esc(c.tagline)}</p>
      <p class="lead">${esc(c.intro)}</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="/menu/">See the menu</a>
        <a class="btn btn-ghost" href="/markets/">Find me this week</a>
      </div>
      <p class="hero-meta">Serving ${esc(nearby)} &amp; the lake</p>
    </div>
    <figure class="hero-media">
      ${img('/images/hero-cinnamon-roll.jpg', 'Maple pecan cinnamon roll with cream icing held up against green Arkansas trees, baked by Mountain Whisk in Shirley, AR', { eager: true })}
      <a class="season-tag" href="/menu/">
        <span class="season-kicker">Now baking</span>
        <strong>${esc(site.season_label)} menu</strong>
        <span class="season-blurb">${esc(site.season_blurb)}</span>
      </a>
    </figure>
  </div>
</section>

<div class="band-wrap">
  ${RIDGE}
  <section class="band band-green" aria-labelledby="ingredients-h">
    <div class="wrap">
      <div class="band-head">
        <h2 id="ingredients-h">${esc(c.ingredients_title)}</h2>
        <p>${esc(c.ingredients_intro)}</p>
      </div>
      <ol class="ingredients">
        ${c.ingredients
          .map(
            (i, n) => `<li>
          <span class="num">${String(n + 1).padStart(2, '0')}</span>
          <h3>${esc(i.title)}</h3>
          <p>${esc(i.text)}</p>
        </li>`
          )
          .join('')}
      </ol>
    </div>
  </section>
</div>

<section class="section" aria-labelledby="bake-h">
  <div class="wrap">
    <div class="section-head center">
      <h2 id="bake-h">${esc(c.bake_title)}</h2>
      <p>${esc(c.bake_intro)}</p>
    </div>
    <div class="bake-grid">${bakeCards}</div>
    <p class="center note">Menu changes with the seasons. <a href="/menu/">View the full menu</a></p>
  </div>
</section>

<section class="section section-wood" aria-labelledby="about-h">
  <div class="wrap about-grid">
    <div class="about-logo">
      <img src="/images/logo-full-ink.png" alt="Mountain Whisk logo: a whisk rising like a hot-air balloon over a mountain range" loading="lazy">
    </div>
    <div class="about-copy">
      <p class="eyebrow">Our story</p>
      <h2 id="about-h">${esc(c.about_title)}</h2>
      <blockquote class="mission">${esc(c.mission)}</blockquote>
      ${paragraphs(c.story)}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="find-h">
  <div class="wrap find-grid">
    <div class="find-copy">
      <p class="eyebrow">Hours &amp; locations</p>
      <h2 id="find-h">Find Mountain Whisk</h2>
      <ul class="market-list">${marketRows}</ul>
      <dl class="hours-list">
        ${site.hours.map((h) => `<div><dt>${esc(h.label)}</dt><dd>${esc(h.value)}</dd></div>`).join('')}
      </dl>
      <a class="btn btn-primary" href="/markets/">All hours &amp; markets</a>
    </div>
    <figure class="find-media">
      ${img('/images/market-baskets.jpg', 'Mountain Whisk market table under a canopy with wicker baskets of packaged scones, muffins and rolls near Greers Ferry Lake')}
    </figure>
  </div>
</section>

<section class="band band-ink teaser" aria-labelledby="teaser-h">
  <div class="wrap teaser-grid">
    <figure class="teaser-media">
      ${img('/images/mini-cinnamon-rolls.jpg', 'Mini cinnamon rolls in paper cups on wooden boards, set up as a Mountain Whisk dessert display')}
    </figure>
    <div>
      <p class="eyebrow eyebrow-light">Now taking inquiries</p>
      <h2 id="teaser-h">${esc(content.celebrations.title)}</h2>
      <p>${esc(content.celebrations.intro)}</p>
      <ul class="pill-list">
        ${content.celebrations.cards.map((k) => `<li>${esc(k.title)}</li>`).join('')}
      </ul>
      <a class="btn btn-light" href="/celebrations/">Plan with Mountain Whisk</a>
    </div>
  </div>
</section>
`;

  return {
    path: '/',
    fullTitle: `${site.business_name} | Organic Cottage Bakery in ${site.city}, ${site.state}`,
    description: `Organic cottage bakery in ${site.city}, ${site.state} near Greers Ferry Lake. Cakes, cinnamon rolls, scones, cookies & breads made with unbleached flour, raw sugar & grass-fed butter.`,
    body
  };
}

/* ------------------------------------------------------------------ MENU */
export function menuPage({ site, menu }) {
  const chips = menu.categories
    .map((c) => `<a href="#${esc(c.id)}">${esc(c.name)}</a>`)
    .join('');

  const sections = menu.categories
    .map((cat, n) => {
      const items = cat.items
        .map(
          (it) => `<li class="menu-item">
          <div class="menu-item-head">
            <h3>${esc(it.name)}</h3>
            ${it.price ? `<span class="price">${esc(it.price)}</span>` : ''}
          </div>
          ${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ''}
          <p>${esc(it.description)}</p>
        </li>`
        )
        .join('');
      return `<section class="menu-cat${n % 2 ? ' flip' : ''}" id="${esc(cat.id)}" aria-labelledby="${esc(cat.id)}-h">
        <figure class="menu-media">${cat.image ? img(cat.image, cat.image_alt) : mediaPlaceholder()}</figure>
        <div class="menu-body">
          <h2 id="${esc(cat.id)}-h">${esc(cat.name)}</h2>
          <p class="menu-blurb">${esc(cat.blurb)}</p>
          <ul class="menu-list">${items}</ul>
        </div>
      </section>`;
    })
    .join('');

  const body = `
<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">${esc(site.season_label)} menu</p>
    <h1>Menu</h1>
    <p class="lead">${esc(menu.intro)}</p>
    ${menu.show_sample_notice ? `<p class="notice">${esc(menu.sample_notice)}</p>` : ''}
    <div class="btn-row center-row"><a class="btn btn-primary" href="/contact/">Order or ask a question</a></div>
  </div>
</section>
<nav class="chips" aria-label="Menu categories"><div class="wrap chips-inner">${chips}</div></nav>
<div class="wrap menu-wrap">${sections}</div>
<section class="section section-wood center">
  <div class="wrap narrow">
    <h2>Something special in mind?</h2>
    <p>Custom cakes, party boxes and event orders are made to order. Tell me what you're celebrating.</p>
    <a class="btn btn-primary" href="/contact/">Start an order</a>
  </div>
</section>`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: `${site.business_name} Menu`,
      url: absUrl(site, '/menu/'),
      hasMenuSection: menu.categories.map((cat) => ({
        '@type': 'MenuSection',
        name: cat.name,
        description: cat.blurb,
        hasMenuItem: cat.items.map((it) => ({
          '@type': 'MenuItem',
          name: it.name,
          description: it.description
        }))
      }))
    }
  ];

  return {
    path: '/menu/',
    title: 'Menu: Cakes, Cinnamon Rolls, Scones & Breads',
    description: `See the ${site.business_name} menu: custom cakes, cinnamon rolls, scones, cookies and breads baked with clean ingredients in ${site.city}, ${site.state}. Offerings change with the seasons.`,
    body,
    schema
  };
}

/* --------------------------------------------------------------- MARKETS */
export function marketsPage({ site, markets }) {
  const cards = markets.markets
    .map(
      (m) => `<li class="market-card">
        <h3>${esc(m.name)}</h3>
        <p class="market-place">${esc(m.place)}</p>
        <p>${esc(m.when)}</p>
        ${m.season ? `<p class="muted">${esc(m.season)}</p>` : ''}
        ${m.note ? `<p class="market-note">${esc(m.note)}</p>` : ''}
        ${m.map_url ? `<a class="link-arrow" href="${esc(m.map_url)}" rel="noopener">Get directions ${arrow}</a>` : ''}
      </li>`
    )
    .join('');

  const body = `
<section class="page-hero">
  <div class="wrap hero-grid page-hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${esc(site.city)}, ${esc(site.state)} &amp; Greers Ferry Lake</p>
      <h1>Hours &amp; Markets</h1>
      <p class="lead">${esc(markets.intro)}</p>
    </div>
    <figure class="hero-media hero-media-sm">
      ${img('/images/market-baskets.jpg', 'Mountain Whisk market booth with wicker baskets of fresh baked goods on a green table cloth beneath tall trees', { eager: true })}
    </figure>
  </div>
</section>

<section class="section section-tight" aria-labelledby="markets-h">
  <div class="wrap">
    <h2 id="markets-h">Where to find me</h2>
    <ul class="market-cards">${cards}</ul>
  </div>
</section>

<section class="section section-wood" aria-labelledby="hours-h">
  <div class="wrap two-col">
    <div>
      <h2 id="hours-h">Hours</h2>
      <dl class="hours-list hours-list-lg">
        ${site.hours.map((h) => `<div><dt>${esc(h.label)}</dt><dd>${esc(h.value)}</dd></div>`).join('')}
      </dl>
    </div>
    <div class="callouts">
      <div class="callout">
        <h3>${esc(markets.pickup_title)}</h3>
        <p>${esc(markets.pickup_note)}</p>
        <a class="link-arrow" href="/contact/">Send a message ${arrow}</a>
      </div>
      <div class="callout">
        <h3>${esc(markets.lake_title)}</h3>
        <p>${esc(markets.lake_note)}</p>
        <a class="link-arrow" href="/contact/">Plan your trip ${arrow}</a>
      </div>
    </div>
  </div>
</section>`;

  return {
    path: '/markets/',
    title: `Hours & Farmers Markets in ${site.city}, ${site.state}`,
    description: `Where to find ${site.business_name}: farmers markets, pop-ups and pickup near ${site.city}, ${site.state} and Greers Ferry Lake, plus hours and how to order ahead.`,
    body
  };
}

/* ---------------------------------------------------------- CELEBRATIONS */
export function celebrationsPage({ site, content }) {
  const c = content.celebrations;
  const cards = c.cards
    .map(
      (k) => `<article class="service-card">
        <div class="service-media">${k.image ? img(k.image, k.image_alt) : mediaPlaceholder()}</div>
        <div class="service-body">
          <h3>${esc(k.title)}</h3>
          <p>${esc(k.text)}</p>
          ${list(k.items)}
          <a class="link-arrow" href="/contact/?topic=${encodeURIComponent(k.topic)}">Inquire about ${esc(k.title.toLowerCase())} ${arrow}</a>
        </div>
      </article>`
    )
    .join('');

  const steps = c.steps
    .map(
      (s, n) => `<li><span class="num">${String(n + 1).padStart(2, '0')}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`
    )
    .join('');

  const body = `
<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Now taking inquiries</p>
    <h1>${esc(c.title)}</h1>
    <p class="lead">${esc(c.intro)}</p>
    <div class="btn-row center-row"><a class="btn btn-primary" href="/contact/">Start an inquiry</a></div>
  </div>
</section>

<section class="section section-tight" aria-label="Ways we can work together">
  <div class="wrap service-grid">${cards}</div>
</section>

<div class="band-wrap">
  ${RIDGE}
  <section class="band band-green" aria-labelledby="steps-h">
    <div class="wrap">
      <div class="band-head"><h2 id="steps-h">${esc(c.steps_title)}</h2></div>
      <ol class="ingredients steps">${steps}</ol>
    </div>
  </section>
</div>

<section class="section center">
  <div class="wrap narrow">
    <h2>Every bake made with clean ingredients</h2>
    <p>Unbleached flour, raw sugar, grass-fed butter and dye-free ingredients, whether it's a dozen cookies or a wedding dessert table.</p>
    <a class="btn btn-primary" href="/contact/">Tell me about your plans</a>
  </div>
</section>`;

  return {
    path: '/celebrations/',
    title: `Wedding, Airbnb & Campground Baking near ${site.city}, ${site.state}`,
    description: `Custom cakes, dessert tables, welcome baskets and camp-morning boxes for weddings, Airbnbs, vacation rentals and campgrounds near ${site.city}, ${site.state} and Greers Ferry Lake.`,
    body
  };
}

/* --------------------------------------------------------------- CONTACT */
export function contactPage({ site, content }) {
  const topics = [
    'Order or pickup',
    'Custom cake',
    ...content.celebrations.cards.map((k) => k.topic),
    'Something else'
  ];
  const hasEndpoint = Boolean(site.form_endpoint);
  const social = [
    site.facebook_url ? `<li><a href="${esc(site.facebook_url)}" rel="noopener">Message on Facebook</a></li>` : '',
    site.instagram_url ? `<li><a href="${esc(site.instagram_url)}" rel="noopener">Instagram</a></li>` : ''
  ].join('');

  const body = `
<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Let's talk baking</p>
    <h1>Contact</h1>
    <p class="lead">Questions, custom orders or weekend plans near the lake? Send a note and I'll get back to you soon.</p>
  </div>
</section>

<section class="section section-tight">
  <div class="wrap contact-grid">
    <div class="contact-info">
      <h2>Get in touch</h2>
      <ul class="contact-list">
        <li><span>Email</span><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
        <li><span>Phone / text</span><a href="tel:${esc(site.phone.replace(/\D/g, ''))}">${esc(site.phone)}</a></li>
        ${social}
        <li><span>Based in</span>${esc(site.city)}, ${esc(site.state)}</li>
        <li><span>Serving</span>${site.areas.map(esc).join(', ')}</li>
      </ul>
      <p class="note">Cakes and event orders book up, so message as early as you can.</p>
    </div>
    <form class="contact-form" id="inquiry-form" ${hasEndpoint ? `action="${esc(site.form_endpoint)}" method="POST"` : 'data-mailto="true"'} data-email="${esc(site.email)}">
      <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="f-topic">I'm reaching out about</label>
        <select id="f-topic" name="topic">${topics.map((t) => `<option>${esc(t)}</option>`).join('')}</select>
      </div>
      <div class="field"><label for="f-date">Date needed <span class="opt">(optional)</span></label><input id="f-date" name="date" type="text" placeholder="e.g. Saturday, October 18"></div>
      <div class="field"><label for="f-msg">Tell me about it</label><textarea id="f-msg" name="message" rows="6" required></textarea></div>
      <button class="btn btn-primary" type="submit">Send message</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;

  return {
    path: '/contact/',
    title: `Contact & Custom Orders in ${site.city}, ${site.state}`,
    description: `Contact ${site.business_name} in ${site.city}, ${site.state} to order cakes, cinnamon rolls, scones and breads, or to plan baking for a wedding, rental or campground.`,
    body
  };
}

/* -------------------------------------------------------------------- 404 */
export function notFoundPage() {
  return {
    path: '/404.html',
    title: 'Page not found',
    description: 'That page could not be found.',
    noindex: true,
    body: `
<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">404</p>
    <h1>This trail ends here</h1>
    <p class="lead">We couldn't find that page, but the oven is still on.</p>
    <div class="btn-row center-row"><a class="btn btn-primary" href="/">Back home</a><a class="btn btn-ghost" href="/menu/">See the menu</a></div>
  </div>
</section>`
  };
}
