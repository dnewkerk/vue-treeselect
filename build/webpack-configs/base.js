const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const utils = require('./utils')

module.exports = {
  // resets the default mode
  mode: 'none',

  resolve: {
    extensions: [ '.js', '.json', '.vue' ],
    alias: {
      // for consistent docs
      '@riophae/vue-treeselect': utils.resolve('src'),
      // for shorter import path in tests
      '@src': utils.resolve('src'),
    },
  },

  module: {
    rules: [
      utils.withCacheLoader({
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
            compatConfig: {
              MODE: 3,
            },
          },
        },
      }),
      utils.withCacheLoader({
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [ 'src', 'docs', 'test' ].map(utils.resolve),
      }),
      utils.withCacheLoader({
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      }),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },

  optimization: {
    concatenateModules: true,
    noEmitOnErrors: true,
  },

  node: {
    process: false,
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      PKG_VERSION: JSON.stringify(require('../../package').version),
    }),
  ],
}
