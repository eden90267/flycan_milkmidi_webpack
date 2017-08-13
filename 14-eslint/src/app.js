import util, { foo } from './util';


console.log(util);
console.log(foo());

const a = 'milkmidi';
function name(params) {
  params.name = 'milkmidi';
  console.log('123');
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
}
console.log('log');
