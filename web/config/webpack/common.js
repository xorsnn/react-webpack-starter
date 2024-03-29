// shared config (dev and prod)
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = () => {
  return {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                esModule: true,
                modules: {
                  namedExport: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                hash: "sha512",
                digest: "hex",
                name: "img/[hash].[ext]",
              },
            },
            {
              loader: "image-webpack-loader",
              options: { bypassOnDebug: true },
            },
          ],
        },
        {
          test: /\.(eot|woff|ttf|svg|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: "file-loader",
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash].min.css",
        chunkFilename: "css/[id].[hash].css",
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new BundleTracker({
        filename: resolve(__dirname, "../../stats/webpack-stats.json"),
      }),
    ],
    performance: {
      hints: false,
    },
  };
};
