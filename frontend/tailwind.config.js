/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c"
        }
      },
      boxShadow: {
        glow: "0 15px 35px -10px rgba(249, 115, 22, 0.35)"
      }
    }
  },
  plugins: []
};
