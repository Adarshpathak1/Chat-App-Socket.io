
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-md': {'min': '720px', 'max': '1080px'}, // custom media query
      },
    },
  },
  plugins: [],
}
