import type { Config } from "tailwindcss";
import colors from "./src/constants/colors";
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: "700px" },

        lm: { max: "1500px" },
      },
      colors: {
        ...colors,
      },

      boxShadow: {
        'custom': '10px 9px 22px 0px rgba(20, 78, 227, 0.38)',
      },
    },
  },
  plugins: [],
};
export default config;
