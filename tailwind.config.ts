import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        korean: ["'Noto Sans KR'", 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#171717',
          800: '#262626',
          600: '#525252',
          400: '#a3a3a3',
          200: '#e5e5e5',
          100: '#f5f5f5',
          50:  '#fafafa',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        lift: '0 4px 16px 0 rgb(0 0 0 / 0.10)',
      },
    },
  },
  plugins: [],
};
export default config;
