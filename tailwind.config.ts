import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#8B1832",
          white: "#FFFFFF",
          forest: "#1B4D3E",
          sand: "#D4A574",
          gold: "#C9A961",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "brand-sm": "0 14px 40px rgba(27, 77, 62, 0.16)",
        "brand-md": "0 26px 60px rgba(27, 77, 62, 0.24)",
        "brand-lg": "0 30px 80px rgba(27, 77, 62, 0.34)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "menu-in": "menu-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        "moment-in": "moment-in 0.48s cubic-bezier(0.2, 0.8, 0.2, 1)",
        "moment-float": "moment-float 5.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "menu-in": {
          from: { opacity: "0", transform: "translateX(30px)" },
        },
        "moment-in": {
          from: { opacity: "0", transform: "translateY(18px) scale(0.985)" },
        },
        "moment-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
