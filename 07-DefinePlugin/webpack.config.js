/*
  #####   ######## 
 ##   ##  ##    ## 
##     ##     ##   
##     ##    ##    
##     ##   ##     
 ##   ##    ##     
  #####     ##     
*/
const path = require('path');
const DefinePlugin = require("webpack/lib/DefinePlugin");
const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log('DEV_MODE:',DEV_MODE);
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './js/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    modules: [
      path.resolve('src/js'),
      path.resolve("node_modules"),
    ],
    extensions: [".js"]
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['es2015'] },
      },
      exclude: /node_modules/,
    }, ]
  },
  plugins: [  
    // https://webpack.js.org/plugins/define-plugin/
    new DefinePlugin({
      DEF_BOO: true,
      DEF_NUM: 9527,
      // DEF_STR: "hi webpack",//這樣會有問題
      DEF_OBJ: JSON.stringify({
        obj: 'milkmidi'
      }),
      MY_TEXT: JSON.stringify("我是中文字"),
      WEB_URL: JSON.stringify(DEV_MODE ? 'http://localhost' : 'http://milkmidi.com'),
    }),
  ]
};