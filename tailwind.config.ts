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
        sans: ['Nunito', 'system-ui', 'sans-serif'],
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
        brand: {
          purple: '#6C63FF',
          'purple-light': '#ede9fe',
          green:  '#4ADE80',
          'green-light': '#dcfce7',
          yellow: '#FBBF24',
          'yellow-light': '#fef9c3',
          coral:  '#F87171',
          'coral-light': '#fee2e2',
        },
      },
      boxShadow: {
        card: '0 2px 8px 0 rgb(108 99 255 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        lift: '0 4px 20px 0 rgb(108 99 255 / 0.15)',
      },
    },
  },
  plugins: [],
};
export default config;
