const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

var commonConfig = require('./webpack.common');

const ENV = process.env.BUILD_DEV = process.env.NODE_ENV = process.env.ENV = 'dev';

module.exports = webpackMerge(commonConfig, {

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    compress: true,
    contentBase: './app/assets',
    historyApiFallback: true,
    stats: 'minimal'
  }

});
