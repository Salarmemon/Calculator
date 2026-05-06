const display = document.querySelector(".display");
const numericBtns = document.querySelectorAll(".numeric");
const resetBtn = document.getElementById("reset");
const operatorBtns = document.querySelectorAll(".operator");
let firstOperand = 0;
let operator = "";
let secondOperand = 0;
numericBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {

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
            secondOperand = newValue;
        }
       
    })
});

resetBtn.addEventListener("click", () => {
    display.textContent = 0;
    firstOperand = 0;
    operator = "";
    secondOperand = 0;
})

operatorBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        operator = e.target.textContent;
        display.textContent = operator;
    })
})