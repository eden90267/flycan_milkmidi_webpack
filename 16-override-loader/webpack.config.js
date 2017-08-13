/*
   ##    #######  
 ####   ##     ## 
   ##   ##        
   ##   ########  
   ##   ##     ## 
   ##   ##     ## 
 ######  #######  
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
    alias: {
      "milkmidi-loader": path.join(__dirname, "milkmidi-loader")
    },
    extensions: [".js"],
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, "loader")]
  },
  module: {
    rules: [{
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
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'milkmidi-loader',
            options: {
              name: 'milkmidi'
            }
          },
          'css-loader',
          'sass-loader',
        ],
        include: path.resolve(__dirname, "src/css"),
        exclude: /node_modules/,
      },
    ]
  }
};