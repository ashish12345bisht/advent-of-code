const data = "92 0 286041 8034 34394 795 8 2051489"

var MyArray = function () {
    const MAX_SEGMENT_SIZE = 1000000; // Maximum size of each array segment
    var segments = [[]]; // Array of arrays to hold data

    // Push an element into the dynamic array
    this.push = function (element) {
        const lastSegment = segments[segments.length - 1];

        if (lastSegment.length < MAX_SEGMENT_SIZE) {
            lastSegment.push(element);
        } else {
            // Create a new segment if the current segment is full
            const newSegment = [];
            newSegment.push(element);
            segments.push(newSegment);
        }
    };

    // Get an element by index
    this.get = function (index) {
        const segmentIndex = Math.floor(index / MAX_SEGMENT_SIZE);
        const localIndex = index % MAX_SEGMENT_SIZE;

        if (segmentIndex < segments.length) {
            return segments[segmentIndex][localIndex];
        } else {
            throw "Invalid Index";
        }
    };

    // Define a dynamic 'length' property
    Object.defineProperty(this, 'length', {
        get: function () {
            return (segments.length - 1) * MAX_SEGMENT_SIZE + segments[segments.length - 1].length;
        }
    });
};

let temp = data.split(" ");
let arr = new MyArray()
temp.forEach(item => arr.push(item));

function helper(arr, maxIter) {
    let i = 0;
    while (i < maxIter) {
        let newArr = new MyArray();
        for(let ind = 0; ind < arr.length; ind++){
            let item = arr.get(ind);
            try {

                if (item === "0") {
                    newArr.push("1")
                }
                else if (item.length % 2 === 0) {
                    newArr.push(item.slice(0, item.length / 2))
                    newArr.push(item.slice(item.length / 2))
                } else {
                    newArr.push((Number(item) * Number(2024)).toString())
                }
            } catch (err) {
                if (err.message === "Invalid array length") {
                    return (helper(arr.slice(0, ind), maxIter - i) + helper(arr.slice(ind), maxIter - i))
                }
                console.log(err)
                break;
            }
        }
        arr = newArr
        i++
    }
    return arr.length;
}
// Note - my solution could only solve the first part i.e. first 25 iterations. The 75 one is is exceeding the range an aray can store
// I have got the answer to this solution using a hack :(

console.log(helper(arr, 75))