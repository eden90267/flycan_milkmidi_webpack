/*
  #####    #######  
 ##   ##  ##     ## 
##     ## ##     ## 
##     ##  #######  
##     ## ##     ## 
 ##   ##  ##     ## 
  #####    #######  
*/
// https://webpack.js.org/guides/dependency-management/
const path = require('path');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
        include: path.resolve(__dirname, "src/js"),
        exclude: /node_modules/,
      }, 
    ]
  }
};