/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          50: '#E8F5EE',
          100: '#D1EBDD',
          200: '#A3D7BB',
          300: '#75C399',
          400: '#52B788',
          500: '#2D6A4F',
          600: '#1B4332',
          700: '#163A2B',
          800: '#112E22',
          900: '#0C2219',
        },
        gold: {
          50: '#FDF8ED',
          100: '#FAECC5',
          200: '#F5DF9B',
          300: '#E8C96A',
          400: '#D4A843',
          500: '#C49530',
          600: '#A37820',
          700: '#7D5B18',
          800: '#573F10',
          900: '#312308',
        },
        surface: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
        },
        ink: {
          50: '#F8F9FA',
          100: '#ADB5BD',
          200: '#868E96',
          300: '#495057',
          400: '#343A40',
          500: '#2D3436',
        },
        danger: '#E76F51',
        success: '#52B788',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Noto Sans SC', 'sans-serif'],
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'elevated': '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
