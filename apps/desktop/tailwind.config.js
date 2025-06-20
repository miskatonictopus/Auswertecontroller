import { fontFamily } from "tailwindcss/defaultTheme"
import shadcnPreset from "./components/ui/preset" // 👈 ajusta la ruta si es distinta
import preset from "./components/ui/preset.js"
import { fontFamily } from "tailwindcss/defaultTheme";



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", ...fontFamily.sans],
      },
    },
  },
  presets: [shadcnPreset],
  plugins: [],
}