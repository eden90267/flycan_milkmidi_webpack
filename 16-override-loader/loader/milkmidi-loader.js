// https://webpack.js.org/development/how-to-write-a-loader/
const loaderUtils = require("loader-utils");
module.exports = function(source) {
  // this.cacheable();
  const options = loaderUtils.getOptions(this);
  console.log(options);
  console.log('milkmidi-loader');
  return source;
};