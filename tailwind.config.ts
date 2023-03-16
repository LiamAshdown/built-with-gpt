import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "2.5rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "10rem",
      }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    extend: {
      scale: {
        'in-view': '1.05',
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out'
      },
      keyframes: {
        'slide-in-left': {
          '0%, 100%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        'slide-in-right': {
          '0%, 100%': {
            transform: 'translateX(100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      }
    }
  }
}
