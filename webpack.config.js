const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env = {}) => {
  const isProd = env.production || process.env.NODE_ENV === "production";

  return {
    entry: "./index.js",
    context: __dirname,
    output: {
      path: resolve(__dirname, "./build"),
      filename: "bundle.js",
      publicPath: "/",
    },
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "eval",
    devServer: {
      port: 8080,
      historyApiFallback: true,
      static: {
        directory: resolve(__dirname, "public"),
      },
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development"),
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
        inject: true,
      }),
    ],
  };
};
