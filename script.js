console.log("script loaded");
let leftOp = 0;
let rightOp = 0;
let curOp = '';

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
    button.addEventListener("click", (left, right) => {
        let operator = button.textContent.trim();

        if (operator === '×') operator = '*';
        if (operator === '÷') operator = '/';

        console.log(`clicked operator: ${operator}`);
        updateOperator(operator, left, right);
    });

}))

equalButton.addEventListener("click", (left, right) => {
    console.log("equal button");
    rightOp = parseFloat(currentDisplay);
    operate(curOp, left, right);
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

function updateOperator(operator, left, right) {
    if (curOp !== '' && curOp !== '=') {
        return;
    }

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
    } else {
        currentDisplay += input;
    }

    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = parseFloat(parseFloat(currentDisplay).toFixed(14));
}