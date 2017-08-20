/*
 #######  ##        
##     ## ##    ##  
       ## ##    ##  
 #######  ##    ##  
##        ######### 
##              ##  
#########       ##  
*/
const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./js/app.js'],
    vendor: ['jquery', 'mylib']
  },
  output: {
    filename: '[name].js?[chunkhash]',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    alias: {
      'jquery': './libs/fakeJQuery.js',
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
      names: ['vendor','manifest'],
      minChunks: Infinity,
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HashedModuleIdsPlugin(), // 這兩個是一樣的效果
  ]
};