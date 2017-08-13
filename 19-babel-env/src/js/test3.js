console.log('test3.js');

Promise.resolve()
  .then(() => console.log('hi, webpack'));  

const delay = (time = 500) => new Promise( resolve=> setTimeout(resolve, time));

const start = async ()=>{
  await delay()
  console.log(1);
  await delay()
  console.log(2);
  await delay()
  console.log(3);
}
start(); 