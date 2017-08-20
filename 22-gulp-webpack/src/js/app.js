require('app.scss');

const _ = require('lodash');

console.log(_.VERSION);

console.log('-------- app.js ---------');
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  require('./app.dev');
}

window.func01 = () => {
  console.log('fun01');
};
