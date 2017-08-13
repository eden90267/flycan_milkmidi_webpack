// https://webpack.js.org/guides/code-splitting-async/#chunk-names
import 'es6-promise/auto';
import '../html/index.html';

document.getElementById('btn')
  .addEventListener('click',() => {
    import('./lib')
      .then(({add}) => console.log(add(2,2)))
      .catch(err => console.log('Failed to load lib', err));
  });

document.getElementById('btn2')
  .addEventListener('click', async () => {
    const {add} = await import('./lib');
    const num1 = Math.random() * 10 | 0;
    const num2 = Math.random() * 10 | 0;
    document.querySelector('.info').innerHTML = add(num1, num2).toString();
  });

document.getElementById('btn3')
  .addEventListener('click', async() => {
    const { name, age , amount:score } = await import(/* webpackChunkName: "setting" */'./setting');
    console.log(name,age,score);
  });