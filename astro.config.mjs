import { defineConfig, envField } from 'astro/config';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from 'astro-robots-txt';
import remarkNormalizeHeadings from 'remark-normalize-headings'
import a11yEmoji from '@fec/remark-a11y-emoji';
import sectionize from '@hbsnow/rehype-sectionize';
import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_CLOUDINARY_CLOUD_NAME: envField.string({ context: "client", access: "public" }),
      PUBLIC_CLOUDINARY_API_KEY: envField.string({ context: "client", access: "public"}),
      CLOUDINARY_API_SECRET: envField.string({ context: "server", access: "secret" }),
      CLOUDINARY_URL: envField.string({ context: "server", access: "secret" }),
      CF_ZONE_TOKEN: envField.string({ context: "server", access: "secret" }),
      CF_API_TOKEN: envField.string({ context: "server", access: "secret" }),
      TUNNEL_TOKEN: envField.string({ context: "server", access: "secret" }),
    }
  },
  site: 'https://mtonc.dev',
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  integrations: [sitemap(), partytown(), robotsTxt()],
  markdown: {
    remarkPlugins: [remarkNormalizeHeadings, remarkGemoji, a11yEmoji],
    rehypePlugins: [sectionize, rehypeSlug]
  }
});