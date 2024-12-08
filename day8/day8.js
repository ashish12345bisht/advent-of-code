const fs = require('fs');

fs.readFile('day8.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const rows = data.split(`\n`)
    const arr = [];
    rows.forEach((row, i) => {
        arr.push([])
        for (let j = 0; j < row.length; j++) {
            arr[i].push(row[j])
        }
    }
    )
    let map = {}
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] != '.') {
                if (map[arr[i][j]]) {
                    map[arr[i][j]].push([i, j]);
                } else {
                    map[arr[i][j]] = [[i, j]];
                }
            }
        }
    }
    let ans = 0;

    let ansObj = {}
    let ans2 = 0
    Object.entries(map).forEach(([key, values]) => {
        ans2+=values.length;
        for (let i = 0; i < values.length; i++) {
            for (let j = i + 1; j < values.length; j++) {
                let dx = (Number(values[i][0]) > Number(values[j][0])) ? (Number(values[i][0]) - Number(values[j][0])) : (Number(values[j][0]) - Number(values[i][0]))
                let dy = (Number(values[i][1]) > Number(values[j][1])) ? (Number(values[i][1]) - Number(values[j][1])) : (Number(values[j][1]) - Number(values[i][1]))
                let x1 = values[i][0], x2 = values[j][0], y1 = values[i][1], y2 = values[j][1];
                while ((x1 >= 0 && x1 < rows.length && y1 >= 0 && y1 < rows[0].length) || (x2 >= 0 && x2 < rows.length && y2 >= 0 && y2 < rows[0].length)) {
                    if (Number(x1) > Number(x2)) {
                        x1 += dx;
                        x2 -= dx;
                    } else {
                        x1 -= dx;
                        x2 += dx;
                    }
                    if (Number(y1) > Number(y2)) {
                        y1 += dy;
                        y2 -= dy;
                    } else {
                        y1 -= dy;
                        y2 += dy;
                    }
                    // arr.forEach(item=>console.log(JSON.stringify(item)))
                    // console.log(`${values[i]}, ${values[j]} -> ${dx}, ${dy}, ${x1}, ${y1}, ${x2}, ${y2}`)
                    // console.log("cond 1", x1>=0 && x1<rows.length && y1>=0 && y1<rows[0].length && arr[x1][y1]=='.');
                    // console.log("cond 2", x2>=0 && x2<rows.length && y2>=0 && y2<rows[0].length && arr[x2][y2]=='.');
                    // console.log(ans, "------------")
                    if (x1 >= 0 && x1 < rows.length && y1 >= 0 && y1 < rows[0].length && arr[x1][y1] == '.') {
                        arr[x1][y1] = '#'
                        ans++;
                    }
                    if (x2 >= 0 && x2 < rows.length && y2 >= 0 && y2 < rows[0].length && arr[x2][y2] == '.') {
                        arr[x2][y2] = '#'
                        ans++;
                    }
                }

            }
        }
    })

    console.log(ans+ans2)

})

