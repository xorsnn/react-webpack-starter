// development config
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");

const externalHost = process.env.EXTERNAL_HOST || "localhost";

module.exports = merge(commonConfig(), {
  mode: "development",
  entry: {
    index: [
      "react-hot-loader/patch", // activate HMR for React
      `webpack-dev-server/client?http://${externalHost}:8080`, // bundle the client for webpack-dev-server and connect to the provided endpoint
      "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
      "./index.tsx" // the entry point of our app
    ]
  },
  output: {
    publicPath: "/static/bundles/"
  },
  devServer: {
    hot: true // enable HMR on the server
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // enable HMR globally
  ]
});
