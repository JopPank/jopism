# Jopathlon

A standalone static landing page for the Jopathlon idea. The page keeps the
original Triathlon. Golf. Beer. concept and is published at
`https://jopathlon.jopism.com/` with GitHub Pages.

## Preview

Open `index.html` in a browser. The site has no build step or runtime
dependencies.

## Hosting

The site is maintained in the [`JopPank/jopathlon` repository](https://github.com/JopPank/jopathlon)
and deployed from the `main` branch by the workflow in `.github/workflows`.
The custom domain is configured in the repository's **Settings → Pages**.

The GoDaddy DNS record for `jopism.com` is a CNAME with host `jopathlon` and
target `joppank.github.io`. The root-domain and `www` records for the main
Jopism site are separate and should remain unchanged.

`jopathlon.ca` is a separate domain and is no longer needed to serve this
subdomain. Its registration was not canceled; confirm its registrar and
renewal settings before deciding whether to cancel it or let it expire.
