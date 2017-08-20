/* eslint import/no-extraneous-dependencies:off, no-console:off */
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');


module.exports = (app) => {
  config.devtool = 'inline-source-map';
  const { entry } = config;
  Object.keys(entry).forEach((key) => {
    entry[key].push('webpack/hot/dev-server', hotMiddlewareScript);
  });
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
      colors: true,
    },
  }));
  app.use(webpackHotMiddleware(compiler));
};
