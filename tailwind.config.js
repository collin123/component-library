/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./dist-electron/**/*.{js,cjs,ts,jsx,tsx}", // include all React components
    "./dist/**/*.{js,cjs,ts,jsx,tsx}",
    "./src/**/*.{js,cjs,ts,jsx,tsx}", // include all React components
    "./index.html",
    "./dist/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

