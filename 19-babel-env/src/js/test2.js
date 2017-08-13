console.log('test2.js');

const name = 'milkmidi';
var o = {
  a:1,
  b:2,
  [name]: 'hi milkmidi'
};
console.log(o);

// IE Error :物件沒有支援這個屬性或方法 'assign'
// 加入 transform-runtime 就會正常
console.log(Object.assign({},o,{c:3}));





// babel-plugin-transform-runtime 有些還是會少
console.log('Array.prototype.find', Array.prototype.find);
console.log('String.prototype.includes', String.prototype.includes);
// console.log("foobar".includes("foo")); // 在 IE 會有 error

