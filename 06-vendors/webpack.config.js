/*
  █████    ███████  
 ██   ██  ██     ██ 
██     ██ ██        
██     ██ ████████  
██     ██ ██     ██ 
 ██   ██  ██     ██ 
  █████    ███████  
*/
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./js/app.js'],
    vendor: ['jquery', 'mylib']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    alias: {
      'mylib': './libs/mylib.js',
    },
    modules: [
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
        include: [
          path.resolve(__dirname, 'src/js'),
        ],
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity, // assing `Infinity` just creates the commons chunk, but moves no modules into it.
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ]
};