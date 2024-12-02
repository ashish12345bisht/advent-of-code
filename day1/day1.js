const fs = require('fs');

fs.readFile('day1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const inputs =  data.split(`\n`)
  let sum = 0;
  const arr1 = [];
  const arr2 = []
  for(let i = 0; i< inputs.length; i++){
    const [first, second] = inputs[i].split("   ");
    arr1.push(parseInt(first));
    arr2.push(parseInt(second));
  }
  arr1.sort();
  arr2.sort();
  //part 1
  for(let i = 0; i< inputs.length; i++){
    const first = arr1[i]
    const second = arr2[i]
    let diff = first < second ? (second-first) : (first-second);
    sum+=diff;
  }
  console.log(sum)

  //part 2
  const obj = {};
  for(let i = 0; i< inputs.length; i++){
    const second = arr2[i]
    if(obj[second]){
      obj[second] ++ ;
    }else{
      obj[second] = 1
    }
  }
  let ans = 0;
  for(let i = 0; i< inputs.length; i++){
    const first = arr1[i]
    if(obj[first]){
      ans+=(first*obj[first]);
    }
  }
  console.log(ans)
});