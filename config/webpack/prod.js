// production config
const merge = require('webpack-merge');
const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig(), {
  mode: 'production',
  entry: {
    index: './index.tsx',
  },
  output: {
    filename: 'js/[name].[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/static/bundles/',
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css',
      chunkFilename: '[id].[hash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
});
