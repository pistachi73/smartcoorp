//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.(woff|woff2|ttf)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    });

    return config;
  },
};

module.exports = withNx(nextConfig);
