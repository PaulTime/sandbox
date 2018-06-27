const autoPreFixer = require('autoprefixer');
const postCssNested = require('postcss-nested');

module.exports = {
  parser: 'postcss-scss',
  plugins: [
    postCssNested,
    autoPreFixer,
  ]
};