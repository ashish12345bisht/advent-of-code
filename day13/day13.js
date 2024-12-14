const fs = require('fs');

fs.readFile('day13.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const rows = data.split('\n')
    let j = 0
    const problems = []
    let obj = {}

    const findMinSteps = (x1, y1, x2, y2, x, y, tx, ty) => {
        // console.log(x1, y1, x2, y2, x, y, tx, ty)
        // if()
        // if(x>tx || y>ty){
        //     return Infinity
        // }
        // console.log("lesssssssssssssssssssssssssssssss")
        // if(x==tx && y==ty){
        //     return 0;
        // }
        // console.log("inside")
        // let A = 1 + findMinSteps(x1,y1,x2,y2,Number(x)+Number(x1), Number(y)+Number(y1), tx, ty)
        // let B = 1 + findMinSteps(x1,y1,x2,y2,Number(x)+Number(x2), Number(y)+Number(y2), tx, ty)

        // return A < B ? A : B;

    }
    function solveEquations(x1, y1, x2, y2, tx, ty) {
        // Coefficients matrix
        const matrix = [
            [x1, x2],
            [y1, y2]
        ];

        // Constants matrix
        const constants = [tx, ty];

        // Calculate determinant
        const determinant = (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);

        if (determinant === 0) {
            throw new Error("The system of equations has no unique solution.");
        }

        // Inverse of the matrix
        const inverse = [
            [matrix[1][1] / determinant, -matrix[0][1] / determinant],
            [-matrix[1][0] / determinant, matrix[0][0] / determinant]
        ];

        // Multiply inverse matrix by constants
        const solution = [
            (inverse[0][0] * constants[0]) + (inverse[0][1] * constants[1]),
            (inverse[1][0] * constants[0]) + (inverse[1][1] * constants[1])
        ];

        return { a: solution[0], b: solution[1] };
    }

    rows.forEach((row, ind) => {
        if (j == 0) {
            const [button, positions] = row.split(": ")
            const [x, y] = positions.split(", ")
            obj.A = {}
            obj.A.x = x.split("+")[1]
            obj.A.y = y.split("+")[1]
            j++;
        }
        else if (j == 1) {
            const [button, positions] = row.split(": ")
            const [x, y] = positions.split(", ")
            obj.B = {}
            obj.B.x = x.split("+")[1]
            obj.B.y = y.split("+")[1]
            j++;
        }
        else if (j == 2) {
            const [button, positions] = row.split(": ")
            const [x, y] = positions.split(", ")
            obj.P = {}
            obj.P.x = x.split("=")[1]
            obj.P.y = y.split("=")[1]
            j++;
        } else {
            j = 0;
            problems.push(obj)
            obj = {};
        }
    })
    problems.push(obj)
    console.log(problems)
    let ans = 0;
    problems.forEach((problem) => {
        // console.log(Number(Number(problem.A.x)), Number(Number(problem.A.y)), Number(Number(problem.B.x)), Number(Number(problem.B.y)), 0,0, Number(Number(problem.P.x)), Number(Number(problem.P.y)));
        try {
            const res = solveEquations(Number(problem.A.x), Number(problem.A.y), Number(problem.B.x), Number(problem.B.y),Number(problem.P.x) + 10000000000000, Number(problem.P.y) + 10000000000000);
            const a = Number(res.a.toFixed(2))
            const b = Number(res.b.toFixed(2))

            if(Number.isInteger(a) && Number.isInteger(b)){
                ans += (3*a + b)
            }

        } catch (err) {
            console.log(err)
        }
    })
    console.log(ans)
})