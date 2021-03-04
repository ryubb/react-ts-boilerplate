/* eslint-disable no-undef */
// いつか使う可能性が高いため、コメントアウトで対処している
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./app/index.tsx",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: "./app",
    publicPath: "/",
    compress: true,
    hot: true,
    host: "localhost",
    port: 3000,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
      { test: /\.css$/, use: "css-loader" },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: "app/index.html",
      filename: "index.html",
    }),
  ],
};
