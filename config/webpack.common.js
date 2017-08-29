const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pagesConfig = require('./webpack.pages');
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader?importLoaders=1',
            postcssLoader,
            'sass-loader'
          ]
        }),
      },
      {
        test: /\.(jpg|png|gif|svg|otf|woff|woff2)$/,
        use: ['url-loader?limit=10000']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
});
