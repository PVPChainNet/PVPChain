module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: {flexbox: 'no-2009'},
      features: {'nesting-rules': false},
    },
  },
};
