/*
  #####    #######
 ##   ##  ##     ##
##     ## ##     ##
##     ##  ########
##     ##        ##
 ##   ##  ##     ##
  #####    #######
*/
const path = require('path');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log(`DEV_MODE:${DEV_MODE}`);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./js/app.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
    rules: [{
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        },
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
        include: path.resolve(__dirname, "src/css"),
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          },
          { loader: 'extract-loader' },
          { loader: 'html-loader' },
        ],
        include: [path.resolve(__dirname, "src/html")],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: "asset/[path][name].[ext]?[hash:10]",
          },
        }, ],
        include: path.resolve('src/img'),
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    })
  ],
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: './dist',
    port: 8080,
    // https://webpack.js.org/configuration/stats/
    stats: {
      chunks: true,  // Add built modules information to chunk information
    },
    // 讓外部裝置能夠連 localhost
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};