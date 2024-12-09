const fs = require('fs');

fs.readFile('day9.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const rows = data.split(`\n`)
    let str = [];
    let val = 0;
    let isNum = true;
    for (let i = 0; i < data.length; i++) {
        if (isNum) {
            for (let j = 0; j < Number(data[i]); j++) {
                str.push(val.toString());
            }
            val++
        } else {
            for (let j = 0; j < Number(data[i]); j++) {
                str.push('.');
            }
        }
        isNum = !isNum
    }
    // console.log(JSON.stringify(str));
    let i = 0;
    let j = str.length - 1;
    while (j > 0) {
        while (str[j] == '.') {
            j--
        }
        let num = str[j];
        let lastNumInd = j;
        let len = 0;
        while (str[j] == num) {
            len++;
            j--;
        }
        while (1 && i<j) {
            while (str[i] != '.') {
                i++
            }
            let dots = 0;
            let found = false
            while (str[i] == '.' && i < j) {
                dots++;
                if (dots >= len) {
                    let k = i;
                    found = true;
                    while (len > 0) {
                        str[k] = num;
                        str[lastNumInd] = '.';
                        k--;
                        lastNumInd--;
                        len--;
                    }
                    break;
                }
                i++;
            }
            if(found) break;
        }
        // console.log(JSON.stringify(str))
        // console.log("---------------------")
        i = 0
    }
    // console.log(JSON.stringify(str))
    let ans = 0;
    str.forEach((item, ind) => {
        if (item != '.') {
            ans += (Number(item) * Number(ind));
        }
    })
    console.log(ans)
})