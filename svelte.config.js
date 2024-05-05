import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Static site generation (SSG) is used: https://kit.svelte.dev/docs/adapter-static
    adapter: adapter({
      strict: false,
    }),
  },
};

export default config;
