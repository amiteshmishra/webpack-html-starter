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
    'styles': './app/css/main.scss',
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
          ],
          publicPath: '../',
        }),
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: ['url-loader?limit=1&name=assets/images/[hash].[ext]']
      },
      {
        test: /\.(otf|ttf|woff|woff2)$/,
        use: ['url-loader?limit=1&name=assets/fonts/[name].[ext]']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("./styles/[name].css"),
  ]
});
