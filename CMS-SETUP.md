# Mountain Whisk: Setup & Editing Guide

The website is a fast static site. Everything you'd want to change (menu, prices, markets, hours,
season, page text, photos) lives in simple forms at **`yoursite.com/admin`**, so no code is needed.

## Editing day to day (after one-time setup)

1. Go to `yoursite.com/admin` and log in with GitHub.
2. Pick what you want to change:
   - **🥐 Menu**: add/remove items, prices, seasonal labels, category photos
   - **📍 Markets & Hours**: add each farmers market or pop-up, hours, pickup notes
   - **✏️ Page Text**: home page wording, your story, the weddings & stays page
   - **⚙️ Contact & Settings**: email, phone, Facebook, current season, hours
3. Click **Publish**. The live site updates in about 1–2 minutes.

Tips: turn OFF "Show sample menu notice" on the Menu once your real menu is in. Leave a price
blank to hide it. Every photo has a "description" box. Fill it in; it helps Google and screen readers.

## One-time setup (about 30 minutes)

### 1. Put the site on GitHub (free)
1. Create a GitHub account and a new repository (this one is `rgm2026/mountainwhisk`).
2. Upload everything in this folder to it (branch `main`).

### 2. Publish with GitHub Pages (free)
1. Repo → **Settings → Pages → Source: GitHub Actions**.
2. The included workflow (`.github/workflows/deploy.yml`) builds and publishes the site on every save.
3. Under **Pages → Custom domain**, add your domain (e.g. `mountainwhisk.com`) and follow GitHub's DNS steps.
   The site assumes it lives at the root of a domain, so use a custom domain.

### 3. Turn on the login for `/admin`
1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Homepage URL: your site address
   - Authorization callback URL: `https://YOURSITE/admin/`
2. Copy the **Client ID**.
3. Open `cms-config.yml` and replace:
   - `app_id:` → the Client ID (`repo:` is already set to `rgm2026/mountainwhisk`)
   - both `example.com` lines → your real address

If login fails, check Decap CMS's GitHub backend docs (`decapcms.org/docs/github-backend`), as GitHub's OAuth options change occasionally.

### 4. Replace the placeholders
In **⚙️ Contact & Settings** enter your real **website address, email, phone and Facebook link**.
(The build prints a reminder until these are replaced.) Then update the **Markets & Hours** and **Menu**.

### 5. Contact form (optional)
By default, the form opens the visitor's email app with their message filled in. For messages
to arrive directly in your inbox, create a free form at formspree.io and paste its URL into
**Contact form service link** in settings.

## Getting found around Shirley & the lake (SEO)

The site already includes: local page titles and headings, "Shirley, AR / Greers Ferry Lake"
wording, Bakery + Menu structured data, a sitemap, fast-loading images, and mobile-friendly layout.
After launch:

1. **Google Business Profile**: create one as a *service-area business* (you can hide your home
   address). This is the biggest factor for "bakery near me" searches around the lake.
2. **Google Search Console**: add your site and submit `yoursite.com/sitemap.xml`.
3. Link to the site from your Facebook page, Instagram bio, and farmers-market listings.
4. Ask happy customers, Airbnb hosts and campgrounds for a Google review or a link.
5. Keep **Markets & Hours** current. Fresh, specific info ranks and converts.

## Legal note
The footer shows a home-kitchen disclosure (edit under Settings). Please confirm the exact wording and
labeling rules with the Arkansas Department of Health cottage-food guidance.

## Previewing changes on your computer
```
node dev.mjs
```
Opens a live preview at http://localhost:4300 (needs Node.js 18+). `node build.mjs` builds the site into `dist/`.

## Project layout
Almost everything sits in the main folder so it's easy to upload and find:
```
site.json  menu.json  markets.json  content.json   ← all editable content (the CMS edits these)
style.css  site.js                                 ← styling and small behaviors
layout.mjs  pages.mjs  util.mjs                    ← page templates
build.mjs  dev.mjs                                 ← builds the site / local preview
cms.html  cms-config.yml                           ← the /admin editor and its settings
images/                                            ← photos & logo (CMS uploads go in images/uploads)
.github/workflows/deploy.yml                       ← publishes the site automatically
```
