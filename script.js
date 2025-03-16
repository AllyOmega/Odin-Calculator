console.log("script loaded");
let leftOp = null;
let rightOp = null;
let curOp = '';
let nextOp = '';

let currentDisplay = "0";

const operateObj = {

    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide

}



const numButtons = document.querySelectorAll(".num-button");
const opButtons = document.querySelectorAll(".op-button");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
    // 
console.log(numButtons);
console.log(opButtons);

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const digit = button.textContent.trim();
        console.log(`Clicked digit: ${digit}`);
        handleDigit(digit)
        button.blur();

    })
})

opButtons.forEach((button => {
    button.addEventListener("click", () => {
        let operator = button.textContent.trim();

        if (operator === '×') operator = '*';
        if (operator === '÷') operator = '/';

        console.log(`clicked operator: ${operator}`);
        updateOperator(operator);
    });

}))

equalButton.addEventListener("click", () => {
    console.log("equal button");
    operate(curOp, leftOp, rightOp);
})

clearButton.addEventListener("click", () => {
    console.log("clear");
    curOp = '';
    currentDisplay = '0';
    updateDisplay();
})


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

function updateOperator(operator) {
    if (curOp !== '' && curOp !== '=') {
        if (rightOp !== null) {
            operate(curOp, leftOp, rightOp);
            leftOp = parseFloat(parseFloat(currentDisplay).toFixed(14));
            rightOp = null;
        } else return;
    }

    console.log("here");

    curOp = operator;
    leftOp = parseFloat(currentDisplay);
    currentDisplay = '0';

    console.log(currentDisplay)
}

function operate (operator, left, right) {
    
    if (operateObj.hasOwnProperty(operator)) {
        currentDisplay = operateObj[operator](left, right);
    }
    
    else throw new Error('Unsupported operator');
    updateDisplay();
    curOp = '=';
}

function handleDigit(input) {

           

    if (currentDisplay.length > 14){
        return
    }

    if (input === "." && currentDisplay.includes(".")) {
        return
    }

    if (currentDisplay === "0") {
        currentDisplay = input === '0' ? '0' : input;
    } else if (curOp === '=') {
        currentDisplay = input;
        leftOp = null;
        rightOp = null;
        curOp = '';
    } else  {
        currentDisplay += input;
    }
    rightOp = parseFloat(currentDisplay);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = parseFloat(parseFloat(currentDisplay).toFixed(14));
}