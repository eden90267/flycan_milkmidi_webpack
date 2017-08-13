/* 
   ##   ##        
 ####   ##    ##  
   ##   ##    ##  
   ##   ##    ##  
   ##   ######### 
   ##         ##  
 ######       ##  
*/
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
      }],
  },
};
