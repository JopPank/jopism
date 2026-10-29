# Jopism Digital

A standalone bilingual landing page for Jopism's digital services.

## Preview

Open `index.html` in a browser. Tailwind CSS is loaded from its CDN; there is
no build step.

French is the default (`index.html`); English is available at `en.html`.
The EN/FR navigation links switch between the complete pages without
JavaScript. Keep both versions in sync when changing content. All contact
buttons in each language open `mailto:info@jopism.com`.

The page introduces the independent side project, identifies Marché Laflamme
as a first client project in progress without results or screenshots, and
explains that third-party subscriptions and maintenance can cost extra.

## Hosting

The standalone site is maintained in
[`JopPank/jopism-digital`](https://github.com/JopPank/jopism-digital).
The included workflow deploys the repository root from `main`. GitHub Pages
uses the GitHub Actions source and the custom domain `digital.jopism.com`.
`CNAME` also records the intended domain.

The GoDaddy DNS record is a CNAME with host `digital` and target
`joppank.github.io`. Keep the existing root-domain, `www`, and email records
unchanged. Check DNS and HTTPS status in the repository's **Settings → Pages**.
