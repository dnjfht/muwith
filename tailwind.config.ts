import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '3sm': '320px',
      '2sm': '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        calc_1: 'calc(100% - 740px)',
        calc_2: 'calc(100% - 80px)',
        calc_3: 'calc(100% - 200px)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-170deg': 'linear-gradient(170deg, black, transparent)',
      },

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },

      animation: {
        spin: 'spin 2.6s linear infinite',
      },
    },
  },
  corePlugins: {
    aspectRatio: true,
    lineClamp: true,
  },
  plugins: [require('tailwind-scrollbar-hide')],
  mode: 'jit',
};
export default config;
