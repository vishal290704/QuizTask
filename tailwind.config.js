/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        glow: '0 0 10px black',
        heavy: '2px 2px 4px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}

