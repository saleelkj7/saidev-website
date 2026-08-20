import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1a3a2a',
        gold: '#c8a84b',
        cream: '#faf6ee',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
