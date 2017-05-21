'use strict'

var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

var config = {
  output: {
    library: 'ReactTransfer',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [
        /node_modules/,
      ],
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

if(env === 'development') {
  config.devtool = 'inline-source-map';
}

module.exports = config;
