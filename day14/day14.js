const fs = require('fs');

fs.readFile('day14.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const input = data.split('\n');

    const rows = 103; // Length
    const cols = 101; // Width

    // const rows = 7; // Length
    // const cols = 11; // Width

    // Create a 2D array filled with 0
    const arr = Array.from({ length: rows }, () => Array(cols).fill(0));

    let arr2 = [];
    input.forEach((row) => {
        const regex = /p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/;

        const match = row.match(regex);

        if (match) {
            const [_, p1, p2, x, y] = match; // Destructure match groups
            // console.log(`p1: ${p1}, p2: ${p2}, x: ${x}, y: ${y}`);
            arr2.push([Number(p1), Number(p2), Number(x), Number(y)])
            if (arr[Number(p2)][Number(p1)]) {
                arr[Number(p2)][Number(p1)] = arr[Number(p2)][Number(p1)] + 1
            } else {
                arr[Number(p2)][Number(p1)] = 1
            }
        } else {
            console.log("No match found");
        }
    })

    // arr.forEach(item => console.log(JSON.stringify(item)))
    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++")


    let iter = 0;

    let fileTxt = ""
    while (true) {
        let newArr = []
        let broken = false
        arr2.forEach((positions) => {
            const r = positions[1]
            const c = positions[0]
            const dr = positions[3]
            const dc = positions[2]
            arr[r][c]--;
            let newR = r + dr
            let newC = c + dc
            // console.log(r,c,dr,dc, newR, newC)
            if (newR < 0) {
                newR = rows + newR
            }
            else if (newR >= rows) {
                newR = newR % rows
            }
            if (newC < 0) {
                newC = cols + newC
            }
            else if (newC >= cols) {
                newC = newC % cols
            }
            // console.log("changed",newR, newC)

            arr[newR][newC]++;
            // positions[0] = newC;
            // positions[1] = newR;
            // let newArr = [newC, newR, dc, dr]
            // console.log(newArr, "new")

            // positions = [...newArr]
            newArr.push([newC, newR, dc, dr]);

            let count = 0
            arr.forEach((i, iiind) => {
                i.forEach((ii, ind) => {
                    let len = 0
                    // console.log(ii)
                    for(let j = ind; j<i.length; j++){
                        if(i[j]){
                            len++
                        }else{
                            break;
                        }                
                    }
                    if (len >= 20) {
                        // count++;
                        arr.forEach(item => console.log(item.map(num=>num ? "W" : " ").join("")))
                        console.log(iter)
                        broken = true
                        // arr.forEach(item => fileTxt += ((item?.map((i) => i ? "W" : " ").join(""))))
                    }
                })
            })
            if (count === input.length) {
                console.log(count, "equal")
            }
        })
        arr2 = newArr
        // let count = 0
        // arr.forEach(item => {
        //     item.forEach(i => {
        //         if (i) {
        //             count++
        //         }
        //     })
        // })
        // console.log(count, " ", input.length)
        // if (count === input.length) {
        //     console.log(i)
        //     break;
        // }
        if(broken){
            break
        }
        // fileTxt += ("\n\n\n")
        iter++;
    }
    let first = 0, second = 0, third = 0, fourth = 0;
    const midR = Math.floor(rows / 2)
    const midC = Math.floor(cols / 2)

    // arr.forEach((row, ri) => {
    //     row.forEach((cell, ci) => {
    //         if (cell) {
    //             if (ri < (midR) && ci > (midC)) {
    //                 first += cell;
    //             }
    //             else if (ri < (midR) && ci < (midC)) {
    //                 second += cell;
    //             }
    //             else if (ri > (midR) && ci < (midC)) {
    //                 third += cell;
    //             }
    //             else if (ri > (midR) && ci > (midC)) {
    //                 fourth += cell;
    //             }
    //         }
    //     })
    // })

    // console.log(first * second * third * fourth)
    // // console.log(first, second, third, fourth)

    // const filePath = './output.txt';

    // // Write the string to the file
    // fs.writeFile(filePath, fileTxt, (err) => {
    //     if (err) {
    //         console.error('Error writing to file:', err);
    //     } else {
    //         console.log('String successfully written to file:', filePath);
    //     }
    // });

    // arr.forEach(item => console.log(JSON.stringify(item)))

})


