/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app/index.tsx",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: "./src/app",
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
      template: "src/app/index.html",
      filename: "index.html",
    }),
  ],
};
