/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./**/*.html', './**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        mono: ['Share Tech', ...defaultTheme.fontFamily.mono],
        logo: ['Share Tech Mono'],
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(236,201,75,1)',
      },
    },
    typography: {
      default: {
        css: {
          color: '#1A202C',
        },
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'disabled'],
  },
  plugins: [require('@tailwindcss/typography')],
}
