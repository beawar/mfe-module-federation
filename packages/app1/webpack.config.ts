import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import "webpack-dev-server";
import pkg from "./package.json" with { type: "json" };

interface Args {
  mode?: webpack.Configuration["mode"];
}

const config = (
  env: Record<string, unknown>,
  args: Args,
): webpack.Configuration => ({
  mode: args.mode,
  entry: "./src/index.ts",
  devtool: "source-map",
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
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        shell: "shell@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        ".": "./src/app",
      },
      shared: {
        react: { singleton: true, requiredVersion: pkg.dependencies.react },
        "react-dom": {
          singleton: true,
          requiredVersion: pkg.dependencies["react-dom"],
        },
      },
      dts: true,
    }),
  ],
  devServer: {
    static: "./dist",
    compress: true,
    port: 3001,
  },
});

export default config;
