/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ha: {
          primary: "var(--primary-color, #03a9f4)",
          text: "var(--primary-text-color, #212121)",
          "text-secondary": "var(--secondary-text-color, #727272)",
          background: "var(--primary-background-color, #fafafa)",
          card: "var(--card-background-color, #ffffff)",
          sidebar: "var(--sidebar-background-color, #ffffff)",
        },
      },
    },
  },
  plugins: [],
};
