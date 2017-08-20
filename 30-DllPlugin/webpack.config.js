/*
 #######    #####   
##     ##  ##   ##  
       ## ##     ## 
 #######  ##     ## 
       ## ##     ## 
##     ##  ##   ##  
 #######    #####   
*/
const path = require('path');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const ProvidePlugin = require("webpack/lib/ProvidePlugin");
const webpack = require('webpack');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var VENDOR_NAME = (require('./src/vendor/vendor-manifest.json').name).replace('_', '.') + '.js';
console.log(VENDOR_NAME);
module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: ['./js/app.js'],
  },
  output: {
    filename: '[name].js?[hash]',
    path: path.resolve(__dirname, './dist'),
  },
  resolveLoader: {
    moduleExtensions: ["-loader"], // -loader 可以不用打
  },
  // devtool: "source-map",  // 加了之後，就會產生 .map 檔,
  // devtool:"inline-source-map",    // 把 sourceMap 寫在該檔案的最下方
  resolve: {
    alias: {      
    },
    modules: [
      path.resolve('src/html'),
      path.resolve('src/img'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve("node_modules"),
      path.resolve("bower_components"),
    ],
    extensions: [".js", ".scss"]
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        },
      },
      include: [
        path.resolve(__dirname, "src/js"),
      ],
      exclude: /(node_modules|bower_components)/,
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'vendor/*.js',
      to: "./"
    }]),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./src/vendor/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: "html/index.template.html",
      filename: "index.html"
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['vendor/' + VENDOR_NAME],
      append: false
    })
  ]
};