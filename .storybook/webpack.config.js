const path = require('path');

module.exports = async ({ config, mode }) => {
  config.resolve.modules = ['node_modules', path.join(__dirname, '..', 'src')];

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@500tech/babel-preset-react-app']
        }
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  });

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  });

  return config;
};
