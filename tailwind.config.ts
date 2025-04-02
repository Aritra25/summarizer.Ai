// /** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  safelist: [
    'left-[calc(50%-3rem)]',
    'sm:left-[calc(40%-30rem)]'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rose: {
          600: "hsl(349, 88%, 44%)",
          700: "hsl(349, 88%, 38%)",
        },
        border: "#e5e7eb",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} as Config;
