import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // This should be at the top level
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    https: false // Ensure this is false
  }
});


