/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1A202C",
        accent: "#5A67D8",
        secondary: "#C3DAFE",
        light: "#F0F4F8",
      },
    },
  },
  plugins: [],
};
