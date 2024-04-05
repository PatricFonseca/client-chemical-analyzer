import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        buttons: "var(--color-buttons)",
        typography: "var(--color-typography)",
        danger: "var(--color-danger)",
      },
      // colors: {
      //   light: {
      //     primary: "#f43f5e", // Assuming this represents your brand color
      //     secondary: "#f43f5e", // Slightly lighter variation for secondary
      //     tertiary: "#f43f5e", // Even lighter variation for tertiary
      //   },
      //   dark: {
      //     primary: "#0a0a0a",
      //     secondary: "#f43f5e",
      //     tertiary: "#f43f5e",
      //   },
      // },
    },
  },
  // themes: {
  //   dark: {
  //     colors: {
  //       primary: "#0a0a0a",
  //       secondary: "#f43f5e",
  //       tertiary: "#f43f5e",
  //     },
  //   },
  // },
  variants: {
    extends: {
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
