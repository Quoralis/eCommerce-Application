import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const prod = 'production';

export default defineConfig(({ mode }) => {
  return {
    base: './',
    root: 'src',
    envDir: '../',
    server: {
      open: true,
    },
    build: {
      outDir: '../dist',
      sourcemap: mode !== prod,
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: '../public/_redirects',
            dest: '',
          },
        ],
      }),
    ],
  };
});
