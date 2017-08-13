console.log( '-------- app.js ---------' );

var id = 1; // 一定得1, 2就會：Error: Cannot find module './a2.js'.
// const a1 = require( './module/a' + id + '.js');
// a1();


// const req = require.context("./module/", false, /\.js$/);
const req = require.context("./module/", false, /a1\.js$/);
console.log(req.keys());
var myFun = req('./a'+id+'.js');
myFun();

