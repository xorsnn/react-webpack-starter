// development config
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { resolve } = require("path");
const commonConfig = require("./common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const externalHost = process.env.EXTERNAL_HOST || "localhost";

module.exports = merge(commonConfig(), {
  mode: "development",
  output: {
    filename: "js/[name].[hash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/static/bundles/",
  },
  entry: {
    index: [
      `webpack-dev-server/client?http://${externalHost}:3000`, // bundle the client for webpack-dev-server and connect to the provided endpoint
      "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
      "./src/index.tsx", // the entry point of our app
    ],
  },
  devServer: {
    port: 3000,
    hot: true, // enable HMR on the server
    historyApiFallback: true,
    allowedHosts: 'all',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  static: {
      directory: resolve(__dirname, '../../dist'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new HtmlWebpackPlugin(
  {
        template: "./src/index.html",
  }
    ),
  ],
});
