import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import "webpack-dev-server";

interface Args {
  mode?: webpack.Configuration["mode"];
}

const config = (
  env: Record<string, unknown>,
  args: Args,
): webpack.Configuration => {
  return {
    mode: args.mode,
    entry: "./src/index.ts",
    output: {
      path: path.resolve(import.meta.dirname, "dist"),
      filename: "index.js",
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
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      }),
    ],
    devServer: {
      static: {
        directory: path.join(import.meta.dirname, "public"),
      },
      compress: true,
      port: 9000,
    },
  };
};

export default config;
