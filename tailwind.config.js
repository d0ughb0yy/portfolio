/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: {
          DEFAULT: '#0f172a',
          elevated: '#1e293b',
        },
        border: '#334155',
        accent: {
          DEFAULT: '#22c55e',
          hover: '#16a34a',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
          dim: '#64748b',
        },
      },
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'accent-glow': '0 0 24px rgba(34,197,94,0.25)',
        'accent-glow-sm': '0 0 16px rgba(34,197,94,0.3)',
      },
    },
  },
  plugins: [],
}
