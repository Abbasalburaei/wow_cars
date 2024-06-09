import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        wowPrimary:'var(--wow-primary-color)',
        wowSecondary:'var(--wow-secondary-color)',
        wowBg:'var(--wow-bg-color)',
        wowGray:'var(--wow-gray-color)',
        wowLightGray:'var(--wow-light-gray-color)',
        wowBlack:'var(--wow-black-color)'
      },
      textColor:{
        wowPrimary:'var(--wow-primary-text-color)',
        wowSecondary:'var(--wow-secondary-text-color)',
        wowGray:'var(--wow-gray-color)',
        wowLightGray:'var(--wow-light-gray-color)',
      },
      borderColor:{
        wowPrimary:'var(--wow-primary-color)',
        wowSecondary:'var(--wow-secondary-color)',
        wowLightGray:'var(--wow-light-gray-color)',
        wowBlack:'var(--wow-black-color)'
      }
    },
  },
  plugins: [],
};
export default config;
