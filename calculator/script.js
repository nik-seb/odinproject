function operate (num1, num2, operator) {
    if (operator = '+') {
        add(num1, num2)
    }
    if (operator = '-') {
        subtract(num1, num2)
    }
    if (operator = '*') {
        multiply(num1, num2)
    }
    if (operator = '/') {
        divide(num1, num2)
    }
}


function add (a, b) {
    return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}




console.log(multiply(5, 3), add (1, 3), subtract (5, 3), divide (10, 2))