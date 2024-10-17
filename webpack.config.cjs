const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const process = require("process");
module.exports = {
  entry: "./index.js",
  target: "web",
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    compress: true,
    port: 4500,
    open: false,
    liveReload: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      filename: "index.html",
      template: path.resolve(__dirname, "index.html"),
      minify: {
        removeComments: true,
      },
    }),
  ],
};
