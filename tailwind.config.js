module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        2: '2',
        
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
