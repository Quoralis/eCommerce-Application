import { defineConfig } from 'vite';

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
  };
});
