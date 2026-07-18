// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// GitHub Pages project site: https://decisionnerd.github.io/quantumfusion/
// If a custom domain or user/org page is used later, update `site` and clear `base`.
export default defineConfig({
  site: 'https://decisionnerd.github.io',
  base: '/quantumfusion',
  integrations: [
    // Must come BEFORE starlight so it can transform ```mermaid code blocks.
    mermaid({ theme: 'default', autoTheme: true }),
    starlight({
      title: 'QuantumFusion',
      description:
        'Unsupervised knowledge discovery over multi-type facts in a unified vector space — composite-entity creation via eigenspace orthogonality.',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/DecisionNerd/quantumfusion',
        },
      ],
      // Pages are generated from the repo's `docs/` folder by scripts/sync-docs.mjs.
      sidebar: [
        { label: 'Documentation', slug: 'overview' },
        { label: 'Product', slug: 'product' },
        { label: 'Requirements', slug: 'requirements' },
        { label: 'Design', slug: 'design' },
        { label: 'Engineering', items: [{ autogenerate: { directory: 'engineering' } }] },
        { label: 'Strategy', items: [{ autogenerate: { directory: 'strategy' } }] },
      ],
    }),
  ],
});
