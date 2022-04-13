// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig(), {
  mode: "production",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    filename: "js/[name].[hash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/static/bundles/",
  },
  devtool: "source-map",
  plugins: [],
});
