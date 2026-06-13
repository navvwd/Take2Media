/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: '#05070d',
        ink: '#090d18',
        frost: 'rgba(255,255,255,0.08)',
        cyan: '#22d3ee',
        electric: '#397bff',
        violet: '#8b5cf6',
        ember: '#ff8a3d',
      },
      boxShadow: {
        glow: '0 0 60px rgba(34,211,238,0.18)',
        violet: '0 0 70px rgba(139,92,246,0.22)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
