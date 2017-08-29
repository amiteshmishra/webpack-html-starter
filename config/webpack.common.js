var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var pagesConfig = require('./webpack.pages');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: (loader) => [
      require('postcss-import')(),
      require('postcss-cssnext')({
        browsers: ['ie >= 8', 'last 2 versions']
      }),
    ],
  },
};

module.exports = webpackMerge(pagesConfig, {
  entry: {
    'vendor': './app/vendor.js',
    'app': './app/main.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          postcssLoader,
          'sass-loader'
        ],
      },
      {
        test: /\.pcss$/,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader,
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: ['url-loader?limit=10000']
      }
    ]
  }
});
