# Modular Portfolio 2 — public client-side source capture

Source URL: https://modular-portfolio-2.preview.emergentagent.com/  
Captured: 2026-10-12T05:11:37+00:00 (UTC)  

## What is included

- `app/frontend/src/` — first-party React/JavaScript/CSS source recovered from the site's publicly served Webpack source map. The original paths are retained under `/app/frontend/src`. There are 38 first-party source files.
- `captured/static/js/bundle.js` and `captured/static/js/bundle.js.map` — the exact public bundle and map downloaded from the site.
- `captured/index.html` — the exact HTML response captured from the site. It includes preview-platform injected scripts/markup.
- `captured/favicon.svg` and `captured/images/projects/` — the public static assets referenced by the portfolio.
- `captured/webpack-modules/src-index.css.css-loader.js` — the generated CSS-loader module as it appears in the source map. The clean `app/frontend/src/index.css` was recovered from that module's nested source map.
- `capture-manifest.json` — URLs, byte sizes, content types, and SHA-256 hashes for the captured files.

## Scope and limitations

This is the browser-side source and assets that were publicly exposed by the deployed preview at capture time—not the private repository or a complete original project checkout. No backend implementation, package manifest/lockfile, build configuration, environment variables, or private files were exposed by the site, so they are not included. Remote font stylesheets and preview-platform scripts are still referenced by the captured HTML; they are not portfolio source files. A source-only reconstruction may therefore need the original dependency versions/build setup to run exactly as the hosted preview did.

The extracted first-party files are copied from the source map's `sourcesContent`; no application logic was rewritten. The raw bundle/map are retained so the extraction can be checked against the served artifacts.
