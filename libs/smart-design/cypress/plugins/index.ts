import webpackPreprocessor from '@cypress/webpack-preprocessor';

import webpackConfig from '../webpack.config';

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on: any, config: any) => {
  // ... other prior config

  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions: webpackConfig,
    })
  );

  return config;
};
