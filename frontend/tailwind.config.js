module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'royal-navy': '#0A1128',
        'moonlight-white': '#F4F4F9',
        'cosmic-gold': '#D4AF37',
        'ash-grey': '#9CA3AF',
        'saffron-glow': '#F9A826',
        'lotus-pink': '#E83F6F',
        'deep-maroon': '#2A0800',
        'emerald-green': '#10B981',
        'luxury-bg': '#020617',
        'luxury-dark': '#0B0F19',
      },
      backgroundImage: {
        'saffron-gold-grad': 'linear-gradient(to right, #F9A826, #D4AF37)',
      },
      animation: {
        'fadeIn': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
