require('app.scss')
console.log('-------- app.js ---------');
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  require('./app.dev');
}