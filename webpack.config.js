const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "js", "main.js"),
  },
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    overlay: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|png|gif|svg|ico)/,
        include: [path.join(__dirname, "images")],
        exclude: [path.resolve(__dirname, "node_modules")],
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src", "js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].bundle.css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      template: "index.html",
      filename: "index.html",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      garage: [path.resolve(__dirname, "src", "js", "garage.js"), "Garage"],
    }),
  ],
};
