/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        primary_light: '#F5F3FF',
        error: '#DC2626',
        success: '#16A34A',
      },
      spacing: {
        "app-max": '36rem',
      },
      borderRadius: {
        "app-def": '0.25rem',
      },
      transitionProperty: {
        'width': 'width',
      },
      screens: {
        xs: '420px'
      },
      keyframes: {
        typing: {
          "0%": {
            transform: 'translateY(-0.25rem)'
          },
          "100%": {
            transform: 'translateY(0.25rem)'
          }  
        },
      },
      animation: {
        typing: "typing 200ms infinite alternate"
      }
    },
  },
  plugins: [],
}

