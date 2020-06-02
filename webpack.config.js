const path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  output: {
    pathinfo: true,
    filename: "[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: [path.join(__dirname, "assets")],
    hotOnly: true,
  },
};
