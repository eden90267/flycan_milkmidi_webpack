/*
   ##    #######  
 ####   ##     ## 
   ##          ## 
   ##    #######  
   ##          ## 
   ##   ##     ## 
 ######  #######  
*/
const path = require('path');
module.exports = {
  context: path.join(__dirname, '/src'),
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader' },
        include: path.resolve(__dirname, "src/js"),
        exclude: /node_modules/,
      }, 
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          },
        ],
        include: [path.resolve(__dirname, "src/html")],
        exclude: /node_modules/,
      },
    ]
  }
};