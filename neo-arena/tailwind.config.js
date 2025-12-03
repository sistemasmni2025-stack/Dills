/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arena: {
          dark: '#0f172a', // Slate 900
          card: '#1e293b', // Slate 800
          red: '#ef4444', // Red 500
          green: '#22c55e', // Green 500
        }
      }
    },
  },
  plugins: [],
}
