/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'game-bg-temp': 'url("/images/game-bg-temp.png")',
      },
      colors: {
        // Add colors here
        'slate-main': '#1C1F2E',
        'slate-light': '#232636',
        'slate-accent': '#363B52',
        'white-main': '#F6F7F9',
        'white-darker': '#F6F7F980',
        'black-main': '#1D1E22',
        'brand-green': '#A3F777',
        'brand-green-hover': '#5df10e',
        'brand-blue': '#3A7CF8',
        'brand-blue-hover': '#095cf6',
        'brand-pink': '#CF2CA2',
        'brand-pink-hover': '#DA53B4',
      },
      dropShadow: {
        'brand-shadow-1': '0px 4px 4px rgba(0, 0, 0, 0.25);',
      },
      letterSpacing: {
        'brand-spacing-1': '-0.02em',
      },
      fontFamily: {
        // Font stack based on
        // https://melchoyce.github.io/fontstacks/examples/open-sans.html
        //'open-sans': ['"Open Sans"', '"Segoe UI"', 'Tahoma', '"sans-serif"'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      scale: {
        0: '0',
        25: '.25',
        50: '.5',
        60: '.6',
        75: '.75',
        80: '.80',
        85: '.85',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
        200: '2',
      },
      screens: {
        xxs: '340px',
        // => @media (min-width: 340px) { ... }

        xs: '400px',
        // => @media (min-width: 400px) { ... }

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }

        '3xl': '1792px',
        // => @media (min-width: 2048px) { ... }

        '4xl': '2048px',
        // => @media (min-width: 2048px) { ... }

        '5xl': '2304px',
        // => @media (min-width: 2048px) { ... }

        '6xl': '2560px',
        // => @media (min-width: 2048px) { ... }
      },
      fontSize: {
        xxs: '.5rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
    },
  },
  // daisyUI config
  // https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    themes: ['dark'],
    base: false,
    utils: false,
    logs: false,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
};
