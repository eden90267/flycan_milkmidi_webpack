console.log('test1.js');
class Foo {
  static VERSION = '1.0.0';
  constructor(){
    this.name = 'webpack';
  }
  click = ()=> {
    console.log(this.name);
  }
  foo(){
    console.log(this.name);
  }
}

const map = new Map();
console.log(map);