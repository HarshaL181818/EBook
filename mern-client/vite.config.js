import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // Vite plugin for React
  server: {
    host: '0.0.0.0',  // Allow external access
    port: 5173,  // Frontend runs on this port
    strictPort: true,
    https: false,  // Keep it HTTP for now

    // ✅ Proxy API requests to backend server
    proxy: {
      '/api': {
        target: 'http://52.200.115.42:5000', // Replace with your public IP
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
