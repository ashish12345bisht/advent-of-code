// const fs = require('fs');

// fs.readFile('day6-test.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }

//     let rows = data.split(`\n`);
//     let arr = [];
//     // rows.forEach((item)=>{
//     //     item = item.map(i=>i)
//     // })
//     for(let i=0; i<rows.length; i++){
//         arr.push([])
//         for(let j = 0; j<rows[i].length; j++){
//             arr[i].push(rows[i][j])
//         }
//     }
//     for(let i=0; i<arr.length; i++){
//         for(let j = 0; j<arr[i].length; j++){
//             // arr[i].push_back(rows[i][j])
//             if(arr[i][j]==='^'){
//                 startGuard(i, j);
//             }
//         }
//     }

//     function getTurnDirection(x, y){
//         if(x==0 && y==-1){
//             return [1, 0];
//         }
//         if(x==1 && y==0){
//             return [0, 1];
//         }
//         if(x==0 && y==1){
//             return [-1, 0];
//         }
//         if(x==-1 && y==0){
//             return [0, -1];
//         }
//     }

//     function isLooping(r, c, x, y){
//         let initR = r, initC = c;
//         let R = r;
//         let C = c;
//         let X = x;
//         let Y = y
//         while(R>=0 && R<arr.length && C>=0 && C<arr[0].length){
//             R+=Y;
//             C+=X;
//             if(R<0 || R>=arr.length || C<0 || C>=arr[0].length){
//                 // ans++;
//                 // console.log(ans2)
//                 return false;
//             }
//             if(arr[R][C]=='#'){
//                 R-=Y;
//                 C-=X;
//                 const [newX, newY] = getTurnDirection(X, Y);
//                 X = newX;
//                 Y = newY;
//                 R+=Y;
//                 C+=X;
//             }
//             if(R==initR && C==initC){
//                 arr.forEach(item=>console.log(JSON.stringify(item)))
//                 console.log("------------")
//                 return true;
//             }
//         }
//         return false
//     }

//     function startGuard(r, c){
//         let y = -1;
//         let x = 0;
//         let ans = 0;
//         let ans2 = 0
//         let obj = {}
//         while(r>=0 && r<arr.length && c>=0 && c<arr[0].length){
//             if(isLooping(r,c,x,y)){
//                 ans2++;
//             }
//             if(arr[r][c]!='v'){
//                 ans++;
//                 // let newarr = [...arr]
//                 // newarr[r]=newarr[r].slice(0, c) + 'v' + newarr[r].slice(c + 1);
//                 // arr = newarr
//                 arr[r][c] = 'v'
//             }
//             r+=y;
//             c+=x;
//             if(r<0 || r>=arr.length || c<0 || c>=arr[0].length){
//                 // ans++;
//                 console.log(ans2)
//                 return;
//             }

//             if(arr[r][c]=='#'){
//                 r-=y;
//                 c-=x;
//                 const [newX, newY] = getTurnDirection(x, y);
//                 x = newX;
//                 y = newY;
//                 r+=y;
//                 c+=x;
//             }
//             // console.log(obj)
//             // arr.forEach(item=>console.log(item))
//             // console.log("-----------------")
//             // console.log(rows)
//         }
//         console.log(ans2)
//     }
//     // console.log(rows)
// })







// i solved day6 problem 1 by myself, but took help for problem 2. Shame










class Map {
    constructor(lines) {
        this.height = lines.length;
        this.width = lines[0].length;
        this.obstacles = Array.from({ length: this.height }, (_, i) =>
            Array.from(lines[i].trim()).map((char) => char === "#")
        );

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] === "^") {
                    this.initialGuardRow = i;
                    this.initialGuardCol = j;
                }
            }
        }
    }

    isWithinBounds(row, col) {
        return row >= 0 && row < this.height && col >= 0 && col < this.width;
    }

    isObstacle(row, col) {
        if (!this.isWithinBounds(row, col)) return false;
        return (
            this.obstacles[row][col] ||
            (this.placedObstacle &&
                this.placedObstacle[0] === row &&
                this.placedObstacle[1] === col)
        );
    }

    drawMap(visited, guardPos) {
        const mapRepresentation = this.obstacles.map((row, i) =>
            row
                .map((isObstacle, j) => {
                    if (i === guardPos[0] && j === guardPos[1]) return "^";
                    if (
                        this.placedObstacle &&
                        i === this.placedObstacle[0] &&
                        j === this.placedObstacle[1]
                    )
                        return "O";
                    if (isObstacle) return "#";
                    if (visited[i][j]) return "X";
                    return ".";
                })
                .join("")
        );
        console.log("====START MAP====");
        console.log(mapRepresentation.join("\n"));
        console.log("====END MAP====\n");
    }
}

class Guard {
    constructor(map) {
        this.map = map;
        this.posRow = map.initialGuardRow;
        this.posCol = map.initialGuardCol;
        this.rowDirection = -1;
        this.colDirection = 0;
        this.visited = Array.from({ length: map.height }, () =>
            Array(map.width).fill(false)
        );
        this.visitedHashes = new Set();

        this.visited[this.posRow][this.posCol] = true;
        this.visitedHashes.add(this.hashPosition());
        this.stuckInLoop = false;
    }

    move() {
        let nextPos;
        do {
            nextPos = this.getNextPos();
            if (this.map.isObstacle(nextPos[0], nextPos[1])) {
                this.turnRight();
            } else {
                break;
            }
        } while (true);

        this.posRow = nextPos[0];
        this.posCol = nextPos[1];

        const inBounds = this.map.isWithinBounds(this.posRow, this.posCol);
        if (inBounds) {
            this.visited[this.posRow][this.posCol] = true;
            const positionHash = this.hashPosition();
            if (this.visitedHashes.has(positionHash)) {
                this.stuckInLoop = true;
            } else {
                this.visitedHashes.add(positionHash);
            }
        }

        return inBounds;
    }

    getNextPos() {
        return [this.posRow + this.rowDirection, this.posCol + this.colDirection];
    }

    hashPosition() {
        const positionHash = this.posCol * this.map.height + this.posRow;
        const directionHash = this.colDirection + this.rowDirection * 2;
        return positionHash * 5 + directionHash;
    }

    turnRight() {
        const temp = this.colDirection;
        this.colDirection = -this.rowDirection;
        this.rowDirection = temp;
    }

    numSpacesVisited() {
        return this.visited.flat().filter(Boolean).length;
    }
}

function task1(lines) {
    const map = new Map(lines);
    const guard = new Guard(map);

    while (guard.move()) {
        map.drawMap(guard.visited, [guard.posRow, guard.posCol]);
    }

    return guard.numSpacesVisited();
}

function task2(lines) {
    const map = new Map(lines);
    let numObstaclePositions = 0;

    const findPotentialObstaclePlacements = (map) => {
        const guard = new Guard(map);
        while (guard.move());
        return guard.visited;
    };

    const potentialObstaclePlace = findPotentialObstaclePlacements(map);

    for (let i = 0; i < map.height; i++) {
        for (let j = 0; j < map.width; j++) {
            if (
                map.isObstacle(i, j) ||
                (map.initialGuardRow === i && map.initialGuardCol === j)
            ) {
                continue;
            }

            if (potentialObstaclePlace[i][j]) {
                const guard = new Guard(map);
                map.placedObstacle = [i, j];

                while (guard.move()) {
                    if (guard.stuckInLoop) {
                        map.drawMap(guard.visited, [guard.posRow, guard.posCol]);
                        numObstaclePositions += 1;
                        break;
                    }
                }
            }
        }
    }

    return numObstaclePositions;
}

const fs = require('fs');

fs.readFile('day6.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    // console.log("Task 1 Result:", task1(data.split(`\n`)));

    console.log("Task 2 Result:", task2(data.split(`\n`)));
})
