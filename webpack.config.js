const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new NodePolyfillPlugin(),
    new Dotenv(),
  ],
};
