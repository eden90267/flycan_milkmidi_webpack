/* eslint global-require:off, no-console:off */
const gulp = require('gulp');
const changed = require('gulp-changed');
const size = require('gulp-size');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const WebpackDevServer = require('webpack-dev-server');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const rimraf = require('rimraf');

const host = 'localhost';
const port = 8080;
const URI = `http://${host}:${port}/`;

gulp.task('rimraf', cb => rimraf('./dist', cb));

gulp.task('m', () => {
  const IMG_SRC = ['src/img_src/**/*.+(jpg|png|gif)'];
  const DIST = 'src/img';

  return gulp.src(IMG_SRC)
    .pipe(changed(DIST))
    .pipe(size({ showFiles: true }))
    .pipe(imagemin([
      imageminMozjpeg({
        quality: 90,
      }),
      imageminPngquant({
        quality: 90,
      }),
    ]))
    .pipe(gulp.dest(DIST));
});

gulp.task('webpack-dev-server', (cb) => {
  process.env.NODE_ENV = 'development';

  const config = require('./webpack.config');
  config.devtool = 'cheap-module-eval-source-map'; // 這會抓到 mixin 裡的路徑
  config.devtool = 'eval-source-map'; // 這會抓到 mixin 裡的路徑
  // config.devtool = 'inline-source-map'; // 要用這個才會對

  const { entry } = config;
  Object.keys(entry).forEach((key) => {
    entry[key].unshift(`webpack-dev-server/client?${URI}`, 'webpack/hot/dev-server');
  });
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer.hot = true;
  const server = new WebpackDevServer(webpack(config), config.devServer);
  server.listen(port, host, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('[webpack-dev-server]', URI);
    cb();
  });
});

gulp.task('webpack-build', () => {
  process.env.NODE_ENV = 'production';
  const config = require('./webpack.config');
  const compiler = webpack(config);
  compiler.apply(new webpack.ProgressPlugin());
  compiler.run((err, stats) => {
    if (err) {
      throw new Error('err');
    }
    if (stats.hasErrors()) {
      console.error(stats.toString('errors-only'));
      return;
    }
    // https://github.com/webpack/docs/wiki/node.js-api
    console.log('[webpack:build]', stats.toString({
      colors: true,
      chunks: false, // Makes the build much quieter
      // chunkModules: false,
    }));
  });
});


gulp.task('p', () => runSequence('rimraf', 'm', 'webpack-build'));

gulp.task('watch', () => {
  gulp.watch('src/img_src/**/*', ['m']);
});


gulp.task('default', ['watch', 'webpack-dev-server']);
