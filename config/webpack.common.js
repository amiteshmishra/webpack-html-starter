var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    'vendor': './app/vendor.js',
    'app': './app/main.js'
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.pcss$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },

  postcss: [
    require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: ['ie >= 8', 'last 2 versions']
    })
  ],

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: './app/index.html'
    })
  ]

};