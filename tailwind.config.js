/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F5',
        anniv: {
          light: '#FFD6E0',
          DEFAULT: '#FF4D73',
          dark: '#E0114F',
        },
        work: {
          light: '#CFE3FF',
          DEFAULT: '#2E7BFA',
          dark: '#1552C4',
        },
        personal: {
          light: '#CFF5DA',
          DEFAULT: '#17B85C',
          dark: '#0E8C45',
        },
        holiday: {
          light: '#FFDCDC',
          DEFAULT: '#FF3B3B',
          dark: '#D91E1E',
        },
        tico: {
          cream: '#FFF9F0',
          brown: '#B98A5E',
          dark: '#5C4433',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 16px rgba(92, 68, 51, 0.08)',
        bubble: '0 6px 20px rgba(92, 68, 51, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
