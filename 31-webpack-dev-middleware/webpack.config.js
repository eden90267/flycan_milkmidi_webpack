/*
 #######     ##   
##     ##  ####   
       ##    ##   
 #######     ##   
       ##    ##   
##     ##    ##   
 #######   ###### 
*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: ['./js/app.js'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve('src/html'),
      path.resolve('src/img'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js'],
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
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
        ],
      }),
      include: path.resolve(__dirname, 'src/css'),
      exclude: /node_modules/,
    },
    {
      test: /\.pug$/,
      use: [{
        loader: 'html-loader',
      },
      {
        loader: 'pug-html-loader',
        options: {
          self: true,
          pretty: DEV_MODE,
        },
      },
      ],
      include: [path.resolve(__dirname, 'src/html')],
      exclude: /node_modules/,
    },
    {
      test: /\.(png|jpg|gif|svg|ico)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: '[path][name].[ext]?[hash:10]',
        },
      }],
      include: path.resolve('src/img'),
      exclude: /node_modules/,
    },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: './html/index.pug',
    }),
    new ExtractTextPlugin({
      filename: 'css/app.css',
      disable: DEV_MODE,
    }),
  ],
};
