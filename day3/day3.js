const fs = require('fs');

fs.readFile('day3.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const regex = /mul\((\d+),\s*(\d+)\)|don't\(\)|do\(\)/g;

    const matches = [];
    let match;
    let isEnabled = false;
    let ans = 0;
    while ((match = regex.exec(data)) !== null) {
        //     fullMatch: match[0],  // Full pattern match
        //     num1: match[1],       // First number
        //     num2: match[2]        // Second number
        const fullMatch = match[0];

        if (fullMatch === "don't()") {
            isEnabled = true; // Start ignoring `mul()` functions
        } else if (fullMatch === "do()") {
            isEnabled = false; // Stop ignoring `mul()` functions
        } else if (!isEnabled && fullMatch.startsWith("mul(")) {
            ans += (parseInt(match[1]) * parseInt(match[2]))
        }
    }
    console.log(ans);
});