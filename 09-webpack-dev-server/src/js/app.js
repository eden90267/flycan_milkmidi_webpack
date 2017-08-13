import _ from 'lodash';

import {foo} from './util';
import "app.scss";
import "index.html";

console.log('-------- app.js ---------');
console.log(process.env.NODE_ENV);

foo('milkmidi');

const o = {a:1, b:2};
console.log(_.assign({c:2},o));

// hack, 讓 html 也能夠自動 reload
if (process.env.NODE_ENV === "development") {
  require("!!raw-loader!index.html");
}