# Jopathlon

A standalone static landing page for the Jopathlon idea. The page keeps the
original Triathlon. Golf. Beer. concept and is ready to publish as a separate
GitHub Pages site at `jopathlon.jopism.com`.

## Preview

Open `index.html` in a browser. The site has no build step or runtime
dependencies.

## Publish at the subdomain

This repository already publishes the main Jopism website, so GitHub Pages
cannot use the same Pages site for this separate subdomain. To publish this
site independently:

1. Create a new GitHub repository under `JopPank` for the Jopathlon site.
2. Copy the **contents** of this folder, including the hidden `.github`
   directory and the `CNAME` file, to the new repository's root.
3. Push the files to its `main` branch. The included workflow deploys the site
   with GitHub Pages.
4. In the new repository's **Settings → Pages**, set the custom domain to
   `jopathlon.jopism.com`.
5. In the DNS settings for `jopism.com`, add a `CNAME` record with host
   `jopathlon` and target `joppank.github.io`. Keep the existing records for
   the main Jopism site unchanged.
6. After DNS has propagated and GitHub Pages verifies the domain, enable
   **Enforce HTTPS** in the Pages settings.

Keep `jopathlon.ca` registered and its current site available until the new
subdomain is live and verified. The `.ca` domain uses Google Domains
nameservers, but that alone does not identify its registrar; confirm the
registration and renewal settings with the provider holding the domain before
canceling it.
