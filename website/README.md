# QuantumFusion docs site

An [Astro Starlight](https://starlight.astro.build) documentation site for QuantumFusion,
deployed to GitHub Pages at <https://decisionnerd.github.io/quantumfusion/>.

## Single source of truth

The repo's [`../docs/`](../docs/) folder is the canonical documentation. This site does **not**
duplicate it: `scripts/sync-docs.mjs` generates Starlight pages from `../docs/` at build time
(via the `predev`/`prebuild` hooks), adding the required frontmatter and rewriting internal links.
The generated pages under `src/content/docs/` are gitignored (only `index.mdx`, the landing page,
is committed).

To add or edit documentation, edit the Markdown in `../docs/` — not the generated output.

## Commands

All commands are run from this `website/` directory:

| Command           | Action                                             |
| ----------------- | -------------------------------------------------- |
| `npm install`     | Install dependencies                               |
| `npm run sync`    | Regenerate pages from `../docs/`                   |
| `npm run dev`     | Sync, then start the dev server at `localhost:4321`|
| `npm run build`   | Sync, then build the production site to `./dist/`  |
| `npm run preview` | Preview the built site locally                     |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it
to GitHub Pages. Enable it once under **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

If the site moves to a custom domain or a user/org page, update `site` and `base` in
`astro.config.mjs` and the `BASE` constant in `scripts/sync-docs.mjs`.
