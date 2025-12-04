import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        logoGreen: "#7ed957",
      },
    },
  },
  plugins: [],
};
export default config;
