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
          DEFAULT: "#ea384c", // Christmas red
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2D5A27", // Christmas green
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F6AD55",
          foreground: "#1A365D",
        },
        game: {
          grid: "#F2FCE2", // Soft Christmas green
          cell: "#FFFFFF",
          border: "#ea384c", // Christmas red
        },
        christmas: {
          red: "#ea384c",
          green: "#2D5A27",
          gold: "#FFD700",
          snow: "#FFFFFF",
        }
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
        "snow-fall": {
          "0%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(50vh) translateX(20px)" },
          "100%": { transform: "translateY(100vh) translateX(0)" },
        }
      },
      animation: {
        "elf-bounce": "elf-move 1s ease-in-out infinite",
        "gift-pickup": "gift-collect 0.5s ease-in-out forwards",
        "snow-fall": "snow-fall 5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;