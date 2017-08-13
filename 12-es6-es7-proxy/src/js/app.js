/*function loadData(){
  $.get('asset/value1.txt').then(result=>{
    console.log(result);
  });
  $.get('asset/value2.txt').then(result=>{
    console.log(result);
  });
  $.get('asset/value3.txt').then(result=>{
    console.log(result);
  });
}*/

async function loadData(){
  var result1 = await $.get('asset/value1.txt');
  var result2 = await $.get('asset/value2.txt');
  var result3 = await $.get('asset/value3.txt');
  var result4 = await $.get('api?name=webpack');
  console.log(result1, result2, result3, result4);
}
loadData();
