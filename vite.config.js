import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/ — plain React SPA. Builds to `dist/`, which Vercel
// auto-detects (framework preset "Vite"); no extra config needed to deploy.
export default defineConfig({
  plugins: [react()],
  server: {
    // PORT lets tooling assign a free port; defaults to 3000 for `npm run dev`.
    port: Number(process.env.PORT) || 3000,
    open: true,
  },
});
