/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // Preflight (Tailwind's CSS reset) is off so headings, paragraphs, buttons
  // and inputs keep the browser defaults your current design relies on.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        nba: {
          DEFAULT: "#1D428a", // main blue
          hover: "#517ac8",   // button hover
          light: "#4872c6",   // start-screen team card hover
          mist: "#e6e9f0",    // input background / suggestion hover
        },
      },
      fontFamily: {
        helvetica: ["Helvetica"],
      },
      backgroundImage: {
        // resolved relative to src/index.css, same as your old url("background.jpg")
        court: "url('./background.jpg')",
      },
    },
  },
  plugins: [],
};