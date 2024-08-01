import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import "webpack-dev-server";
import pkg from "./package.json" with { type: "json" };
import type { WebpackConfiguration } from "webpack-dev-server";

interface Args {
  mode?: WebpackConfiguration["mode"];
}

const config = (
  env: Record<string, unknown>,
  args: Args,
): WebpackConfiguration => {
  return {
    mode: args.mode,
    devtool: "source-map",
    entry: "./src/index.ts",
    output: {
      path: path.resolve(import.meta.dirname, "dist"),
      filename: "index.js",
      publicPath: "auto",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new ModuleFederationPlugin({
        name: "shell",
        filename: "remoteEntry.js",
        shared: {
          react: { singleton: true, requiredVersion: pkg.dependencies.react },
          "react-dom": {
            singleton: true,
            requiredVersion: pkg.dependencies["react-dom"],
          },
        },
        dts: true,
        exposes: {
          ".": "./src/app-exports.ts",
        },
      }),
    ],
    devServer: {
      static: {
        directory: path.join(import.meta.dirname, "public"),
      },
      compress: true,
      port: 3000,
    },
  };
};

export default config;
