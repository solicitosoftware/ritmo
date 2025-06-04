/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212', // very dark gray
        surface: '#1E1E1E', // elevated surfaces
        primary: '#BB86FC', // neon purple (nightclub feel)
        secondary: '#03DAC6', // teal accent
        accent: '#FFB74D', // warm amber for highlights
        muted: '#2C2C2C', // muted containers
        border: '#3C3C3C', // subtle border
        text: {
          base: '#E0E0E0', // light gray text
          muted: '#A0A0A0', // less emphasis
          inverse: '#121212', // text on light surfaces (e.g., buttons)
        },
        error: '#CF6679', // reddish error tone
        success: '#4CAF50', // success green
        warning: '#FF9800', // warning orange
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

