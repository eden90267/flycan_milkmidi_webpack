/* eslint-disable */
if (module.hot) {
  // hack, 讓 pug 也能夠自動 reload
  require('!!raw-loader!index.pug');
  // css hot reload in dev mode
  window.addEventListener('message', (event) => {
    if (typeof event.data === 'string' && event.data.indexOf('webpackHotUpdate') === 0) {
      document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
        if (/localhost/g.test(link.href)) {
          link.href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
        }
      });
    }
  });
}
