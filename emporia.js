// IMPORTANT!

 /* This solution is working correctly in Nodejs environment. I am not sure if it works in other environments (e.g: javascript online,...) since I have no idea how you will assess this submission. Please follow these instructions:

 1. Get Nodejs installed on your machine
 2. Cd to this file directory
 3. Run "node emporia.js" command
 4. Enter the input as your test requirement description
5. Press enter to get the result

Thank you for your time and consideration!

Best regards,
Tan

 */



process.stdin.setEncoding('utf8');

// This function reads only one line on console synchronously. After pressing `enter` key the console will stop listening for data.
function readlineSync() {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        process.stdin.on('data', function (data) {
            process.stdin.pause(); // stops after one line reads
            resolve(data);
        });
    });
}

const printMat = (arr) => {
    var arrText = "";
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            arrText+=arr[i][j]+'    ';
        }
        console.log(arrText);
        arrText='';
    }
}

const isValid = (matrix, row, col) => {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (matrix[i][j] == 0) return false;
        }
    }
    return true;
}

const  emporia = (matrix, row, col, startRow, startCol) => {
    let res = 0;
    let tmpMat = matrix.map(function (arr) {
        return arr.slice();
    });
    tmpMat[startRow][startCol] = - 1;
    console.log(startRow, startCol);
    printMat(tmpMat);
    if (startRow + 1 < row ) {
        if  (tmpMat[startRow + 1][startCol] != 1 && tmpMat[startRow + 1][startCol] != -1) {
            if (tmpMat[startRow + 1][startCol] == 3) {
                if (isValid(tmpMat, row, col)) return 1;
            }
            else {
                res = res + emporia(tmpMat, row, col, startRow + 1, startCol)
            }
        }
    }
    if (startRow - 1 >= 0 ) {
        if (tmpMat[startRow - 1][startCol] != 1 && tmpMat[startRow - 1][startCol] != -1) {
            if (tmpMat[startRow - 1][startCol] == 3) {
                if (isValid(tmpMat, row, col)) return 1;
            }
            else {
                res = res + emporia(tmpMat, row, col, startRow - 1, startCol)
            }
        }
    }
    if (startCol + 1 < col ) {
        if (tmpMat[startRow][startCol + 1] != 1 && tmpMat[startRow][startCol + 1] != -1) {
            if (tmpMat[startRow][startCol + 1] == 3) {
                if (isValid(tmpMat, row, col)) return 1;
            }
            else {
                res = res + emporia(tmpMat, row, col, startRow, startCol + 1)
            }
        }
    }
    if (startCol - 1 >= 0 ) {
        if (tmpMat[startRow][startCol - 1] != 1 && tmpMat[startRow][startCol - 1] != -1) {
            if (tmpMat[startRow][startCol - 1] == 3) {
                if (isValid(tmpMat, row, col)) return 1;
            }
            else {
                res = res + emporia(tmpMat, row, col, startRow, startCol - 1)
            }
        }
    }

    return res;
}

// entry point
async function main() {
    let mn = await readlineSync();
    let rowCol = mn.split(" ").map(item => parseInt(item, 10));
    var matrix = [];
    if (rowCol.length != 2) {
        console.log("Invalid row and col input!")
        process.exit();
    } else {
        var row = rowCol[0];
        var col = rowCol[1];
        for (let i = 1; i <= row; i++) {
            let input = await readlineSync();
            let line = input.split(" ").map(item => parseInt(item, 10));
            if (line.length != col) {
                console.log("Invalid row length")
                process.exit(1);
            }
            let check = line.map(item => {
                if (item != 1 && item != 2 && item != 3 && item != 0) {
                    console.log("Invalid row data")
                    process.exit(2);
                }
                return true;
            });
            if (check) {
                matrix.push(line);
            }
        }
        let counterStartPoint = 0;
        let counterEndPoint = 0;
        matrix.map((row, rowIdx) => {
            row.map((item, colIdx) => {
                if (item == 2) {
                    counterStartPoint ++;
                    
                }
                if (item == 3) {
                    counterEndPoint ++;
                }
            })
        })
        if (counterStartPoint != 1 || counterEndPoint != 1) var checkMatrix = false;
        else var checkMatrix = true;

        //console.log(checkMatrix);
        if (!checkMatrix) {
            console.log("Invalid matrix input!");
            process.exit(4);
        } else {
            let tmpMat = [...matrix];
            //console.log(tmpMat);
            let resMat = [];
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < row; j++) {
                    if (matrix[i][j] == 2) {
                        var startRow = i;
                        var startCol = j;
                    }
                }
            }
            let res = emporia(matrix, row, col,  startRow, startCol);
            console.log(res)
        }
    }
}

main();