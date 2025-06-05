/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFD700', // Primary gold
          600: '#CCB000',
          700: '#998400',
          800: '#665800',
          900: '#332C00',
        },
        silver: {
          50: '#F7F7F7',
          100: '#EFEFEF',
          200: '#DFDFDF',
          300: '#CFCFCF',
          400: '#B0B0B0',
          500: '#C0C0C0', // Primary silver
          600: '#9A9A9A',
          700: '#747474',
          800: '#4F4F4F',
          900: '#292929',
        },
        copper: {
          50: '#FCF5EF',
          100: '#F9EBDE',
          200: '#F3D7BE',
          300: '#EDC39D',
          400: '#E6AF7D',
          500: '#B87333', // Primary copper
          600: '#935C29',
          700: '#6F451F',
          800: '#4A2E15',
          900: '#25170A',
        },
        navy: {
          50: '#E6EBF4',
          100: '#CCD7E9',
          200: '#99AFD3',
          300: '#6687BD',
          400: '#335FA7',
          500: '#003791',
          600: '#002C74',
          700: '#002157',
          800: '#00163A',
          900: '#000B1D',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'coin': '0 4px 6px -1px rgba(184, 115, 51, 0.1), 0 2px 4px -1px rgba(255, 215, 0, 0.06)',
      },
    },
  },
  plugins: [],
};