/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      "primary": "#468EF9",
      "secondary": "#0C66EE",
      "blue": "#2F7CF0",
      "blueColor": "#2a68ff",
      "cardShadow": "#f7f8f9",
      "textColor": "#252b36",
      "greyIsh": "#f1f4f8",
      "black": "#222222",
      "gray": "#666666",
      "darkGray": "#888888",
      "lightgray": "#DDDDDD",
      "green": "#28C165",
      "red": "#F4574D",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
