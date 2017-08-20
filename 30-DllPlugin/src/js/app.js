console.log( 'app.js' );
var $ = require('jquery');
console.log( $ );
// console.log( 'vue' );

import { init } from './model';
init();

import lib1 from '../lib/lib1'
lib1();

import lib2 from '../lib/lib2'
lib2();
