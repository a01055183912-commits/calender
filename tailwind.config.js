/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF7F2',
        anniv: {
          light: '#FFE3E9',
          DEFAULT: '#FF8FA3',
          dark: '#E5657E',
        },
        work: {
          light: '#DCEBFF',
          DEFAULT: '#6EA8FE',
          dark: '#3D7BE0',
        },
        personal: {
          light: '#DFF6E3',
          DEFAULT: '#6FCF97',
          dark: '#3FAE6B',
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
