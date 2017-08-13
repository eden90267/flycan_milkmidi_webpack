/*
  █████   ██        
 ██   ██  ██    ██  
██     ██ ██    ██  
██     ██ ██    ██  
██     ██ █████████ 
 ██   ██        ██  
  █████         ██  

要把 css 存成檔案，可以用 extract-text-webpack-plugin
或是參考 03 用 extract-loader
比較兩者
extract-loader：
    require 多少隻 scss, 就會產生同數量的 css 檔
    適合在做多頁面網頁
extract-text-webpack-plugin：
    require 多少隻 scss, 最終都會合拼成一隻 css 檔
    適合在做 single page web
*/
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    modules: [
      path.resolve('src/html'),
      path.resolve('src/img'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
        include: path.resolve(__dirname, 'src/css'),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: 'asset/[path][name].[ext]?[hash:8]',
          },
        },
        include: path.resolve('src/img'),
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('asset/css/app.css')
  ]
};