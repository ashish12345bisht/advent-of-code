const fs = require('fs');

fs.readFile('day10-test2.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    let arr = [];
    const rows = data.split('\n')
    rows.forEach((row, ind)=>{
        arr.push([]);
        for(let i=0; i<row.length;i++){
            arr[ind].push(row[i]);
        }
    })
    let obj = {}
    function findSummit(row, col){
        if(row<0 || row>=arr.length || col<0 || col>=arr[0].length){
            return 0;
        }
        if(arr[row][col]==9){
            // uncomment the commented part to get part 1 ans
            // if(obj[`${row}-${col}`]){
            //     return 0;
            // }else{
            //     obj[`${row}-${col}`] = 1
                return 1
            // }
        }
        let res = 0
        if(!((row+1)<0 || (row+1)>=arr.length || col<0 || col>=arr[0].length) &&  arr[(row+1)][col]==Number(arr[row][col])+1){
            res+=findSummit((row+1), col);
        }

        if(!((row-1)<0 || (row-1)>=arr.length || (col)<0 || (col)>=arr[0].length) &&  arr[(row-1)][(col)]==Number(arr[row][col])+1){
            res+=findSummit((row-1), (col));
        }

        if(!(row<0 || row>=arr.length || (col+1)<0 || (col+1)>=arr[0].length) &&  arr[row][(col+1)]==Number(arr[row][col])+1){
            res+=findSummit(row, (col+1));
        }

        if(!((row)<0 || (row)>=arr.length || (col-1)<0 || (col-1)>=arr[0].length) &&  arr[(row)][(col-1)]==Number(arr[row][col])+1){
            res+=findSummit((row), (col-1));
        }
        return res;
    }
    let ans = 0;
    for(let i=0; i<arr.length; i++){
        for(let j = 0; j<arr[i].length; j++){
            if(arr[i][j]=='0'){
                ans+=(findSummit(i, j))
                obj = {}
            }
        }
    }
    console.log(ans)
})