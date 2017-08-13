/*
 #######    #####   
##     ##  ##   ##  
       ## ##     ## 
 #######  ##     ## 
##        ##     ## 
##         ##   ##  
#########   #####   
*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log('DEV_MODE:', DEV_MODE);

const config = {
  context: path.resolve('src'),
  entry: {
    app: ['./js/app.js'],
    vendor: [
      'vue',
    ],
  },
  output: {
    filename: 'asset/js/[name].js?[hash]',
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
  },
  resolve: {
    modules: [
      path.resolve('src/component'),
      path.resolve('src/js'),
      path.resolve('src/css'),
      path.resolve('src/asset/img'),
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue'],
  },
};

config.module = {
  rules: [{
    test: /\.vue$/,
    use: {
      loader: 'vue-loader',
      options: {
        extractCSS: true,
      },
    },
    include: path.resolve('src/component'),
    exclude: /node_modules/,
  },
  {
    test: /\.js$/,
    use: 'babel-loader',
    include: [path.resolve('src/js')],
    exclude: /node_modules/,
  },
  {
    test: /\.(png|jpg|gif|svg|ico)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: '[path][name].[ext]?[hash:8]',
      },
    },
    include: [path.resolve('src/asset/img')],
    exclude: /node_modules/,
  },
  {
    test: /\.pug$/,
    use: {
      loader: 'pug-loader',
      options: {
        self: true,
        pretty: DEV_MODE,
      },
    },
  },
  ],
};

config.performance = {
  maxEntrypointSize: 300000,
  hints: !DEV_MODE ? 'warning' : false,
};

config.plugins = [
  new ExtractTextPlugin({
    filename: 'asset/css/[name].css?[hash]',
    disable: DEV_MODE,
  }),
  new HtmlWebpackPlugin({
    template: './html/index.template.pug',
    data: {
      DEV_MODE,
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': DEV_MODE ? '"development"' : '"production"',
  }),
];
module.exports = config;
