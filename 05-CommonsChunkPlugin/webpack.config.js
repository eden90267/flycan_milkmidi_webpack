/*
  █████   ████████
 ██   ██  ██
██     ██ ██
██     ██ ███████
██     ██       ██
 ██   ██  ██    ██
  █████    ██████
*/
const path = require('path');
// https://webpack.js.org/plugins/commons-chunk-plugin/
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './js/app.js',
    login: './js/login.js'
  },
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
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'commons', // (the commons chunk name)
      filename: 'commons.js', // (the filename of the commons chunk)
      minChunks: 0,
    })
  ]
};