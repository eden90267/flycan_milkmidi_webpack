/*
   ##    #######  
 ####   ##     ## 
   ##          ## 
   ##    #######  
   ##   ##        
   ##   ##        
 ###### ######### 
*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log(`DEV_MODE:${DEV_MODE}`);

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: ['./js/app.js'],
  },
  output: {
    filename: '[name]-bundle-[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: DEV_MODE ? 'http://localhost:8080/' : '',
  },
  resolve: {
    modules: [
      path.resolve('src/html'),
      path.resolve('src/img'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve('node_modules'),
    ],
    extensions: [".js"]
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',// presets 搬到 .babelrc
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
        include: path.resolve(__dirname, "src/css"),
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
              self: true,
              pretty: DEV_MODE,
            },
          }
        ],
        include: path.resolve(__dirname, "src/html"),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: "asset/[path][name].[ext]?[hash:10]",
            },
          },
        ],
        include: path.resolve('src/img'),
        exclude: /node_modules/,
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
    copyWebpackPlugin([
        { from: 'asset', to: './asset' },
    ]),
  ],
  devServer: {
    contentBase: "dist",
    port: 8080,
    proxy: {
      // https://github.com/chimurai/http-proxy-middleware
      "/api": {
        target: "https://webpack-proxy-demo-milkmidi.c9users.io",
        changeOrigin: true,// changes the origin of the host header to the target URL
      },
    },
    stats: {
      chunks: false,
      colors: true,
    },
  },
};