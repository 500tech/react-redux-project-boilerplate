module.exports = {
  stories: ['../**/*.stories.js'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        scriptsPackageName: '@500tech/react-scripts'
      }
    },
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-addon-intl',
    '@storybook/addon-viewport'
  ]
};
