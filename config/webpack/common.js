// shared config (dev and prod)
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    output: {
      path: resolve("../../assets/bundles/"),
      filename: "[name]-[hash].js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    context: resolve(__dirname, "../../src"),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
                modules: {
                  namedExport: true
                }
              }
            },
            {
              loader: "css-loader",
              options: {
                esModule: true,
                modules: {
                  namedExport: true
                }
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                hash: "sha512",
                digest: "hex",
                name: "img/[hash].[ext]"
              }
            },
            { loader: "image-webpack-loader", options: { bypassOnDebug: true } }
            // "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
          ]
        },
        {
          test: /\.(eot|woff|ttf|svg|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: "file-loader",
            options: {
              limit: 10000
            }
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash].min.css",
        chunkFilename: "css/[id].[hash].css",
        ignoreOrder: false // Enable to remove warnings about conflicting order
      }),
      new HtmlWebpackPlugin({
        template: "index.html"
      })
    ],
    performance: {
      hints: false
    }
  };
};
