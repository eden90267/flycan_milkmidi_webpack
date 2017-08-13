/*
 #######     ##   
##     ##  ####   
       ##    ##   
 #######     ##   
##           ##   
##           ##   
#########  ######  
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log('DEV_MODE:', DEV_MODE);


const config = {
  context: path.resolve('src'),
  entry: {
    app: ['./js/index.jsx'],
    vendor: ['react', 'react-dom', 'react-router'],
  },
  output: {
    filename: 'asset/js/[name].js?[hash]',
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
  },
  resolve: {
    modules: [
      path.resolve('src/html'),
      path.resolve('src/js'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: path.resolve('src'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
        include: path.resolve(__dirname, 'src/css'),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: 'asset/[path][name].[ext]?[hash:10]',
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new HtmlWebpackPlugin({
      template: 'html/index.template.pug',
      data: {
        DEV_MODE,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"',
    }),
  ],
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    port: 8080,
    stats: {
      chunks: false,
    },
  },
};

module.exports = config;
