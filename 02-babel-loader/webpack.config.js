/*
  █████    ███████
 ██   ██  ██     ██
██     ██        ██
██     ██  ███████
██     ██ ██
 ██   ██  ██
  █████   █████████
*/
const path = require('path');
module.exports = {
  // https://webpack.js.org/configuration/entry-context/#context
  context: path.resolve(__dirname, './src'),
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: { //https://webpack.js.org/configuration/module/
    rules: [
        {
        test: /\.(js|jsx)$/,
        // 寫法 1, xx-loader?參數(舊寫法，不推)
        // loader: 'babel-loader?presets[]=es2015'
        // 寫法 2 ,use  loader + options(新寫法)
        use: {
          loader: 'babel-loader',
          options: {
            // 轉成es2015格式，支援舊的 Browser
            presets: ['es2015'],
          },
        },
        // 只找這個資料夾下的檔案，可以加速 webpack 打包
        // 如果要多路徑, 可以寫成 Array
        include: path.resolve(__dirname, 'src/js'),
        // 排除文件，加速 webpack 打包
        exclude: /node_modules/,
      },
    ]
  },
};