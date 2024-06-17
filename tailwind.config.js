/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        light: "#ebebeb",
        dark: "#1a1a1a",
        interaction: "#ff3928",
      },
    },
  },
  plugins: [],
};
