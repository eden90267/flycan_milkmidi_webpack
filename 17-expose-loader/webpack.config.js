/*
   ##   ######## 
 ####   ##    ## 
   ##       ##   
   ##      ##    
   ##     ##     
   ##     ##     
 ######   ##     
*/
const path = require('path');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve("node_modules"),
    ],
    extensions: [".js"],
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery',
          },{
            loader: 'expose-loader',
            options: '$',
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
        ],
        include: path.resolve(__dirname, 'src/html'),
        exclude: /node_modules/,
      },
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 8080,
    stats: {
      chunks: true,
    },
  },
};