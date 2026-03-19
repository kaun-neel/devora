/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#A0522D",
        "primary-dark": "#6B4423",
        "background-light": "#FFF8DC",
        "background-dark": "#3d2817",
        "brutal-black": "#1a1a2e",
        "devora-brown": "#5C3317",
        "devora-tan": "#D2B48C",
        "devora-cream": "#FFFACD",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'neubrutalism': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'neubrutalism-sm': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}

