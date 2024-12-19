/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "serif"],
      },
      colors: {
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        mutedforeground: "var(--mutedforeground)",
        pCyan: "var(--pCyan)",
        pPurple: "var(--pPurple)",
        pBlue: "var(--pBlue)",
        pBlack: "var(--pBlack)",
      },
    },
  },
  plugins: [],
};
