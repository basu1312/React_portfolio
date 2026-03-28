import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Use VITE_PUBLIC_PATH env var to set `base` for GitHub Pages deployments.
export default defineConfig({
  base: process.env.VITE_PUBLIC_PATH || '/',
  plugins: [react()],
});
