const display = document.querySelector(".display");
const btns = document.querySelectorAll("button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return substract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
}

let a = "";
let b = "";
let operator;
let result;
let isClicked = false;
let isResult = false;

function calculator() {
  for (btn of btns) {
    btn.addEventListener("click", (event) => {
      if (!isNaN(event.target.textContent) && isResult === true) {
        a = "";
        b = "";
        isClicked = false;
        isResult = false;
        a += event.target.textContent;
        display.textContent = a;
      } else if (
        isNaN(event.target.textContent) &&
        event.target.textContent !== "=" &&
        event.target.textContent !== "Clear" &&
        b === ""
      ) {
        operator = event.target.textContent;
        isClicked = true;
      } else if (!isNaN(event.target.textContent) && isClicked === false) {
        a += event.target.textContent;
        display.innerText = a;
      } else if (!isNaN(event.target.textContent) && isClicked === true) {
        b += event.target.textContent;
        display.innerText = b;
      } else if (isResult === true) {
        a = "";
        b = "";
      } else if (
        b !== "" &&
        isNaN(event.target.textContent) &&
        event.target.textContent !== "=" &&
        event.target.textContent !== "Clear"
      ) {
        let wynik = operate(Number(a), Number(b), operator);
        display.innerText = result;
        a = result;
        b = "";
        operator = event.target.textContent;
        isClicked = true;
        isResult = true;
      }
    });
  }
}

function clearDisplay() {
  display.innerText = "";
  a = "";
  b = "";
  operator = "";
  isClicked = false;
  isResult = false;
}

calculator();
clear.addEventListener("click", clearDisplay);

equal.addEventListener("click", (event) => {
  if (b === "0" && operator === "/") {
    display.innerText = "Do not divide by 0!";
    a = "";
    b = "";
    operator = "";
    isClicked = false;
  } else if (a === "" || b === "" || operator === "") {
    display.innerText = "Write all of the numbers and operator!";
    a = "";
    b = "";
    operator = "";
    isClicked = false;
  } else {
    result = operate(Number(a), Number(b), operator);
    display.innerText = result;
    isResult = true;
  }
});
