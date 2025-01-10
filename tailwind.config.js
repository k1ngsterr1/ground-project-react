/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#00A859",
        dark: "#2F2F2F",
        blue: "#0047AB",
        light_blue: "#D5DFEE",
        gray: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
