import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),tailwindcss()],
  preview: {
    allowedHosts: [
      'tmbilltasks1-2-1.onrender.com', // Your Render host
      'localhost' // Keep for local testing
    ],
    host: '0.0.0.0', // Required for Render
   
  }
})