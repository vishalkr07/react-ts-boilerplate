const path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  output: {
    pathinfo: true,
    filename: "[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
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
