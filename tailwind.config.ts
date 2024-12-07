import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A365D",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#4FD1C5",
          foreground: "#1A365D",
        },
        accent: {
          DEFAULT: "#F6AD55",
          foreground: "#1A365D",
        },
        game: {
          grid: "#E6F7FF",
          cell: "#FFFFFF",
          border: "#CBD5E0",
        },
      },
      keyframes: {
        "elf-move": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "gift-collect": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        "elf-bounce": "elf-move 1s ease-in-out infinite",
        "gift-pickup": "gift-collect 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;