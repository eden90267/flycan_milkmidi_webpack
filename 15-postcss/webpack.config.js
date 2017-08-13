/*
   ##   ######## 
 ####   ##       
   ##   ##       
   ##   #######  
   ##         ## 
   ##   ##    ## 
 ######  ######  
*/
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: "source-map",
  resolve: {
    modules: [
      path.resolve('src/html'),
      path.resolve('src/img'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve("node_modules"),
    ],
    extensions: [".js", ".scss"]
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
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        }),
        include: path.resolve(__dirname, "src/css"),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: "asset/[path][name].[ext]?[hash:8]",
          },
        },
        include: path.resolve('src/img'),
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("asset/css/app.css")
  ]
};