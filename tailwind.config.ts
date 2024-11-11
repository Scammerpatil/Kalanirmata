/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  screens: {
    xs: "450px",
    sm: "575px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1400px",
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: true,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
  },
};
