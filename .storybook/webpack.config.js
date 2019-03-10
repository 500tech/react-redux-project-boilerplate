const path = require('path');

module.exports = {
  resolve: {
    modules: ['node_modules', path.join(__dirname, '..', 'src')]
  },
  module: {
    rules: [
      {
        test: /\.stories\.tsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre'
      }
    ]
  }
};
