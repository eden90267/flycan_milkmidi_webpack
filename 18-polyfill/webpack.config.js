/*
   ##    #######  
 ####   ##     ## 
   ##   ##     ## 
   ##    #######  
   ##   ##     ## 
   ##   ##     ## 
 ######  #######  
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log(`DEV_MODE:${DEV_MODE}`);

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: './js/app.js',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  resolve: {
    modules: [
      path.resolve('src/html'),
      path.resolve('src/js'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js']
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use:[
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: DEV_MODE,
            },
          }
        ],
        include: path.resolve(__dirname, 'src/html'),
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
    new HtmlWebpackPlugin({
      template: './html/index.pug',
    }),

    ...DEV_MODE ?
    [
      new FriendlyErrorsWebpackPlugin()
    ]
    : []
  ],
  devServer: {
    contentBase: 'dist',
    port: 8080,
    stats: {
      chunks: false,
    },
  },
};