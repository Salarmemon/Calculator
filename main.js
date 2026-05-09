const display = document.querySelector(".display");
const numericBtns = document.querySelectorAll(".numeric");
const resetBtn = document.getElementById("reset");
const operatorBtns = document.querySelectorAll(".operator");
const evalBtn = document.querySelector("#eval")
let firstOperand = 0;
let operator = "";
let secondOperand = 0;
let waitingForOperator = false;
let waitingForNumber = false;
const add = (num1, op, num2) => {
    return num1 + num2;
}

const subtract = (num1, op, num2) => {
    return num1- num2;
}

const multiply = (num1, op, num2) => {

    return num1 * num2;
}

const divide = (num1, op, num2) => {
    if (num2 !== 0) {
    return num1 / num2;

    } else {
        alert("dividing by 0 is not allowed");
    }
}

const operators = ["+", "-", "×", "÷" ];

numericBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if(waitingForOperator) {
           reset();
        }
        waitingForNumber = false;

        let preValue = display.textContent;
        if (preValue === "0") {
            preValue = "";
        }
        let value = e.target.textContent;
        if (value  === "." && preValue.includes(".")) {
            return;
        }
        const newValue = preValue + value; 
        display.textContent = newValue;

        if (operator === "") {
            firstOperand = newValue;
        } else {
            secondOperand = newValue.split(operator)[1];
        }
       
    })
});

const reset = () => {
    display.textContent = 0;
    firstOperand = 0;
    operator = "";
    secondOperand = 0;
    waitingForOperator = false;
}
resetBtn.addEventListener("click", () => {
   reset();
})

operatorBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if (waitingForNumber) return;

        let temOp = e.target.textContent;
        let prevText = display.textContent;
        if (operators.some(op => prevText.includes(op))) {
            if (secondOperand === "" || secondOperand === 0) {
                return
            } else {
                evaluate();
                operator = temOp;
                prevText = display.textContent + operator;
                display.textContent = prevText;
                waitingForOperator = false;
                waitingForNumber = true;
                return;
                
            }
        }
        operator = temOp;
        let displayText = prevText + operator;
        display.textContent = displayText;
        waitingForOperator = false;
    })
})

const operate = (func) => {
    const result = func(parseFloat(firstOperand), operator, parseFloat(secondOperand));
      
    display.textContent = result;
    firstOperand = result;
    waitingForOperator = true;
}

const evaluate = () => {
     if (operator === "" || firstOperand === "" || secondOperand === "") return;
    if (operator === "+") {
       operate(add);
    } else if (operator === "-") {
        operate(subtract);
    } else if (operator === "×") {
        operate(multiply);
    } else if (operator === "÷") {
        operate(divide);
    } else {
        alert("Unsupported operation");
    }
}

evalBtn.addEventListener("click", () => {
   
    evaluate(); 
})