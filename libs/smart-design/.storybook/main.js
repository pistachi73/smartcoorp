const path = require('path');

const { merge } = require('webpack-merge');

const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed

    return merge(config, {
      module: {
        rules: [
          {
            test: /\.(woff|woff2|ttf)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: (url, resourcePath, context) => {
                    // Anything printed; in 'Sources -> webpack' is also missed
                    return `assets/${url}`;
                  },
                },
              },
            ],
            include: path.resolve(__dirname, '../src/assets/'),
          },
        ],
      },
    });
  },
};
