const fs = require('fs');

fs.readFile('day12.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const rows = data.split('\n');
    let arr = [];
    let arr2 = []
    let hsidesObj = {}
    let vsidesObj = {}
    function getPerimeter(r, c, m, n, l) {
        if (r < 0 || r >= m || c < 0 || c >= n || arr[r][c] == l.toLowerCase()) {
            return 0;
        }
        // console.log(r,c,m,n,l, arr[r][c], l);
        if (arr[r][c] != l) {
            return 0;
        }
        let left = 0, right = 0, top = 0, bottom = 0;
        let R, C;
        //left edge
        R = r;
        C = c - 1;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                left++;
            }
        } else {
            left++;
        }

        //right edge
        R = r;
        C = c + 1;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                right++;
            }
        } else {
            right++;
        }

        //top edge
        R = r - 1;
        C = c;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                top++;
            }
        } else {
            top++;
        }

        //bottom edge
        R = r + 1;
        C = c;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                bottom++;
            }
        } else {
            bottom++;
        }
        arr[r][c] = l.toLowerCase();
        // console.log(left, right, top, bottom)
        return (left + right + top + bottom) + getPerimeter(r + 1, c, m, n, l) + getPerimeter(r - 1, c, m, n, l) + getPerimeter(r, c + 1, m, n, l) + getPerimeter(r, c - 1, m, n, l)
    }

    function getSides(r, c, m, n, l) {
        if (r < 0 || r >= m || c < 0 || c >= n || arr[r][c] == l.toLowerCase()) {
            return 0;
        }
        // console.log(r,c,m,n,l, arr[r][c], l);
        if (arr[r][c] != l) {
            return 0;
        }
        let left = 0, right = 0, top = 0, bottom = 0;
        let R, C;
        //left edge
        R = r;
        C = c - 1;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                left++;
                hsidesObj[`${C}*${arr[r][c]}#${R}`] = 1
            }
        } else {
            left++;
            hsidesObj[`l*${arr[r][c]}#${R}`] = 1
        }

        //right edge
        R = r;
        C = c + 1;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                right++;
                hsidesObj[`${arr[r][c]}*${C}#${R}`] = 1

            }
        } else {
            right++;
            hsidesObj[`${arr[r][c]}*r#${R}`] = 1

        }

        //top edge
        R = r - 1;
        C = c;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                top++;
                vsidesObj[`${R}*${arr[r][c]}#${C}`] = 1

            }
        } else {
            top++;
            vsidesObj[`t*${arr[r][c]}#${C}`] = 1

        }

        //bottom edge
        R = r + 1;
        C = c;
        if (!(R < 0 || R >= m || C < 0 || C >= n)) {
            if (arr[R][C] != l && arr[R][C] != l.toLowerCase()) {
                bottom++;
                vsidesObj[`${arr[r][c]}*${R}#${C}`] = 1

            }
        } else {
            bottom++;
            vsidesObj[`${arr[r][c]}*b#${C}`] = 1

        }
        arr[r][c] = l.toLowerCase();

        // console.log(left, right, top, bottom)
        return (left + right + top + bottom) + getSides(r + 1, c, m, n, l) + getSides(r - 1, c, m, n, l) + getSides(r, c + 1, m, n, l) + getSides(r, c - 1, m, n, l)
    }

    function getArea(r, c, m, n, l) {

        if (r < 0 || r >= m || c < 0 || c >= n || arr2[r][c] == '.') {
            return 0;
        }
        if (arr2[r][c] != l) {
            return 0;
        }
        arr2[r][c] = '.'
        return 1 + getArea(r + 1, c, m, n, l) + getArea(r - 1, c, m, n, l) + getArea(r, c + 1, m, n, l) + getArea(r, c - 1, m, n, l)
    }
    rows.forEach((row, ind) => {
        arr.push([]);
        arr2.push([]);
        for (let i = 0; i < row.length; i++) {
            arr[ind].push(row[i]);
            arr2[ind].push(row[i]);
        }
    })

    const groupTogether = (obj) => {
        const grouped = {};
        for (const key in obj) {
            const [code, number] = key.split('#');
            if (!grouped[code]) grouped[code] = [];
            grouped[code].push(Number(number));
        }

        // Step 2: Identify consecutive ranges
        const result = {};
        for (const code in grouped) {
            const numbers = grouped[code].sort((a, b) => a - b);
            let count = 1;
            for (let i = 1; i < numbers.length; i++) {
                if (numbers[i] !== numbers[i - 1] + 1) {
                    count++; // Break in continuity
                }
            }
            result[code] = count;
        }
        return Object.values(result).reduce((sum, i)=>sum+i, 0);
    }

    let ans = 0;
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let val = arr2[i][j]
            if (!obj[val.toLowerCase()]) {
                let area = getArea(i, j, arr2.length, arr2[i].length, val);
                getSides(i, j, arr.length, arr[i].length, val);
                // console.log(vsidesObj)
                // console.log(hsidesObj)
                let sides = groupTogether(hsidesObj) + groupTogether(vsidesObj)
                vsidesObj = {}
                hsidesObj = {}
                ans += (area * sides)
                obj[val] = 1;
            }
        }
    }

    // console.log(sidesObj)
    console.log(ans)
})

// Happy. Did both parts myself. Took a lot of time though. JS sucks. why is a stirng immutable? Why???