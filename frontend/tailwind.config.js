/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050812",
        deep: "#080e1c",
        surface: "#0c1424",
        card: "#101b2e",
        border: "rgba(99,179,255,0.08)",
        accent: "#22d3ee",
        "accent-blue": "#3b82f6",
        "accent-violet": "#a855f7",
      },
      fontFamily: {
        sans: ["DM Sans", "-apple-system", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease both",
      },
    },
  },
  plugins: [],
};
