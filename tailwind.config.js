/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./dist-electron/**/*.{js,cjs,ts,jsx,tsx}", // include all React components
    // "./dist/**/*.{js,cjs,ts,jsx,tsx}",
    // "./src/**/*.{js,cjs,ts,jsx,tsx}", // include all React components
    // "./index.html",
    // "./dist/index.html",
    './index.html',   // your main HTML file
    './src/**/*.{js,ts,jsx,tsx}'  // all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

