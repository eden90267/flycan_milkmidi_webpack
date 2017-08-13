/*
  █████    ███████
 ██   ██  ██     ██
██     ██        ██
██     ██  ███████
██     ██        ██
 ██   ██  ██     ██
  █████    ███████
*/
const path = require('path');
const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // 在 require 檔案, 如果不想寫完整的路徑
    // 可以加入這些目錄, 讓 webpack 自動尋找對的檔案
    modules: [
      path.resolve('src/html'),
      path.resolve('src/img'),
      path.resolve('src/css'),
      path.resolve('src/js'),
      path.resolve('node_modules'), // 這個一定要加
    ],
    // 在 require 時可以不用打副檔名
    extensions: ['.js'],
  },
}

const js = {
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader',
    options: { presets: ['es2015'] },
  },
  exclude: /node_modules/,
};


/* 多 loader 組合
寫法1
  可寫成一行，或是使用 use, 處理順序是由後往前, 舊寫法, 不推
  loader: 'style!css?sourceMap!sass?sourceMap'
寫法 2
  use: [
    'style-loader',
    'css-loader?sourceMap',
    'sass-loader?sourceMap'
  ],
https://webpack.js.org/configuration/module/#rule-use
*/
const css = {
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader' },
  ],
  include: path.resolve(__dirname, 'src/css'),
  exclude: /node_modules/,
}

const cssExtract = {
  test: /\.scss$/,
  use: [
    {
      loader: 'file-loader',
      options: { name: '[path][name].css' }
    },
    { loader: 'extract-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader' },
  ],
  include: path.resolve(__dirname, 'src/css'),
  exclude: /node_modules/,
}

/*
只用 html-loader , 會把 html 的 code 包在 js 裡，不是我們要的
只用 file-loader , 只會單純的 copy 檔案過去, 不會處理 img src 的圖片
*/
const html = {
  test: /\.html$/,
  use: [
    {
      loader: 'file-loader',
      options: { name: '[name].[ext]' }
    },
    { loader: 'extract-loader' },
    { loader: 'html-loader' },
  ],
  include: path.resolve(__dirname, 'src/html'),
  exclude: /node_modules/,
};

const img = {
  test: /\.(png|jpg|gif|svg|ico)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 2048, // 小於 2048k 的圖檔, 自動變成 base64 字串
      // 檔名： asset/[字資料夾][檔名].[副檔名]?[檔案的hash]
      name: '[path][name].[ext]?[hash:10]',
    },
  },
  include: path.resolve('src/img'),
  exclude: /node_modules/,
};
config.module = {
  rules: [
    js,
    css,
    // cssExtract,
    html,
    img
  ]
}

module.exports = config;