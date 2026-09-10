// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import kodaDark from './themes/koda-dark.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: kodaDark,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
