/*
   ██     █████           ██     ██ ████████ ██    ██ ████████   ███████  ████████
 ████    ██   ██          ██     ██ ██       ███   ██ ██     ██ ██     ██ ██     ██
   ██   ██     ██         ██     ██ ██       ████  ██ ██     ██ ██     ██ ██     ██
   ██   ██     ██ ███████ ██     ██ ██████   ██ ██ ██ ██     ██ ██     ██ ████████
   ██   ██     ██          ██   ██  ██       ██  ████ ██     ██ ██     ██ ██   ██
   ██    ██   ██            ██ ██   ██       ██   ███ ██     ██ ██     ██ ██    ██
 ██████   █████              ███    ████████ ██    ██ ████████   ███████  ██     ██

參考文章
https://segmentfault.com/a/1190000005969643
*/
const path = require('path');
const webpack = require('webpack');


module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    // 不用 DllPlugin ，每次都還是會打包一次 vendor, 慢
    vendor: ["./lib/lib1.js", "./lib/lib2.js", 'jquery'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './src/vendor'),
    library: '[name]_[chunkhash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'src/vendor/[name]-manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
  ]
};