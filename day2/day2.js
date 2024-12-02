const fs = require('fs');

fs.readFile('day2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const inputs =  data.split(`\n`)
  let ans1 = 0;
  const unsafeReports = []
  //part 1
  for(let i = 0; i< inputs.length; i++){
    const level = inputs[i].split(" ");
    let sign = (parseInt(level[0])>parseInt(level[1])) ? -1 : 1;
    let safe = true;
    let unsafeInd = 0;
    for(let j = 0; j< level.length - 1; j++){
        if(sign===1 && ((parseInt(level[j]) > parseInt(level[j+1])))){
            safe = false;
            unsafeInd = j;
            break;
        }else if(sign===-1 && ((parseInt(level[j]) < parseInt(level[j+1])))){
            safe = false;
            unsafeInd = j;
            break;
        }
        const diff = (sign<0) ? (parseInt(level[j]) - parseInt(level[j+1])) : (parseInt(level[j+1]) - parseInt(level[j]))
        if(diff>3 || diff<=0){
            safe = false;
            unsafeInd = j;
            break;
        }
    }
    if(!safe){
        safe = true;
        const newLevel1 = level.filter((item, ind) => ind!=unsafeInd);
        const newLevel2 = level.filter((item, ind) => ind!=(unsafeInd+1));
        sign = (parseInt(newLevel1[0])>parseInt(newLevel1[1])) ? -1 : 1;
        for(let j = 0; j< newLevel1.length - 1; j++){
            if(sign===1 && ((parseInt(newLevel1[j]) > parseInt(newLevel1[j+1])))){
                safe = false;
                break;
            }else if(sign===-1 && ((parseInt(newLevel1[j]) < parseInt(newLevel1[j+1])))){
                safe = false;
                break;
            }
            const diff = (sign<0) ? (parseInt(newLevel1[j]) - parseInt(newLevel1[j+1])) : (parseInt(newLevel1[j+1]) - parseInt(newLevel1[j]))
            if(diff>3 || diff<=0){
                safe = false;
                break;
            }
        }
        if(!safe){
            
            safe = true
            sign = (parseInt(newLevel2[0])>parseInt(newLevel2[1])) ? -1 : 1;
            for(let j = 0; j< newLevel2.length - 1; j++){
                if(sign===1 && ((parseInt(newLevel2[j]) > parseInt(newLevel2[j+1])))){
                    safe = false;
                    break;
                }else if(sign===-1 && ((parseInt(newLevel2[j]) < parseInt(newLevel2[j+1])))){
                    safe = false;
                    break;
                }
                const diff = (sign<0) ? (parseInt(newLevel2[j]) - parseInt(newLevel2[j+1])) : (parseInt(newLevel2[j+1]) - parseInt(newLevel2[j]))
                if(diff>3 || diff<=0){
                    safe = false;
                    break;
                }
            }
        }
    }
    ans1+=(safe ? 1 : 0)
  }
  console.log(ans1)

  //part 2

});