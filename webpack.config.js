var path = require('path');
var webpack = require('webpack');
var vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.core.rules;
var cssRules = require('vtk.js/Utilities/config/dependency.js').webpack.css.rules;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var entry = path.join(__dirname, './src/index.js');
const sourcePath = path.join(__dirname, './src');
const outputPath = path.join(__dirname, './docs');

module.exports = {
  entry,
  output: {
    path: outputPath,
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(png|jpg)$/, use: 'url-loader?limit=81920' },
      { test: /\.svg$/, use: [{ loader: 'raw-loader' }] }
    ].concat(vtkRules, cssRules)
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inlineSource: '.(js|css)$',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: false, // we have a comment in the body tag for injecting data
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.js']
    })
  ]
};
