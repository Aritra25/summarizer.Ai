// /** @type {import('tailwindcss').Config} */
import type {Config} from "tailwindcss";
export default {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,jsx,ts,tsx,mdx}',
      './components/**/*.{js,jsx,ts,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
        }
      },
    },
    plugins: [],
  } as Config;
  