/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  darkMode: 'class',
  purge: {
    enabled: true,
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}