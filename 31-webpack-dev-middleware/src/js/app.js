require('../css/app.scss');

console.log('-------- app.js ---------');
console.log(process.env.NODE_ENV);

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    console.log('click', Date.now());
  });
});
if (process.env.NODE_ENV === 'development') {
  require('!!raw-loader!../html/index.pug'); // eslint-disable-line
}
