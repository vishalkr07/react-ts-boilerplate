import path from "path";
import HTMLWebPackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import findFreePorts from "find-free-ports";

const getWebpackConfig = async () => {
  const [port] = await findFreePorts(1, { startPort: 3000 });
  return {
    mode: "development",
    target: "web",
    entry: "./src/index.tsx",
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
      new ReactRefreshWebpackPlugin(),
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
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        },
      ],
    },
    devServer: {
      contentBase: [path.join(__dirname, "assets")],
      hotOnly: true,
      port,
      open: true,
    },
  };
};

export default () => {
  return getWebpackConfig();
};
