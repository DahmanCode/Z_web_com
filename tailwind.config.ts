import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#211F1A",
        paper: "#FFFDF8",
        accent: "#C08A3E",
        cobalt: "#1F4E5F",
        sand: "#E2DAC5",
        clay: "#B5573C",
        muted: "#5B5748",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;