import { fontFamily } from "tailwindcss/defaultTheme"
import shadcnPreset from "./components/ui/preset" // 👈 ajusta la ruta si es distinta
import preset from "./components/ui/preset.js"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  presets: [shadcnPreset], // 👈 Esto habilita clases como border-border, bg-muted, etc.
  plugins: [],
}