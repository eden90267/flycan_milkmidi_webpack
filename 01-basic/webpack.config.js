/*
  █████      ██
 ██   ██   ████
██     ██    ██
██     ██    ██
██     ██    ██
 ██   ██     ██
  █████    ██████
*/
const path = require('path');
module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
/*
Shortcuts
https://webpack.js.org/api/cli/#shortcuts
-d
--debug --devtool eval-cheap-module-source-map --output-pathinfo
-p
--optimize-minimize --define process.env.NODE_ENV="production", see building for production
*/
// https://webpack.js.org/guides/production/