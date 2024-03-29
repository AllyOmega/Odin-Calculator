
let leftOp = 0;
let rightOp = 0;


const operateObj = {

    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide

}


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function  divide(a, b) {
    return a / b;
}

function operate (operator, left, right) {
    
    if (operateObj.hasOwnProperty(operator)) {
        return operateObj[operator](left, right);
    }
    else throw new Error('Unsupported operator');


}