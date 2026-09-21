const ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ENT[c]);

/** Plain text with blank-line breaks -> <p> tags. */
export const paragraphs = (text = '') =>
  String(text)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('\n');

/** True for the sample values that ship with the site and must be replaced before launch. */
export const isPlaceholder = (v = '') =>
  !v || /example\.com|555-01\d\d|^https:\/\/www\.facebook\.com\/?$/.test(v);

export const telHref = (phone = '') => 'tel:+1' + phone.replace(/\D/g, '').replace(/^1/, '');

export const absUrl = (site, path) => site.site_url.replace(/\/$/, '') + path;

/** JSON-LD that is safe to inline in a <script> tag. */
export const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

export const img = (src, alt = '', { cls = '', eager = false } = {}) =>
  `<img${cls ? ` class="${cls}"` : ''} src="${esc(src)}" alt="${esc(alt)}"${
    eager ? ' fetchpriority="high"' : ' loading="lazy"'
  } decoding="async">`;

export const mediaPlaceholder = () =>
  `<div class="media-placeholder"><img src="/images/logo-mark-cream.png" alt="" loading="lazy"><span>Photo coming soon</span></div>`;
