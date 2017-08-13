console.log('-------- app.js ---------');
console.log(process.env.NODE_ENV);

require('./test1.js');
require('./test2.js');
require('./test3.js');

import 'babel-polyfill';