"use strict";
const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV;

const config = {
  entry: "./example/src/index.js",

  output: {
    path: path.join(__dirname, "example/dist"),
    publicPath: "http://localhost:3000/dist/",
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel-loader",
      include: [
        path.join(__dirname, "src"),
        path.join(__dirname, "example/src"),
      ],
      exclude: [
        /node_modules/,
      ],
    }]
  },

  plugins: []
};

if(env === "server") {
  config.output.filename = "main.js";
  config.devtool = "source-map";
  config.devServer = {
    contentBase: "example",
    port: 3000
  };
}

if(env === "development") {
  config.output.filename = "main.js";
  config.devtool = "source-map";
}

if(env === "production") {
  config.output.filename = "main.min.js";
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
