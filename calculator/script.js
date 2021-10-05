const display = document.getElementById('display')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const clear = document.getElementById('clear')
let displayValue = display.innerText

digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        console.log('click')
        e.preventDefault()
        populateDisplay(digit.innerText)
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        e.preventDefault()
        populateDisplay(operator.innerText)
    })
})

clear.addEventListener('click', (e) => {
    e.preventDefault()
    display.innerHTML = '&nbsp'
})

function populateDisplay (val) {
    displayValue = val
    display.innerText += displayValue
}

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