console.log( '-------- app.js ---------' );

var id = 1;
const a1 = require( './module/a' + id + '.js');
a1();

/*
// const req = require.context("./module/", false, /\.js$/);
const req = require.context("./module/", false, /a1\.js$/);
console.log(req.keys());
var myFun = req('./a'+id+'.js');
myFun();
*/
