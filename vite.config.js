import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Correct config (no tailwindcss import)
export default defineConfig({
  plugins: [react()],
  base: '/Dashboard/',
})
