console.log('-------- app.js ---------');
// http://es6-features.org/#Constants

const CLASS_NAME = 'webpackTutorial';
// CLASS_NAME = 'fakeValue';
let name = 'milkmidi';
console.log(`${name} hi, ${CLASS_NAME}`);

let obj = { a: 1,b: 2,c: 3 };
const { a, b, c } = obj;

let arr = [0, 1, 2, 3, 4];
const [a0, a1] = arr;

class MyApp {
  constructor() {
    console.log('MyApp constructor');
  }
  foo() {
    console.log('foo');
    this.addEventListener('click', () => {
      console.log(this);
    });
  }
}

var app = new MyApp();

(() => {
  console.log('arrow function');
})();